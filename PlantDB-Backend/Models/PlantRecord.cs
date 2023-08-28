namespace PlantDB_Backend.Models
{
    /// <summary>
    /// A key value pair of a property name and its primitive
    /// value in string format
    /// </summary>
    public class PlantRecord
    {
        public string PropertyName { get; set; } = null!;

        /// <summary>
        /// A primitive value that will be converted based on the specified
        /// <see cref="PlantProperty.Type"/>
        /// </summary>
        public string? Value { get; set; }
    }
}