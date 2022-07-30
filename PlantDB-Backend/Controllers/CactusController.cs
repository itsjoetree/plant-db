using Microsoft.AspNetCore.Mvc;
using PlantDB_Backend.Models;
using PlantDB_Backend.Helpers;
using Microsoft.EntityFrameworkCore;
using PlantDB_Backend.Services;

namespace PlantDB_Backend.Controllers
{
    /// <summary>
    /// API to interact with <see cref="Cactus"/> stored in the database.
    /// </summary>
    [ApiController]
    [Route("/api/cacti")]
    public class CactusController : ControllerBase
    {
        private readonly PlantDBContext DbContext;
        private readonly PlantService PlantService;

        public CactusController(PlantDBContext dbContext)
        {
            DbContext = dbContext;
            PlantService = new(dbContext);
        }

        /// <summary>
        /// Returns a collection of <see cref="Cactus"/> in a <see cref="PlantInfo"/> object.
        /// </summary>
        /// <param name="skip">Number of records to skip when querying.</param>
        /// <param name="top">Number of records to return when querying.</param>
        /// <returns><see cref="PlantInfo"/></returns>
        [HttpGet]
        public async Task<PlantInfo> GetPlantInfo(int skip, int top)
        {
            int totalCount = await DbContext.Cacti.CountAsync();
            IEnumerable <Cactus> cacti = DbContext.Cacti
                .Include(c => c.PlantBase)
                .Skip(skip)
                .Take(top);

            List<List<PlantRecord>> records = new List<List<PlantRecord>>();
            foreach (Cactus cactus in cacti)
            {
                records.Add(RecordBuilder.GenerateRecords(cactus).ToList());
            }

            return new()
            {
                Schema = GenerateSchema(),
                Records = records,
                TotalCount = totalCount
            };
        }

        /// <summary>
        /// Returns information regarding a <see cref="Cactus"/> in a <see cref="PlantInfo"/> object.
        /// </summary>
        /// <param name="id">Id of <see cref="Cactus"/> to query.</param>
        /// <returns><see cref="PlantInfo"/></returns>
        [HttpGet("{id}")]
        public async Task<PlantInfo> GetPlantInfo(int id)
        {
            List<List<PlantRecord>> records = new List<List<PlantRecord>>();
            Cactus cactus = await DbContext.Cacti
                .Include(f => f.PlantBase)
                .SingleAsync(f => f.Id == id);

            records.Add(RecordBuilder.GenerateRecords(cactus).ToList());

            return new()
            {
                Schema = GenerateSchema(),
                Records = records,
                TotalCount = 1
            };
        }

        /// <summary>
        /// Creates a new <see cref="Cactus"/>.
        /// </summary>
        /// <param name="records">A collection of<see cref="PlantRecord"/> to build new <see cref="Cactus"/></param>
        /// <returns>Id of new <see cref="Cactus"/></returns>
        [HttpPost]
        [Consumes("application/json")]
        public async Task<int> CreateAsync(IEnumerable<PlantRecord> records)
        {
            return await PlantService.CreateAsync<Cactus>(records);
        }

        /// <summary>
        /// Edits an existing <see cref="Cactus"/>
        /// </summary>
        /// <param name="id">Id of the <see cref="Cactus"/> to edit.</param>
        /// <param name="records">A collection of <see cref="PlantRecord"/> to update the <see cref="Cactus"/> with.</param>
        [HttpPut("{id}")]
        [Consumes("application/json")]
        public async Task EditAsync(int id, IEnumerable<PlantRecord> records)
        {
            Cactus cactus = DbContext.Cacti
                .Include(c => c.PlantBase)
                .AsNoTracking()
                .Single(c => c.Id == id);

            await PlantService.EditAsync(cactus, records);
        }

        /// <summary>
        /// Deletes an existing <see cref="Cactus"/>
        /// </summary>
        /// <param name="id">Id of the <see cref="Cactus"/> to remove.</param>
        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
            Cactus cactus = DbContext.Cacti.Single(c => c.Id == id);
            PlantBase plantBase = DbContext.PlantBases.Single(pb => pb.Id == cactus.PlantBaseId);
            await PlantService.DeleteAsync(plantBase, cactus);
        }

        /// <summary>
        /// Generates a schema specific to <see cref="Cactus"/>.
        /// </summary>
        /// <returns>Collection of <see cref="PlantProperty"/></returns>
        private IEnumerable<PlantProperty> GenerateSchema()
        {
            return new List<PlantProperty>(SchemaBuilder.GenerateBaseSchema())
            {
                new()
                {
                    PropertyName = nameof(Cactus.Glochids),
                    DisplayName = "Glochids",
                    Type = PlantDataType.Int,
                }
            };
        }
    }
}

