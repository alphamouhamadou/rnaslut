import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/** Récupère la session côté serveur */
export async function getSession() {
  return getServerSession(authOptions);
}

/** Alias de getSession — utilisé par les API routes admin */
export async function auth() {
  return getServerSession(authOptions);
}

/**
 * Version sécurisée de getSession.
 * Renvoie null si le JWT ne peut pas être déchiffré
 * (NEXTAUTH_SECRET manquant ou modifié entre les déploiements).
 */
export async function getSafeSession() {
  try {
    return await getServerSession(authOptions);
  } catch {
    return null;
  }
}

export { signIn, signOut } from 'next-auth/react';
export type { Session } from 'next-auth';