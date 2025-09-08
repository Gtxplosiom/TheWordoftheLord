using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BibleController : ControllerBase
    {
        private readonly Bible _books;

        public BibleController()
        {
            var json = System.IO.File.ReadAllText("Data/Bible/DRC.json");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            _books = JsonSerializer.Deserialize<Bible>(json, options) ?? new();
        }

        [HttpGet("books")]
        public IActionResult GetBooks()
        {
            var result = _books.Books.Select(b => b.Name).ToList();
            return Ok(result);
        }
    }
}
