using PlantDB_Backend.Models;

namespace PlantDB_Backend.Services
{
    public interface IPlantService
    {
        Task<int> CreateAsync<Plant>(IEnumerable<PlantRecord> records) where Plant : new();
        Task EditAsync<Plant>(Plant item, PlantBase plantBase, IEnumerable<PlantRecord> records);
        Task DeleteAsync<Plant>(PlantBase plantBase, Plant item);
    }
}

