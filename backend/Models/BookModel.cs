namespace backend.Models
{
    public class Bible
    {
        public string Translation { get; set; } = "";
        public List<Books> Books { get; set; } = new();
    }

    public class Books
    {
        public string Book { get; set; } = "";
        public List<Chapters> Chapters { get; set; } = new();
    }

    public class Chapters
    {
        public int Chapter { get; set; }
        public List<Verses> Verses { get; set; } = new();
    }

    public class Verses
    {
        public int Verse { get; set; }
        public string Text { get; set; } = "";
    }
}
