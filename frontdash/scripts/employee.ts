import { PrismaClient, User } from '@prisma/client';


export async function getAllUsers(managerBusinessId: string): Promise<User[]> {
    const prisma = new PrismaClient();
    try {
        return await prisma.$queryRaw`SELECT User.*
                                      FROM User 
                                      JOIN WorksFor ON User.id = WorksFor.userId 
                                      JOIN Business ON WorksFor.BusinessId = Business.id
                                      WHERE Business.id = ${managerBusinessId};`;
    } catch (error) {
        console.error('Error fetching Users:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}

// currently not working
export async function updateUserStatus(id: number, status: string) {
    const prisma = new PrismaClient();
    try {
        
        const newStatus = 'inactive' ? 'active' : 'inactive';

        return await prisma.user.update({
            where: { id: id },
            data: { status: newStatus }
        });
    } catch (error) {
        console.error('Error updating User status:', error);
    } finally {
        await prisma.$disconnect();
    }
}