using System.Reflection;
using PlantDB_Backend.Models;

namespace PlantDB_Backend.Helpers
{
    /// <summary>
    /// Used to provide static methods that help with record generation.
    /// </summary>
    public class RecordBuilder
    {
        /// <summary>
        /// Generates records for a given plant object in the database.
        /// </summary>
        /// <typeparam name="Plant">The plant to generate records for.</typeparam>
        /// <param name="item">The plant object to generate records from.</param>
        /// <param name="isMultiple">Used to ignore images when fetching table data.</param>
        /// <returns>A collection of <see cref="PlantRecord"/> based off the provided item.</returns>
        /// <exception cref="NullReferenceException"></exception>
        public static IEnumerable<PlantRecord> GenerateRecords<Plant>(Plant item, bool isMultiple = false)
        {
            if (item == null)
            {
                throw new NullReferenceException();
            }

            Type type = item.GetType();

            IEnumerable<PropertyInfo> properties = type.GetProperties().Where(p => p.Name != "PlantBaseId");
            ICollection<PlantRecord> records = new List<PlantRecord>();

            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType.Name == "PlantBase")
                {
                    object? val = property.GetValue(item);

                    if (val != null)
                    {
                        IEnumerable<PropertyInfo> plantBaseProps = val.GetType()
                            .GetProperties()
                            .Where(p => !p.GetGetMethod()?.IsVirtual ?? false)
                            .Where(p => p.Name != "Id");

                        foreach (PropertyInfo plantBaseProp in plantBaseProps)
                        {
                            // We only need this for preparing base64 string to frontend
                            if (plantBaseProp.Name == "ImageType")
                            {
                                continue;
                            }

                            PlantRecord record = new()
                            {
                                PropertyName = plantBaseProp.Name,
                            };

                            object? pbVal = plantBaseProp.GetValue(val);


                            if (pbVal == null)
                            {
                                continue;
                            }

                            if (plantBaseProp.PropertyType.Name == "WateringInterval" ||
                                plantBaseProp.PropertyType.Name == "LightingCondition")
                            {
                                record.Value = ((byte)pbVal).ToString();
                            }
                            else if (plantBaseProp.Name == "Image")
                            {
                                if (isMultiple)
                                {
                                    continue;
                                }

                                var imageTypeProp = plantBaseProps.SingleOrDefault(pb => pb.Name == "ImageType");
                                var imageType = imageTypeProp?.GetValue(val);

                                record.Value = $"data:{imageType};base64,{pbVal}";
                            }
                            else
                            {
                                record.Value = pbVal?.ToString();
                            }

                            records.Add(record);
                        }
                    }
                }
                else if (property.PropertyType.Name == "Int32")
                {
                    PlantRecord record = new()
                    {
                        PropertyName = property.Name,
                        Value = property.GetValue(item)?.ToString()
                    };

                    records.Add(record);
                }
            }

            return records;
        }
    }
}