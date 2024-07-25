using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Authorization;

namespace Crab_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverBookingController : ControllerBase
    {
        private readonly DriverBookingService _driverBookingService;
        private readonly CustomerService _customerService;
        private readonly DriverService _driverService;
        private readonly CallCenterAgentService _callCenterAgentService;
        private readonly LocationRevenueService _locationRevenueService;
        private readonly LocationService _locationService;
        private readonly PaymentInfoService _paymentInfoService;

        public DriverBookingController(DriverBookingService driverBookingService, CustomerService customerService, DriverService driverService, CallCenterAgentService callCenterAgentService, LocationRevenueService locationRevenueService, LocationService locationService, PaymentInfoService paymentInfoService)
        {
            _driverBookingService = driverBookingService;
            _customerService = customerService;
            _callCenterAgentService = callCenterAgentService;
            _driverService = driverService;
            _locationRevenueService = locationRevenueService;
            _locationService = locationService;
            _paymentInfoService = paymentInfoService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<DriverBooking>>> Get()
        {
            var driverBookings = await _driverBookingService.GetAsync();
            return Ok(driverBookings);
        }

        [HttpGet("{id:length(24)}", Name = "GetDriverBooking")]
        public async Task<ActionResult<DriverBooking>> Get(string id)
        {
            var driverBooking = await _driverBookingService.GetAsync(id);

            if (driverBooking == null)
            {
                return NotFound();
            }

            return Ok(driverBooking);
        }
        [HttpGet("GetByCustId")]
        public async Task<ActionResult<List<DriverBooking>>> GetByCustId(string custId)
        {
            var driverBooking = await _driverBookingService.GetByCustID(custId);
            if (driverBooking == null)
            {
                return Ok(new { data = (object)null, message = "History not found" });
            }
            return Ok(driverBooking);
        }
        [HttpGet("GetByDriverId")]
        public async Task<ActionResult<List<DriverBooking>>> GetByDriverId(string driverId)
        {
            var driverBooking = await _driverBookingService.GetByDriverID(driverId);
            if (driverBooking == null)
            {
                return Ok(new { data = (object)null, message = "History not found" });
            }
            return Ok(driverBooking);
        }
        [HttpGet("GetByDriverIdLatest")]
        public async Task<ActionResult<DriverBooking>> GetByDriverIdLatest(string driverId)
        {
            var driverBooking = await _driverBookingService.GetByDriverIDLatest(driverId);
            if (driverBooking == null)
            {
                return Ok(new { data = (object)null, message = "History not found" });
            }
            return Ok(driverBooking);
        }
        [HttpPost]
        public async Task<ActionResult<DriverBooking>> Create(DriverBooking driverBooking)
        {
            var customer = await _customerService.GetAsync(driverBooking.CustomerId);
            var location = await _locationService.GetAsync(driverBooking.DepartureID);
            if (location == null)
            {
                return StatusCode(500, "Departure Location is not found");
            }
            if (customer == null)
            {
                return BadRequest();
            }
            var driver = await _driverService.FindNearestDriverAsync(location.Latitude, location.Longtitude);
            if (driver == null)
            {
                return StatusCode(500, "Driver is not found");
            }
            driverBooking.DriverID = driver.Id;
            driverBooking.CustomerPhoneNumber = customer.PhoneNumber;
            var currentDate = DateTime.Now;
            driverBooking.Date = currentDate;   
            driverBooking.Price = _driverBookingService.GetTotalPrice(driverBooking.Vehicle, (float)driverBooking.Distance);
            driverBooking.StatusType = DriverBooking.BookingStatus.Processing;
            var paymentInfo = new PaymentInfo()
            {
                CustomerId = customer.Id,
                DriverId = driver.Id,
                DriverBookingId = driverBooking.Id,
                PaymentAmount = driverBooking.Price,
                PaymentMethod = (PaymentInfo.MethodType?)driverBooking.PaymentType,
                PaymentDate = currentDate,
                PaymentStatus = PaymentInfo.Status.Processing
            };
            var response = await _paymentInfoService.CreateAsync(paymentInfo);
            if (response != null){
                driverBooking.pageUrl = response.PayUrl;
            }
            else{
                driverBooking.pageUrl = "";
            }
            var (check, idLocationRevenue) = await _locationRevenueService.CheckExist(location.City);
            if (check == false)
            {
                var locationRevenue = new LocationRevenue()
                {
                    City = location.City,
                    TotalRevenue = driverBooking.Price
                };
                await _locationRevenueService.CreateAsync(locationRevenue);
            } else
            {
                var updateLocationRevenue = await _locationRevenueService.GetAsync(idLocationRevenue);
                updateLocationRevenue.TotalRevenue += driverBooking.Price;
                await _locationRevenueService.UpdateAsync(idLocationRevenue, updateLocationRevenue);
            }
            await _driverBookingService.CreateAsync(driverBooking);
            // if (response != null)
            // {
            //     return Redirect(response.PayUrl);
            // }
            return CreatedAtRoute("GetDriverBooking", new { id = driverBooking.Id }, driverBooking);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, DriverBooking updatedDriverBooking)
        {
            var existingDriverBooking = await _driverBookingService.GetAsync(id);

            if (existingDriverBooking == null)
            {
                return NotFound();
            }

            await _driverBookingService.UpdateAsync(id, updatedDriverBooking);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingDriverBooking = await _driverBookingService.GetAsync(id);

            if (existingDriverBooking == null)
            {
                return NotFound();
            }

            await _driverBookingService.RemoveAsync(id);

            return NoContent();
        }
    }
}
