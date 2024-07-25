using Crab_API.DTOs;
using Crab_API.Models;
using Crab_API.Request;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverController : ControllerBase
    {
        private readonly DriverService _driverService;
        public DriverController(DriverService driverService)
        {
            _driverService = driverService;
        }
        [HttpGet]
        public async Task<List<Driver>> Get() =>
            await _driverService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Driver>> Get(string id)
        {
            var driver = await _driverService.GetAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            return driver;
        }
        [HttpPost("GetDriverByEmail")]
        public async Task<ActionResult<Driver>> GetByEmail(EmailRequest emailRequest)
        {
            var driver = await _driverService.GetByEmail(emailRequest.Email);
            if (driver == null)
            {
                return NotFound();
            }
            return driver;
        }
        [HttpPost]
        public async Task<IActionResult> Post(Driver newDriver)
        {
            await _driverService.CreateASync(newDriver);
            return CreatedAtAction(nameof(Get), new { id = newDriver.Id }, newDriver);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Driver updatedDriver)
        {
            var driver = await _driverService.GetAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            updatedDriver.Id = driver.Id;
            await _driverService.UpdateAsync(id, updatedDriver);
            return NoContent();
        }
        [HttpPatch("{driverId}")]
        public async Task<IActionResult> UpdateLocation(string driverId, LocationDto location) {
            try
            {
                await _driverService.UpdateLocationAsync(driverId, location.Latitude, location.Longtitude);
                return Ok("Location updated successfully");
            }
            catch
            {
                return StatusCode(500, "An error occurred while updating location");
            }
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var driver = await _driverService.GetAsync(id);

            if (driver is null)
            {
                return NotFound();
            }

            await _driverService.RemoveAsync(id);

            return NoContent();
        }

    }
}
