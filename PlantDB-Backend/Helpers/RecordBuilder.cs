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
        /// <returns>A collection of <see cref="PlantRecord"/> based off the provided item.</returns>
        /// <exception cref="NullReferenceException"></exception>
        public static IEnumerable<PlantRecord> GenerateRecords<Plant>(Plant item)
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
                            PlantRecord record = new()
                            {
                                PropertyName = plantBaseProp.Name,
                            };

                            if (plantBaseProp.PropertyType.Name == "WateringInterval" ||
                                plantBaseProp.PropertyType.Name == "LightingCondition")
                            {
                                object? pbVal = plantBaseProp.GetValue(val);

                                if (pbVal == null)
                                {
                                    continue;
                                }

                                record.Value = ((byte)pbVal).ToString();
                            }
                            else
                            {
                                record.Value = plantBaseProp.GetValue(val)?.ToString();
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