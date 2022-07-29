namespace PlantDB_Backend.Models
{
    public partial class Fern
    {
        public int Id { get; set; }
        public int PlantBaseId { get; set; }
        public int Blades { get; set; }

        public virtual PlantBase PlantBase { get; set; } = null!;
    }
}
