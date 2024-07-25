using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : Controller
    {
        private readonly LocationService _locationService;
        public LocationController(LocationService locationService)
        {
            _locationService = locationService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Location>>> Get()
        {
            var location = await _locationService.GetAsync();
            return Ok(location);
        }
        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var location = await _locationService.GetAsync(id);
                if (location == null) { 
                    return Ok(new {data = (object)null, message="Location not found"});
                }
                else {
                    return Ok(location);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }   
        }
        [HttpPost]
        public async Task<ActionResult<Location>> Create(Location location)
        {
            await _locationService.CreateAsync(location);
            return CreatedAtAction(nameof(Get), new {id = location.Id}, location);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Location updateLocation)
        {
            var location = await _locationService.GetAsync(id);
            if (location == null)
            {
                return NotFound();
            }
            updateLocation.Id = location.Id;
            await _locationService.UpdateAsync(id, updateLocation);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var location = await _locationService.GetAsync(id);
            if (location == null)
            {
                return NotFound();
            }
            await _locationService.RemoveAsync(id);
            return NoContent();
        }
        [HttpGet("GetLocationByLatLong")]
        public async Task<ActionResult<Location>> GetByLatLongAsync(float longtitude, float latitude){
            var location = await _locationService.GetByLatLongAsync(longtitude, latitude);
            if (location == null) {
                return BadRequest();
            }
            return Ok(location);
        }
    }
}
