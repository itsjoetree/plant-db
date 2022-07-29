using PlantDB_Backend.Models;

namespace PlantDB_Backend.Helpers
{
    public class SchemaBuilder
    {
        public static IEnumerable<PlantProperty> GenerateBaseSchema()
        {
            return new List<PlantProperty>()
            {
                new()
                {
                    PropertyName = "name",
                    DisplayName = "Name",
                    Type = PlantDataType.String,
                    IsRequired = true,
                    MaxLength = 200
                },
                new()
                {
                    PropertyName = "nickname",
                    DisplayName = "Nickname",
                    Type = PlantDataType.String,
                    MaxLength = 200
                },
                new()
                {
                    PropertyName = "description",
                    DisplayName = "Description",
                    Type = PlantDataType.String,
                    IsRequired = true,
                    MaxLength = 250
                },
                new()
                {
                    PropertyName = "lightingCondition",
                    DisplayName = "Lighting Condition",
                    Type = PlantDataType.Enum,
                    Options = new List<DropdownOption>(3)
                    {
                        new()
                        {
                            Name = "Bright",
                            Value = 0
                        },
                        new()
                        {
                            Name = "Partial Sun",
                            Value = 1,
                        },
                        new()
                        {
                            Name = "Low",
                            Value = 2
                        },
                    },
                    IsRequired = true
                },
                new()
                {
                    PropertyName = "wateringInterval",
                    DisplayName = "Watering Interval",
                    Type = PlantDataType.Enum,
                    Options = new List<DropdownOption>(3)
                    {
                        new()
                        {
                            Name = "Often",
                            Value = 0
                        },
                        new()
                        {
                            Name = "Sometimes",
                            Value = 1,
                        },
                        new()
                        {
                            Name = "Seldom",
                            Value = 2
                        },
                    },
                    IsRequired = true,
                },
                new()
                {
                    PropertyName = "averageHeightInches",
                    DisplayName = "Avg. Height (in.)",
                    Type = PlantDataType.Decimal,
                    IsRequired = true
                },
                new()
                {
                    PropertyName = "origin",
                    DisplayName = "Origin",
                    Type = PlantDataType.String,
                    MaxLength = 100,
                }
            };
        }
    }
}

