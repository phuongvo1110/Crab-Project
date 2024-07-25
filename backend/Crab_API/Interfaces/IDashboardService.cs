namespace Crab_API.Interfaces
{
    public interface IDashboardService
    {
        Task<int> GetTotalMotobikeRidesAsync();
        Task<int> GetTotalCarDrivesAsync();
        Task<int> GetTotalRidesAsync(DateTime month);
    }
}
