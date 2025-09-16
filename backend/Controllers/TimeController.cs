using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly TimeModel _timeModel;
        public TimeController(HttpClient httpClient, TimeModel timeModel)
        {
            _httpClient = httpClient;
            _timeModel = timeModel;
        }

        [HttpGet("currtime/{timeZone}")]
        public async Task<IActionResult> FetchCurrTime(string timeZone)
        {
            var url = $"https://timeapi.io/api/time/current/zone?timeZone={timeZone}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch time from TimeAPI");
            }

            var json = await response.Content.ReadAsStringAsync();

            var timeData = JsonSerializer.Deserialize<TimeModel>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var result = new
            {
                timeData.TimeZone,
                timeData.Year,
                timeData.Month,
                timeData.Day,
                timeData.Hour,
                timeData.Minute,
                timeData.Seconds
            };

            return Ok(result);
        }
    }
}
