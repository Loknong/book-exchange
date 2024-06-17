import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const testPrismaConnection = async () => {
    try {
        const connectionCheck = await prisma.connectionChecks.findMany()
        return {
            message:"Database connection successful.",
            data: connectionCheck,
        }
    } catch (error) {
        return {error: error instanceof Error ? error.message : "Unknown error."}
    }
}

export default prisma;