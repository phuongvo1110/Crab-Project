using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationRevenueController : Controller
    {
        private readonly LocationRevenueService _locationRevenueService;
        public LocationRevenueController(LocationRevenueService locationRevenueService)
        {
            _locationRevenueService = locationRevenueService;
        }
        [HttpGet]
        public async Task<ActionResult<List<LocationRevenue>>> Get()
        {
            var locationRevenue = await _locationRevenueService.GetAsync();
            return Ok(locationRevenue);
        }
        [HttpGet("{id:length(24)}", Name = "GetLocation")]
        public async Task<ActionResult<LocationRevenue>> Get(string id)
        {
            var locationRevenue = await _locationRevenueService.GetAsync(id);
            if (locationRevenue == null)
            {
                return BadRequest();
            }
            return Ok(locationRevenue);
        }
        [HttpPost]
        public async Task<ActionResult<LocationRevenue>> Create(LocationRevenue locationRevenue)
        {
            await _locationRevenueService.CreateAsync(locationRevenue);
            return CreatedAtAction(nameof(Get), new { id = locationRevenue.Id }, locationRevenue);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, LocationRevenue updateLocation)
        {
            var locationRevenue = await _locationRevenueService.GetAsync(id);
            if (locationRevenue == null)
            {
                return NotFound();
            }
            updateLocation.Id = locationRevenue.Id;
            await _locationRevenueService.UpdateAsync(id, updateLocation);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var locationRevenue = await _locationRevenueService.GetAsync(id);
            if (locationRevenue == null)
            {
                return NotFound();
            }
            await _locationRevenueService.RemoveAsync(id);
            return NoContent();
        }
    }
}
