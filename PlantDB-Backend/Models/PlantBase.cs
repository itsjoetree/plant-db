using static PlantDB_Backend.Models.Extensions;

namespace PlantDB_Backend.Models
{
    public partial class PlantBase
    {
        public PlantBase()
        {
            Cacti = new HashSet<Cactus>();
            Ferns = new HashSet<Fern>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Nickname { get; set; }
        public string Description { get; set; } = null!;
        public LightingCondition LightingCondition { get; set; }
        public WateringInterval WateringInterval { get; set; }
        public decimal AverageHeightInches { get; set; }
        public string? Origin { get; set; }
        public string? Image { get; set; }
        public string? ImageType { get; set; }

        public virtual ICollection<Cactus> Cacti { get; set; }
        public virtual ICollection<Fern> Ferns { get; set; }
    }
}
