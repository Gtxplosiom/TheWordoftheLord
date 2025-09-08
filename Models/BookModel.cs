namespace backend.Models
{
    public class Bible
    {
        public string Translation { get; set; } = "";
        public List<BookName> Books { get; set; } = new();
    }

    public class BookName
    {
        public string Name { get; set; } = "";
    }
}