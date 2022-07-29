namespace PlantDB_Backend.Models
{
    public class PlantInfo
    {
        public IEnumerable<PlantProperty> Schema { get; set; } = null!;

        public IEnumerable<IEnumerable<PlantRecord>>? Records { get; set; }

        public int? TotalCount { get; set; }
    }
}