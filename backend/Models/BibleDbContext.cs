using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class BibleDbContext : DbContext
    {
        public BibleDbContext(DbContextOptions<BibleDbContext> options) : base(options) { }

        public DbSet<Translation> Translations { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Verse> Verses { get; set; }
        public DbSet<VerseText> VerseTexts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Translations
            modelBuilder.Entity<Translation>(entity =>
            {
                entity.ToTable("translations");
                entity.Property(t => t.Id).HasColumnName("id");
                entity.Property(t => t.Code).HasColumnName("code");
                entity.Property(t => t.Name).HasColumnName("name");

                entity.HasIndex(t => t.Code).IsUnique();
            });

            // Books
            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("books");
                entity.Property(b => b.Id).HasColumnName("id");
                entity.Property(b => b.Name).HasColumnName("name");
                entity.Property(b => b.Abbreviation).HasColumnName("abbreviation");
            });

            // Chapters
            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.ToTable("chapters");
                entity.Property(c => c.Id).HasColumnName("id");
                entity.Property(c => c.BookId).HasColumnName("book_id");
                entity.Property(c => c.ChapterNumber).HasColumnName("chapter_number");

                entity.HasOne(c => c.Book)
                      .WithMany(b => b.Chapters)
                      .HasForeignKey(c => c.BookId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Verses
            modelBuilder.Entity<Verse>(entity =>
            {
                entity.ToTable("verses");
                entity.Property(v => v.Id).HasColumnName("id");
                entity.Property(v => v.ChapterId).HasColumnName("chapter_id");
                entity.Property(v => v.VerseNumber).HasColumnName("verse_number");

                entity.HasOne(v => v.Chapter)
                      .WithMany(c => c.Verses)
                      .HasForeignKey(v => v.ChapterId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // VerseTexts
            modelBuilder.Entity<VerseText>(entity =>
            {
                entity.ToTable("verse_texts");
                entity.Property(vt => vt.Id).HasColumnName("id");
                entity.Property(vt => vt.VerseId).HasColumnName("verse_id");
                entity.Property(vt => vt.TranslationId).HasColumnName("translation_id");
                entity.Property(vt => vt.Text).HasColumnName("text");

                entity.HasOne(vt => vt.Verse)
                      .WithMany(v => v.VerseTexts)
                      .HasForeignKey(vt => vt.VerseId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(vt => vt.Translation)
                      .WithMany(t => t.VerseTexts)
                      .HasForeignKey(vt => vt.TranslationId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
