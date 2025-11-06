# Accessibilità (WCAG 2.1 AA)

## Requisiti Minimi

- Elementi interattivi accessibili da tastiera (Tab, Enter, Space, Esc)
- Attributi ARIA per screen reader
- Contrasto colori minimo 4.5:1
- Focus visibile
- Labels per form inputs

## Esempio Accessibile

```typescript
<button
  aria-label={`Elimina task: ${task.title}`}
  onClick={() => handleDelete(task.id)}
>
  <TrashIcon aria-hidden="true" />
</button>

<input
  type="text"
  id="task-title"
  aria-label="Titolo del nuovo task"
  aria-describedby="title-error"
  aria-invalid={hasError}
/>

{hasError && (
  <span id="title-error" role="alert">
    Il titolo è obbligatorio
  </span>
)}
```

## Keyboard Navigation

- **Tab**: Naviga tra elementi
- **Enter**: Conferma azione
- **Escape**: Annulla
- **Space**: Toggle checkbox

## Riferimenti

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)
