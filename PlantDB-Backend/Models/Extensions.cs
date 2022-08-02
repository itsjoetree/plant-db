namespace PlantDB_Backend.Models
{
    public class Extensions
    {
        public enum LightingCondition : byte
        {
            Bright = 0,
            PartialSun,
            Low
        }

        public enum WateringInterval : byte
        {
            Often = 0,
            Sometimes,
            Seldom
        }

        public enum PlantDataType : byte
        {
            String = 0,
            Int,
            Decimal,
            Enum,
            Image
        }
    }
}

