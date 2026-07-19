import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}