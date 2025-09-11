using Newtonsoft.Json.Linq;

namespace backend.Models
{
    public class BibleContainer
    {
        public Bible Typed { get; set; } = new();
        public List<VerseInfo> Flat { get; set; } = new();
        public JObject Dynamic { get; set; } = new JObject();
    }
}
