namespace backend.Models.Dtos
{
    public class BookContentDto
    {
        public string Name { get; set; } = string.Empty;
        public string Abbreviation { get; set; } = string.Empty;
        public List<ChapterDto> Chapters { get; set; } = new();
    }
}
