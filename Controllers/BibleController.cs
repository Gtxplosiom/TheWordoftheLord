using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BibleController : ControllerBase
    {
        private readonly BibleContainer _bibleContainer;

        public BibleController(BibleContainer bibleContainer)
        {
            _bibleContainer = bibleContainer;
        }

        [HttpGet("booklist")]
        public IActionResult GetBookList()
        {
            var result = _bibleContainer.Typed.Books.Select(b => b.Name).ToList();
            return Ok(result);
        }

        [HttpGet("{bookName}")]
        public IActionResult GetBookContent(string bookName)
        {
            var result = _bibleContainer.Typed.Books.FirstOrDefault(b => b.Name.Equals(bookName, StringComparison.OrdinalIgnoreCase));
            return Ok(result);
        }

        // implement semantic searching
        [HttpGet("query/{queryString}")]
        public IActionResult BibleQuery(string queryString)
        {
            var result = _bibleContainer.Flat
                .Where(verse => verse.Text.Contains(queryString, StringComparison.OrdinalIgnoreCase))
                .ToList();
            return Ok(result);
        }

        [HttpGet("query/book/{queryString}")]
        public IActionResult BibleBookQuery(string queryString)
        {
            var result = _bibleContainer.Flat
                .Where(verse => verse.Book.Contains(queryString, StringComparison.OrdinalIgnoreCase))
                .ToList();
            return Ok(result);
        }
    }
}

// TODO: verify bible files for error
// because right now psalms doesn't align
