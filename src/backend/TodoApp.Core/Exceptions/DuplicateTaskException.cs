namespace TodoApp.Core.Exceptions;

/// <summary>
/// Eccezione lanciata quando si tenta di creare un task duplicato
/// </summary>
public class DuplicateTaskException : Exception
{
    public DuplicateTaskException(string title)
        : base($"Un task con il titolo '{title}' esiste già.")
    {
    }
}
