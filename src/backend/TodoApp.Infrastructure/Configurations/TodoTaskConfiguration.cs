using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Core.Entities;

namespace TodoApp.Infrastructure.Configurations;

/// <summary>
/// Configurazione Entity Framework per TodoTask
/// </summary>
public class TodoTaskConfiguration : IEntityTypeConfiguration<TodoTask>
{
    public void Configure(EntityTypeBuilder<TodoTask> builder)
    {
        builder.ToTable("Tasks");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(t => t.IsCompleted)
            .IsRequired();

        builder.Property(t => t.CreatedAt)
            .IsRequired();

        builder.Property(t => t.UpdatedAt)
            .IsRequired();

        // Indice per migliorare performance delle query di filtro
        builder.HasIndex(t => t.IsCompleted);

        // Indice unico sul titolo per garantire unicità
        builder.HasIndex(t => t.Title)
            .IsUnique();
    }
}
