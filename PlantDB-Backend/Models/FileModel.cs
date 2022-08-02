using System;
namespace PlantDB_Backend.Models
{
    public class FileModel
    {
        public string FileName { get; set; }

        public IFormFile FormFile { get; set; }
    }
}