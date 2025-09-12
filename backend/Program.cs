using backend.Models;
using System.Text.Json;
using Newtonsoft.Json.Linq;

var builder = WebApplication.CreateBuilder(args);

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// singletons
builder.Services.AddSingleton(sp =>
{
    var bibleJsonContainer = new BibleContainer();

    var json = System.IO.File.ReadAllText("Data/Bible/NABRE.json");
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

    var typedBible = JsonSerializer.Deserialize<Bible>(json, options) ?? new Bible();
    var dynamicBible = JObject.Parse(json);

    var flatBible = typedBible.Books
        .SelectMany(b => b.Chapters, (b, c) => new { b.Book, c })
        .SelectMany(bc => bc.c.Verses, (bc, v) => new VerseInfo
        {
            Book = bc.Book,
            Chapter = bc.c.Chapter,
            Verse = v.Verse,
            Text = v.Text
        })
        .ToList();

    return new BibleContainer { Typed = typedBible, Flat = flatBible, Dynamic = dynamicBible };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
