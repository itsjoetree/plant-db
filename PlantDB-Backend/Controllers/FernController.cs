using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantDB_Backend.Helpers;
using PlantDB_Backend.Models;
using PlantDB_Backend.Services;

namespace PlantDB_Backend.Controllers
{
    [ApiController]
    [Route("/api/ferns")]
    public class FernController : ControllerBase
    {
        private readonly PlantDBContext DbContext;
        private readonly PlantService PlantService;

        public FernController(PlantDBContext dbContext)
        {
            DbContext = dbContext;
            PlantService = new(dbContext);
        }

        /// <summary>
        /// Returns a collection of <see cref="Fern"/> in a <see cref="PlantInfo"/> object.
        /// </summary>
        /// <param name="skip">Number of records to skip when querying.</param>
        /// <param name="top">Number of records to return when querying.</param>
        /// <returns><see cref="PlantInfo"/></returns>
        [HttpGet]
        public async Task<PlantInfo> GetPlantInfo(int skip, int top)
        {
            int totalCount = await DbContext.Ferns.CountAsync();
            IEnumerable<Fern> ferns = DbContext.Ferns
                .Include(f => f.PlantBase)
                .Skip(skip).Take(top);

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

        /// <summary>
        /// Returns information regarding a <see cref="Fern"/> in a <see cref="PlantInfo"/> object.
        /// </summary>
        /// <param name="id">Id of <see cref="Fern"/> to query.</param>
        /// <returns><see cref="PlantInfo"/></returns>
        [HttpGet("{id}")]
        public async Task<PlantInfo> GetPlantInfo(int id)
        {
            List<List<PlantRecord>> records = new List<List<PlantRecord>>();
            Fern fern = await DbContext.Ferns
                .Include(f => f.PlantBase)
                .SingleAsync(f => f.Id == id);

            records.Add(RecordBuilder.GenerateRecords(fern).ToList());

            return new()
            {
                Schema = GenerateSchema(),
                Records = records,
                TotalCount = 1
            };
        }

        /// <summary>
        /// Creates a new <see cref="Fern"/>.
        /// </summary>
        /// <param name="records">A collection of<see cref="PlantRecord"/> to build new <see cref="Fern"/></param>
        /// <returns>Id of new <see cref="Fern"/></returns>
        [HttpPost]
        [Consumes("application/json")]
        public async Task<int> CreateAsync([FromBody] IEnumerable<PlantRecord> records)
        {
            return await PlantService.CreateAsync<Fern>(records);
        }

        /// <summary>
        /// Edits an existing <see cref="Fern"/>
        /// </summary>
        /// <param name="id">Id of the <see cref="Fern"/> to edit.</param>
        /// <param name="records">A collection of <see cref="PlantRecord"/> to update the <see cref="Fern"/> with.</param>
        [HttpPut("{id}")]
        [Consumes("application/json")]
        public async Task EditAsync(int id, IEnumerable<PlantRecord> records)
        {
            Fern fern = DbContext.Ferns
                .Include(c => c.PlantBase)
                .AsNoTracking()
                .Single(c => c.Id == id);

            await PlantService.EditAsync(fern, records);
        }

        /// <summary>
        /// Deletes an existing <see cref="Fern"/>
        /// </summary>
        /// <param name="id">Id of the <see cref="Fern"/> to remove.</param>
        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
            Fern fern = DbContext.Ferns.Single(c => c.Id == id);
            PlantBase plantBase = DbContext.PlantBases.Single(pb => pb.Id == fern.PlantBaseId);
            await PlantService.DeleteAsync(plantBase, fern);
        }

        /// <summary>
        /// Generates a schema specific to <see cref="Fern"/>.
        /// </summary>
        /// <returns>Collection of <see cref="PlantProperty"/></returns>
        private IEnumerable<PlantProperty> GenerateSchema()
        {
            return new List<PlantProperty>(SchemaBuilder.GenerateBaseSchema())
            {
                new()
                {
                    PropertyName = nameof(Fern.Blades),
                    DisplayName = "Blades",
                    Type = PlantDataType.Int,
                    IsRequired = true,
                }
            };
        }
    }
}

