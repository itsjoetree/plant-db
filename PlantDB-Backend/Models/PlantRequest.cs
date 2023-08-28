using System;
namespace PlantDB_Backend.Models
{
	/// <summary>
	/// Request type used to pass collection of primitives and
	/// an Image for each plant in the database
	/// </summary>
	public class PlantRequest
	{
		public IEnumerable<PlantRecord> Records { get; set; } = null!;

		public IFormFile? Image { get; set; }

		public bool RemoveImage { get; set; }
	}
}