using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Translation
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public ICollection<VerseText> VerseTexts { get; set; } = new List<VerseText>();
    }

    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Abbreviation { get; set; } = string.Empty;

        public ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
    }

    public class Chapter
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int ChapterNumber { get; set; }

        public Book Book { get; set; }
        public ICollection<Verse> Verses { get; set; } = new List<Verse>();
    }

    public class Verse
    {
        public int Id { get; set; }
        public int ChapterId { get; set; }
        public int VerseNumber { get; set; }

        public Chapter Chapter { get; set; }
        public ICollection<VerseText> VerseTexts { get; set; } = new List<VerseText>();
    }

    public class VerseText
    {
        public int Id { get; set; }
        public int VerseId { get; set; }
        public int TranslationId { get; set; }
        public string Text { get; set; } = string.Empty;

        public Verse Verse { get; set; }
        public Translation Translation { get; set; }
    }
}
