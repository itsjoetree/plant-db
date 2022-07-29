using Microsoft.AspNetCore.Mvc;
using PlantDB_Backend.Models;
using PlantDB_Backend.Helpers;
using Microsoft.EntityFrameworkCore.Storage;
using static PlantDB_Backend.Models.Extensions;
using Microsoft.EntityFrameworkCore;

namespace PlantDB_Backend.Controllers
{
    [ApiController]
    [Route("/api/cacti")]
    public class CactusController : ControllerBase
    {
        private readonly PlantDBContext DbContext;

        public CactusController(PlantDBContext dbContext)
        {
            DbContext = dbContext;
        }

        [HttpGet]
        public PlantInfo Get(int skip, int top)
        {
            int totalCount = DbContext.Cacti.Count();
            IEnumerable <Cactus> cacti = DbContext.Cacti.Skip(skip).Take(top);

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

        [HttpPost]
        public async Task<int> CreateAsync(IEnumerable<PlantRecord> records)
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            string name;
            string description;
            string lightingCondition;
            string wateringInterval;
            string averageHeightInches;
            string glochids;

            try
            {
                name = records.Single(r => r.PropertyName == "name").Value ?? string.Empty;
                description = records.Single(r => r.PropertyName == "description").Value ?? string.Empty;
                lightingCondition = records.Single(r => r.PropertyName == "lightingCondition").Value ?? string.Empty;
                wateringInterval = records.Single(r => r.PropertyName == "wateringInterval").Value ?? string.Empty;
                averageHeightInches = records.Single(r => r.PropertyName == "averageHeightInches").Value ?? string.Empty;
                glochids = records.Single(r => r.PropertyName == "glochids").Value ?? string.Empty;
            }
            catch
            {
                throw new Exception("Missing required fields.");
            }

            PlantBase plantBase = new()
            {
                Name = name,
                Nickname = records.SingleOrDefault(r => r.PropertyName == "nickname")?.Value,
                Description = description,
                LightingCondition = (LightingCondition)int.Parse(lightingCondition),
                WateringInterval = (WateringInterval)int.Parse(wateringInterval),
                AverageHeightInches = decimal.Parse(averageHeightInches),
                Origin = records.SingleOrDefault(r => r.PropertyName == "origin")?.Value
            };

            await DbContext.PlantBases.AddAsync(plantBase);
            await DbContext.SaveChangesAsync();

            Cactus cactus = new()
            {
                Glochids = int.Parse(glochids),
                PlantBaseId = plantBase.Id,
            };

            await DbContext.Cacti.AddAsync(cactus);
            await DbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            return cactus.Id;
        }

        [HttpPut("{id}")]
        public async Task EditAsync(int id, IEnumerable<PlantRecord> records)
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            Cactus cactus = DbContext.Cacti
                .Include(c => c.PlantBase)
                .Single(c => c.Id == id);

            string? nickname = records.SingleOrDefault(r => r.PropertyName == "nickname")?.Value;
            string? name = records.SingleOrDefault(r => r.PropertyName == "name")?.Value;
            string? description = records.SingleOrDefault(r => r.PropertyName == "description")?.Value;
            string? lightingCondition = records.SingleOrDefault(r => r.PropertyName == "lightingCondition")?.Value;
            string? wateringInterval = records.SingleOrDefault(r => r.PropertyName == "wateringInterval")?.Value;
            string? averageHeightInches = records.SingleOrDefault(r => r.PropertyName == "averageHeightInches")?.Value;
            string? glochids = records.SingleOrDefault(r => r.PropertyName == "glochids")?.Value;
            string? origin = records.SingleOrDefault(r => r.PropertyName == "origin")?.Value;

            if (!string.IsNullOrEmpty(nickname))
            {
                cactus.PlantBase.Nickname = nickname;
            }

            if (!string.IsNullOrEmpty(name))
            {
                cactus.PlantBase.Nickname = name;
            }

            if (!string.IsNullOrEmpty(description))
            {
                cactus.PlantBase.Description = description;
            }

            if (!string.IsNullOrEmpty(lightingCondition))
            {
                cactus.PlantBase.LightingCondition = (LightingCondition)int.Parse(lightingCondition);
            }

            if (!string.IsNullOrEmpty(wateringInterval))
            {
                cactus.PlantBase.WateringInterval = (WateringInterval)int.Parse(wateringInterval);
            }

            if (!string.IsNullOrEmpty(averageHeightInches))
            {
                cactus.PlantBase.AverageHeightInches = decimal.Parse(averageHeightInches);
            }

            if (!string.IsNullOrEmpty(glochids))
            {
                cactus.Glochids = int.Parse(glochids);
            }

            DbContext.PlantBases.Update(cactus.PlantBase);
            DbContext.Cacti.Update(cactus);
            await DbContext.SaveChangesAsync();

            await transaction.CommitAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            Cactus cactus = DbContext.Cacti.Single(c => c.Id == id);
            PlantBase pb = DbContext.PlantBases.Single(pb => pb.Id == cactus.PlantBaseId);

            DbContext.Cacti.Remove(cactus);
            await DbContext.SaveChangesAsync();

            DbContext.PlantBases.Remove(pb);
            await DbContext.SaveChangesAsync();

            await transaction.CommitAsync();
        }

        private IEnumerable<PlantProperty> GenerateSchema()
        {
            return new List<PlantProperty>(SchemaBuilder.GenerateBaseSchema())
            {
                new()
                {
                    PropertyName = "glochids",
                    DisplayName = "Glochids",
                    Type = PlantDataType.Int,
                }
            };
        }
    }
}

