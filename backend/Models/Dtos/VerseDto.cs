namespace backend.Models.Dtos
{
    public class VerseDto
    {
        public int VerseNumber { get; set; }
        public List<VerseTextDto> VerseTexts { get; set; } = new();
    }
}
