export function sanitizeText(text: any): string {
  if (typeof text !== 'string') return '';
  
  // Prevent Script Injection (XSS) by escaping HTML entities
  let sanitized = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
    
  return sanitized;
}

export function validateEmail(email: any): boolean {
  if (typeof email !== 'string') return false;
  // Strict regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email) && email.length <= 254;
}

export function validateStringLength(text: any, min: number = 1, max: number = 2000): boolean {
  if (typeof text !== 'string') return false;
  return text.trim().length >= min && text.length <= max;
}

export function validateOptions(value: any, allowedOptions: string[]): boolean {
  if (typeof value !== 'string') return false;
  return allowedOptions.includes(value);
}
