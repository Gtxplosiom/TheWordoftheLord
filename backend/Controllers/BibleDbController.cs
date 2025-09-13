using backend.Models;
using backend.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BibleDbController : ControllerBase
    {
        private readonly BibleDbContext _context;
        public BibleDbController(BibleDbContext context)
        {
            _context = context;
        }

        [HttpGet("booklist")]
        public IActionResult GetBookList()
        {
            var result = _context.Books
                .Select(b => b.Name)
                .ToList();
            return Ok(result);
        }

        [HttpGet("content/{bookName}")]
        public IActionResult GetBookContent(string bookName)
        {
            var result = _context.Books
                .Where(b => EF.Functions.ILike(b.Name, bookName))
                .Select(b => new BookContentDto
                {
                    Name = b.Name,
                    Abbreviation = b.Abbreviation,
                    Chapters = b.Chapters.Select(c => new ChapterDto
                    {
                        ChapterNumber = c.ChapterNumber,
                        Verses = c.Verses.Select(v => new VerseDto
                        {
                            VerseNumber = v.VerseNumber,
                            VerseTexts = v.VerseTexts.Select(vt => new VerseTextDto
                            {
                                Text = vt.Text,
                                TranslationCode = vt.Translation.Code,
                            }).ToList()
                        }).ToList()
                    }).ToList()
                }).FirstOrDefault();

            return Ok(result);
        }

        [HttpGet("query/whole/{queryString}")]
        public IActionResult BibleWholeQuery(string queryString)
        {
            var result = _context.VerseTexts
                .Where(vt => EF.Functions.ILike(vt.Text, $"%{queryString}%"))
                .Select(vt => new
                {
                    BookName = vt.Verse.Chapter.Book.Name,
                    ChapterNum = vt.Verse.Chapter.ChapterNumber,
                    VerseNum = vt.Verse.VerseNumber,
                    VerseText = vt.Text
                })
                .ToList();

            return Ok(result);
        }

        [HttpGet("query/single/{currBook}/{queryString}")]
        public IActionResult BibleSingleQuery(string currBook, string queryString)
        {
            var result = _context.VerseTexts
                .Where(vt => EF.Functions.ILike(vt.Verse.Chapter.Book.Name, currBook) &&
                    EF.Functions.ILike(vt.Text, $"%{queryString}%"))
                .Select(vt => new
                {
                    ChapterNum = vt.Verse.Chapter.ChapterNumber,
                    VerseNum = vt.Verse.VerseNumber,
                    VerseText = vt.Text
                })
                .ToList();

            return Ok(result);
        }
    }
}
