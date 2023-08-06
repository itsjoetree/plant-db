using PlantDB_Backend.Models;
using System.Reflection;
using static PlantDB_Backend.Models.Extensions;
using Microsoft.EntityFrameworkCore.Storage;

namespace PlantDB_Backend.Services
{
    /// <summary>
    /// Service with generic method to assist with plant object manipulation.
    /// </summary>
    public class PlantService : IPlantService
    {
        private readonly PlantDBContext DbContext;

        public PlantService(PlantDBContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Generic method to create a new plant object.
        /// </summary>
        /// <typeparam name="Plant">Type of plant.</typeparam>
        /// <param name="records">Collection of <see cref="PlantRecord"/> to create plant object with.</param>
        /// <returns>Id of created plant.</returns>
        /// <exception cref="NullReferenceException"></exception>
        public async Task<int> CreateAsync<Plant>(IEnumerable<PlantRecord> records, IFormFile? image) where Plant : new()
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            Plant plant = new();
            Type plantType = typeof(Plant);

            IEnumerable<PropertyInfo> plantProperties = plantType.GetProperties().Where(p => p.Name != "Id" && p.Name != "PlantBaseId");

            ManipulatePlant(plantProperties, records, ref plant, null, image);

            if (plant == null)
            {
                throw new NullReferenceException();
            }

            await DbContext.AddAsync(plant);
            await DbContext.SaveChangesAsync();
            
            string? id = plant.GetType()?.GetProperty("Id")?.GetValue(plant)?.ToString();

            if (string.IsNullOrEmpty(id))
            {
                throw new NullReferenceException();
            }

            await transaction.CommitAsync();
            return int.Parse(id);
        }

        /// <summary>
        /// Generic method to edit a plant object.
        /// </summary>
        /// <typeparam name="Plant">Type of plant.</typeparam>
        /// <param name="item">The plant object to edit.</param>
        /// <param name="records">Collection of <see cref="PlantRecord"/> to update plant object with.</param>
        /// <exception cref="NullReferenceException"></exception>
        public async Task EditAsync<Plant>(Plant item, PlantBase plantBase, IEnumerable<PlantRecord> records, IFormFile? image, bool? removeImage)
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            if (item == null)
            {
                throw new NullReferenceException();
            }

            IEnumerable<PropertyInfo> plantProperties = item.GetType().GetProperties().Where(p => p.Name != "Id" && p.Name != "PlantBaseId");

            ManipulatePlant(plantProperties, records, ref item, plantBase, image, removeImage);

            if (item == null)
            {
                throw new NullReferenceException();
            }

            DbContext.Update(item);
            await DbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }

        /// <summary>
        /// Generic method to delete a plant object.
        /// </summary>
        /// <typeparam name="Plant">Type of plant.</typeparam>
        /// <param name="plantBase"><see cref="PlantBase"/> object to delete.</param>
        /// <param name="item">Plant object to delete.</param>
        /// <exception cref="NullReferenceException"></exception>
        public async Task DeleteAsync<Plant>(PlantBase plantBase, Plant item)
        {
            using IDbContextTransaction transaction = DbContext.Database.BeginTransaction();

            if (item == null)
            {
                throw new NullReferenceException();
            }

            DbContext.Remove(item);
            await DbContext.SaveChangesAsync();

            DbContext.Remove(plantBase);
            await DbContext.SaveChangesAsync();

            await transaction.CommitAsync();
        }

        /// <summary>
        /// Passes a plant object as a reference and updates its properties.
        /// </summary>
        /// <typeparam name="Plant">Type of plant.</typeparam>
        /// <param name="plantProperties">Collection of <see cref="PropertyInfo"/> regarding the currently passed in plant.</param>
        /// <param name="records">Collection of <see cref="PlantRecord"/> to manipulate plant object with.</param>
        /// <param name="plant">Reference of the plant object to manipulate.</param>
        private void ManipulatePlant<Plant>(IEnumerable<PropertyInfo> plantProperties, IEnumerable<PlantRecord> records, ref Plant plant, PlantBase? pb = null, IFormFile? image = null, bool? removeImage = false)
        {
            foreach (PropertyInfo property in plantProperties)
            {
                if (property.PropertyType.Name == "PlantBase")
                {
                    IEnumerable<PropertyInfo> baseProps = property.PropertyType.GetProperties();

                    PlantBase plantBase = pb ?? new();

                    foreach (PropertyInfo baseProp in baseProps)
                    {
                        if (baseProp.Name == "Image")
                        {
                            if (removeImage is true)
                            {
                                baseProp.SetValue(plantBase, null);
                            }
                            else if (image is not null)
                            {
                                if (image.Length / (1024 * 1024) > 2)
                                {
                                    throw new FileLoadException();
                                }

                                /* 
                                * Ideally with performance in mind this would be stored
                                * in a file system such as Azure Blob Storage but to simplify
                                * this template we will store as base64.
                                */
                                using (var ms = new MemoryStream())
                                {
                                    image.CopyTo(ms);
                                    var fileBytes = ms.ToArray();
                                    baseProp.SetValue(plantBase, Convert.ToBase64String(fileBytes));
                                }
                            }
                            else
                            {
                                continue;
                            }
                        }
                        else if (baseProp.Name == "ImageType")
                        {
                            if (removeImage is true)
                            {
                                baseProp.SetValue(plantBase, null);
                            }
                            else if (image is not null)
                            {
                                baseProp.SetValue(plantBase, image.ContentType);
                            }
                            else
                            {
                                continue;
                            }
                        }

                        string? record = records.SingleOrDefault(r => r.PropertyName.ToLower() == baseProp.Name.ToLower())?.Value;

                        if (string.IsNullOrEmpty(record))
                        {
                            continue;
                        }
                        else if (baseProp.PropertyType.Name == "Int32")
                        {
                            baseProp.SetValue(plantBase, int.Parse(record));
                        }
                        else if (baseProp.PropertyType.Name == "WateringInterval")
                        {
                            baseProp.SetValue(plantBase, (WateringInterval)int.Parse(record));
                        }
                        else if (baseProp.PropertyType.Name == "LightingCondition")
                        {
                            baseProp.SetValue(plantBase, (LightingCondition)int.Parse(record));
                        }
                        else if (baseProp.PropertyType.Name == "Decimal")
                        {
                            baseProp.SetValue(plantBase, decimal.Parse(record));
                        }
                        else if (baseProp.PropertyType.Name == "String")
                        {
                            baseProp.SetValue(plantBase, record);
                        }
                    }

                    property.SetValue(plant, plantBase);
                }
                else if (property.PropertyType.Name == "Int32")
                {
                    string? record = records.SingleOrDefault(r => r.PropertyName.ToLower() == property.Name.ToLower())?.Value;

                    if (string.IsNullOrEmpty(record))
                    {
                        continue;
                    }

                    property.SetValue(plant, int.Parse(record));
                }
            };
        }
    }
}

