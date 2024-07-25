using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;
using RestSharp;
using Newtonsoft.Json;
namespace Crab_API.Services
{
    public class PaymentInfoService
    {
        private readonly IMongoCollection<PaymentInfo> _paymentCollection;
        IConfiguration _configuration;
        private readonly IOptions<MomoOptionModel> _options;
        public PaymentInfoService(IOptions<CrabDatabaseSetting> crabDatabaseSetting, IConfiguration configuration, IOptions<MomoOptionModel> options)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _paymentCollection = mongoDatabase.GetCollection<PaymentInfo>(crabDatabaseSetting.Value.PaymentInfoCollectionName);
            _configuration = configuration;
            _options = options;
        }
        public async Task<List<PaymentInfo>> GetAsync() =>
            await _paymentCollection.Find(_ => true).ToListAsync();
        public async Task<PaymentInfo?> GetAsync(string id) =>
            await _paymentCollection.Find(x => x.PaymentId == id).FirstOrDefaultAsync();
        public async Task<MomoCreatePaymentResponseModel> CreateAsync(PaymentInfo paymentInfo)
        {
            if (paymentInfo.PaymentMethod == PaymentInfo.MethodType.Momo)
            {
                await _paymentCollection.InsertOneAsync(paymentInfo);
                var paymentDoc = "Customer: " + paymentInfo.CustomerId;
                var amount = MathF.Round((float)(paymentInfo.PaymentAmount * 25458));
                var rawData = $"partnerCode={_options.Value.PartnerCode}&accessKey={_options.Value.AccessKey}&requestId={paymentInfo.PaymentId}&amount={amount}&orderId={paymentInfo.PaymentId}&orderInfo={paymentDoc}&returnUrl={_options.Value.ReturnUrl}&notifyUrl={_options.Value.NotifyUrl}&extraData=";
                var signature = ComputeHmacSha256(rawData, _options.Value.SecretKey);
                var client = new RestSharp.RestClient(_options.Value.MomoApiUrl);
                var request = new RestRequest() { Method = Method.Post };
                request.AddHeader("Content-Type", "application/json; charset=UTF-8");
                var requestData = new
                {
                    accessKey = _options.Value.AccessKey,
                    partnerCode = _options.Value.PartnerCode,
                    requestType = _options.Value.RequestType,
                    notifyUrl = _options.Value.NotifyUrl,
                    returnUrl = _options.Value.ReturnUrl,
                    orderId = paymentInfo.PaymentId,
                    amount = amount.ToString(),
                    orderInfo = paymentDoc,
                    requestId = paymentInfo.PaymentId,
                    extraData = "",
                    signature = signature
                };
                request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);
                var response = await client.ExecuteAsync(request);
                return JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);
            } else
            {
                await _paymentCollection.InsertOneAsync(paymentInfo);
                return null;
            }

        }
        public MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection)
        {
            var amount = collection.First(s => s.Key == "amount").Value;
            var orderInfo = collection.First(s => s.Key == "orderInfo").Value;
            var orderId = collection.First(s => s.Key == "orderId").Value;
            return new MomoExecuteResponseModel()
            {
                Amount = amount,
                OrderId = orderId,
                OrderInfo = orderInfo
            };
        }
        public async Task UpdateAsync(string id, PaymentInfo updatedPaymentInfo) =>
            await _paymentCollection.ReplaceOneAsync(x => x.PaymentId == id, updatedPaymentInfo);
        public async Task RemoveAsync(string id) =>
            await _paymentCollection.DeleteOneAsync(x => x.PaymentId == id);
        private string ComputeHmacSha256(string message, string secretKey)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes))
            {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
    }
}
