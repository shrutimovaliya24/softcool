import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Path to store verified emails
const VERIFIED_EMAILS_FILE = join(process.cwd(), 'data', 'verified-emails.json');

// Ensure data directory exists and load verified emails
export async function getVerifiedEmails(): Promise<Set<string>> {
  try {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    const data = await readFile(VERIFIED_EMAILS_FILE, 'utf-8');
    const emails = JSON.parse(data);
    return new Set(emails);
  } catch (error) {
    // File doesn't exist yet, return empty set
    return new Set<string>();
  }
}

// Save verified emails
export async function saveVerifiedEmails(emails: Set<string>): Promise<void> {
  try {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    await writeFile(VERIFIED_EMAILS_FILE, JSON.stringify(Array.from(emails), null, 2));
  } catch (error) {
    console.error('Error saving verified emails:', error);
  }
}

// Add email to verified list
export async function addVerifiedEmail(email: string): Promise<void> {
  const emailLower = email.toLowerCase().trim();
  const verifiedEmails = await getVerifiedEmails();
  verifiedEmails.add(emailLower);
  await saveVerifiedEmails(verifiedEmails);
}

// Check if email is verified
export async function isEmailVerified(email: string): Promise<boolean> {
  const emailLower = email.toLowerCase().trim();
  const verifiedEmails = await getVerifiedEmails();
  return verifiedEmails.has(emailLower);
}

