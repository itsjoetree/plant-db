namespace PlantDB_Backend.Models
{
    public partial class Cactus
    {
        public int Id { get; set; }
        public int PlantBaseId { get; set; }
        public int Glochids { get; set; }

        public virtual PlantBase PlantBase { get; set; } = null!;
    }
}
