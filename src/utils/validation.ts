// Validation utilities for medical data

export function validatePatientId(id: string): boolean {
  return /^[A-Z0-9]{6,10}$/.test(id);
}

export function validateMRN(mrn: string): boolean {
  return /^MRN-\d{6}$/.test(mrn);
}

export function validatePhoneNumber(phone: string): boolean {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateDateOfBirth(dob: string): boolean {
  const date = new Date(dob);
  return !isNaN(date.getTime()) && date < new Date();
}

export function validateISODateTime(datetime: string): boolean {
  const date = new Date(datetime);
  return !isNaN(date.getTime());
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"']/g, (char) => {
      const map: { [key: string]: string } = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return map[char];
    });
}

export function validateLabValue(
  value: number,
  min: number,
  max: number
): "normal" | "low" | "high" {
  if (value < min) return "low";
  if (value > max) return "high";
  return "normal";
}
