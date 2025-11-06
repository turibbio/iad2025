export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  TITLE_MIN_LENGTH: 1,
  ERRORS: {
    TITLE_REQUIRED: 'Il titolo è obbligatorio',
    TITLE_TOO_LONG: 'Il titolo non può superare 100 caratteri',
    TITLE_TOO_SHORT: 'Il titolo deve contenere almeno un carattere',
  },
} as const;

// Legacy exports for backward compatibility
export const MAX_TITLE_LENGTH = VALIDATION.TITLE_MAX_LENGTH;
export const MIN_TITLE_LENGTH = VALIDATION.TITLE_MIN_LENGTH;
export const VALIDATION_MESSAGES = VALIDATION.ERRORS;
