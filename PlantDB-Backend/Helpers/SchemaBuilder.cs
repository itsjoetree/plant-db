using PlantDB_Backend.Models;
using static PlantDB_Backend.Models.Extensions;

namespace PlantDB_Backend.Helpers
{
    /// <summary>
    /// Used to provide static methods that help with schema generation.
    /// </summary>
    public class SchemaBuilder
    {
        /// <summary>
        /// Generates a collection of <see cref="PlantProperty"/> for <see cref="PlantBase"/>
        /// </summary>
        /// <returns>Collection of <see cref="PlantBase"/></returns>
        public static IEnumerable<PlantProperty> GenerateBaseSchema()
        {
            return new List<PlantProperty>()
            {
                new()
                {
                    PropertyName = nameof(PlantBase.Id),
                    DisplayName = "Id",
                    Type = PlantDataType.Int,
                    IsRequired = true,
                    IsKey = true,
                    IsHidden = true,
                },
                new()
                {
                    PropertyName = nameof(PlantBase.Name),
                    DisplayName = "Name",
                    Type = PlantDataType.String,
                    IsRequired = true,
                    IsIdentifier = true,
                    MaxLength = 200
                },
                new()
                {
                    PropertyName = nameof(PlantBase.Nickname),
                    DisplayName = "Nickname",
                    Type = PlantDataType.String,
                    MaxLength = 200
                },
                new()
                {
                    PropertyName = nameof(PlantBase.Description),
                    DisplayName = "Description",
                    Type = PlantDataType.String,
                    IsRequired = true,
                    MaxLength = 250
                },
                new()
                {
                    PropertyName = nameof(PlantBase.LightingCondition),
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
                    PropertyName = nameof(PlantBase.WateringInterval),
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
                    PropertyName = nameof(PlantBase.AverageHeightInches),
                    DisplayName = "Avg. Height (in.)",
                    Type = PlantDataType.Decimal,
                    IsRequired = true
                },
                new()
                {
                    PropertyName = nameof(PlantBase.Origin),
                    DisplayName = "Origin",
                    Type = PlantDataType.String,
                    MaxLength = 100,
                }
                /*new()
                {
                    PropertyName = nameof(PlantBase.PlantImage),
                    DisplayName = "Image",
                    Type = PlantDataType.Image,
                }*/
            };
        }
    }
}

