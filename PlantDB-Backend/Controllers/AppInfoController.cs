using Microsoft.AspNetCore.Mvc;
using PlantDB_Backend.Models;

namespace PlantDB_Backend.Controllers
{
    [ApiController]
    [Route("/api/app-info")]
    public class AppInfoController
    {
        [HttpGet]
        public IEnumerable<PlantApiInfo> Get()
        {
            return new List<PlantApiInfo>(2)
            {
                new()
                {
                    SingularDisplayName = "Cactus",
                    PluralDisplayName = "Cacti",
                    Path = "cacti"
                },
                new()
                {
                    SingularDisplayName = "Fern",
                    PluralDisplayName = "Ferns",
                    Path = "ferns"
                },
            };
        }
    }
}

