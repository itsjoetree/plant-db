using static PlantDB_Backend.Models.Extensions;

namespace PlantDB_Backend.Models
{
    public class PlantProperty
    {
        public string PropertyName { get; set; } = null!;

        public string? DisplayName { get; set; }

        public PlantDataType Type { get; set; }

        public bool IsKey { get; set; }

        public bool IsHidden { get; set; }

        public bool IsRequired { get; set; }

        public bool IsIdentifier { get; set; }

        public int? MaxLength { get; set; }

        public IEnumerable<DropdownOption>? Options { get; set; }
    }
}

