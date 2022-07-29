using Microsoft.AspNetCore.Mvc;
using PlantDB_Backend.Helpers;
using PlantDB_Backend.Models;

namespace PlantDB_Backend.Controllers
{
    [ApiController]
    [Route("/api/ferns")]
    public class FernController : ControllerBase
    {
        public readonly PlantDBContext DbContext;

        public FernController(PlantDBContext dbContext)
        {
            DbContext = dbContext;
        }

        [HttpGet]
        public PlantInfo Get(int skip, int top)
        {
            int totalCount = DbContext.Ferns.Count();
            IEnumerable<Fern> ferns = DbContext.Ferns.Skip(skip).Take(top);

            List<List<PlantRecord>> records = new List<List<PlantRecord>>();
            foreach (Fern fern in ferns)
            {
                records.Add(RecordBuilder.GenerateRecords(fern).ToList());
            }

            return new()
            {
                Schema = GenerateSchema(),
                Records = records,
                TotalCount = totalCount
            };
        }

        private IEnumerable<PlantProperty> GenerateSchema()
        {
            return new List<PlantProperty>(SchemaBuilder.GenerateBaseSchema())
            {
                new()
                {
                    PropertyName = "blades",
                    DisplayName = "Blades",
                    Type = PlantDataType.Int,
                }
            };
        }
    }
}

