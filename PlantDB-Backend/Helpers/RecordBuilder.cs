using System.Reflection;
using PlantDB_Backend.Models;

namespace PlantDB_Backend.Helpers
{
    public class RecordBuilder
    {
        public static IEnumerable<PlantRecord> GenerateRecords<Plant>(Plant item)
        {
            if (item == null)
            {
                throw new NullReferenceException();
            }

            Type type = item.GetType();

            IEnumerable<PropertyInfo> properties = type.GetProperties().Where(p => p.Name != "Id");
            ICollection<PlantRecord> records = new List<PlantRecord>();

            foreach (PropertyInfo property in properties)
            {
                if (property.PropertyType.Name == "PlantBase")
                {
                    object? val = property.GetValue(item);

                    if (val != null)
                    {
                        IEnumerable<PropertyInfo> plantBaseProps = val.GetType().GetProperties();

                        foreach (var plantBaseProp in plantBaseProps)
                        {
                            PlantRecord record = new()
                            {
                                PropertyName = plantBaseProp.Name,
                                Value = plantBaseProp.GetValue(val)?.ToString()
                            };

                            records.Add(record);
                        }
                    }
                }
            }

            return records;
        }
    }
}