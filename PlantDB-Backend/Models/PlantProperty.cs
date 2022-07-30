namespace PlantDB_Backend.Models
{
    public enum PlantDataType : byte
    {
        String = 0,
        Int,
        Decimal,
        Enum
    }

    public class PlantProperty
    {
        public string PropertyName { get; set; } = null!;

        public string? DisplayName { get; set; }

        public PlantDataType Type { get; set; }

        public bool IsKey { get; set; }

        public bool IsHidden { get; set; }

        public bool IsRequired { get; set; }

        public int? MaxLength { get; set; }

        public IEnumerable<DropdownOption>? Options { get; set; }
    }
}

