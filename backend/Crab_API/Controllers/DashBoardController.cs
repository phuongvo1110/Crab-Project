using Crab_API.Models;
using Crab_API.Request;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : Controller
    {
        private readonly DashboardService _dashboardService;
        public DashBoardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        [HttpGet("totalMotorbikeRides")]
        public async Task<ActionResult<int>> GetTotalRidesAsync()
        {
            return await _dashboardService.GetTotalMotobikeRidesAsync();
        }
        [HttpGet("totalCarDrives")]
        public async Task<ActionResult<int>> GetTotalDrivesAsync()
        {
            return await _dashboardService.GetTotalCarDrivesAsync();
        }
        [HttpPost("totalRidesInMonth")]
        public async Task<ActionResult<int>> GetTotalRidesInMonth([FromBody] SingleDateRequest month)
        {
            return await _dashboardService.GetTotalRidesAsync(month.Date);
        }
        [HttpGet("successfulRate")]
        public async Task<ActionResult<float>> GetSuccessRidesPercent()
        {
            return await _dashboardService.GetSuccessRidesPercent();
        }
        [HttpPost("getListFromDate")]
        public async Task<ActionResult<List<DriverBooking>>> GetListBookingRange([FromBody] DateRangeRequest rangeDate)
        {
            try
            {
                var start = rangeDate.startDate;
                var end = rangeDate.endDate;
                var booking = await _dashboardService.GetListRangeTime(start, end);
                return Ok(booking);
            } catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("getRevenueRange")]
        public async Task<ActionResult<float>> GetRevenueinRangeTime([FromBody] DateRangeRequest rangeDate)
        {
            try
            {
                var start = rangeDate.startDate;
                var end = rangeDate.endDate;
                float totalRevenue = await _dashboardService.GetRevenueInRange(start, end);
                return Ok(totalRevenue);
            } catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("getRevenueProfit")]
        public async Task<IActionResult> GetRevenueProfitPairs([FromBody] DateRangeRequest dateRange)
        {
            try
            {
                var fromDate = dateRange.startDate;
                var toDate = dateRange.endDate;

                var revenueProfitPairs = await _dashboardService.GetRevenueProfitAsync(fromDate, toDate);

                return Ok(revenueProfitPairs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
