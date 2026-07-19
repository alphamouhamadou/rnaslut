import { PrismaClient } from '@prisma/client'
import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // En production sur Vercel : utiliser l'adapter Neon pour le serverless
  if (process.env.DIRECT_URL) {
    const sql = neon(process.env.DIRECT_URL)
    const adapter = new PrismaNeon(sql)
    return new PrismaClient({ adapter })
  }

  // En local développement
  return new PrismaClient()
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db