using Microsoft.AspNetCore.Mvc;
using PlantDB_Backend.Models;

namespace PlantDB_Backend.Controllers
{
    /// <summary>
    /// Provides client with information specific to the application.
    /// </summary>
    [ApiController]
    [Route("/api/app-info")]
    public class AppInfoController
    {
        /// <summary>
        /// Retrieves a collection of <see cref="PlantApiInfo"/>
        /// </summary>
        /// <returns>Collection of <see cref="PlantApiInfo"/></returns>
        [HttpGet]
        public IEnumerable<PlantApiInfo> Get()
        {
            return new List<PlantApiInfo>(2)
            {
                new()
                {
                    SingularDisplayName = "Cactus",
                    PluralDisplayName = "Cacti",
                    ImgUri = "cacti.webp",
                    Path = "cacti"
                },
                new()
                {
                    SingularDisplayName = "Fern",
                    PluralDisplayName = "Ferns",
                    ImgUri = "ferns.webp",
                    Path = "ferns"
                },
            };
        }
    }
}

