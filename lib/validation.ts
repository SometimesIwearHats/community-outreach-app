// lib/validation.ts

// We can keep this for other places if you want, but we won't use it on meal requests
export const nameRegex =
  /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,120}$/;

// City: letters only (plus basic punctuation), no digits
export const cityRegex =
  /^[A-Za-zÀ-ÖØ-öø-ÿ' .-]{2,120}$/;

// Phone: exactly 10 digits, e.g. 5145551234
export const phoneRegex = /^[0-9]{10}$/;

// Canadian postal code: A1A1A1
export const postalRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
