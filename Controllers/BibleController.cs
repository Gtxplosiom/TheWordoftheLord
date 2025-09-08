using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.Models;
using System.Runtime.CompilerServices;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BibleController : ControllerBase
    {
        private readonly Bible _bible;

        public BibleController()
        {
            var json = System.IO.File.ReadAllText("Data/Bible/DRC.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            _bible = JsonSerializer.Deserialize<Bible>(json, options) ?? new();
        }

        [HttpGet("booklist")]
        public IActionResult GetBookList()
        {
            var result = _bible.Books.Select(b => b.Name).ToList();
            return Ok(result);
        }

        [HttpGet("{bookName}")]
        public IActionResult GetBookContent(string bookName)
        {
            var result = _bible.Books.FirstOrDefault(b => b.Name.Equals(bookName, StringComparison.OrdinalIgnoreCase));
            return Ok(result);
        }
    }
}
