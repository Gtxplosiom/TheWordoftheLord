namespace backend.Models.Dtos
{
    public class ChapterDto
    {
        public int ChapterNumber { get; set; }
        public List<VerseDto> Verses { get; set; } = new();
    }
}
