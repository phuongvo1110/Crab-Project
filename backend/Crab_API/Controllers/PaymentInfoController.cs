using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentInfoController : Controller
    {
        private readonly PaymentInfoService _paymentService;
        public PaymentInfoController(PaymentInfoService paymentInfoService)
        {
            _paymentService = paymentInfoService;
        }
        [HttpGet]
        public async Task<List<PaymentInfo>> Get() =>
            await _paymentService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<PaymentInfo>> Get(string id)
        {
            var customer = await _paymentService.GetAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
        [HttpPost]
        public async Task<IActionResult> Post(PaymentInfo newPaymentInfo)
        {
            var response = await _paymentService.CreateAsync(newPaymentInfo);
            if (response == null)
            {
                return CreatedAtAction(nameof(Get), new { PaymentId = newPaymentInfo.PaymentId }, newPaymentInfo);
            }
            return Redirect(response.PayUrl);
        }
        [HttpGet("PaymentCallBack")]
        public IActionResult PaymentCallBack()
        {
            var response = _paymentService.PaymentExecuteAsync(HttpContext.Request.Query);
            return View(response);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, PaymentInfo updatedPaymentInfo)
        {
            var customer = await _paymentService.GetAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            updatedPaymentInfo.PaymentId = customer.PaymentId;
            await _paymentService.UpdateAsync(id, updatedPaymentInfo);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var customer = await _paymentService.GetAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            await _paymentService.RemoveAsync(id);

            return NoContent();
        }

    }
}
