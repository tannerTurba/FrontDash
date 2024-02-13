import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(username:string, password:string, status:string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            status: status,
        },
    })

    console.log(JSON.stringify(user));
}

createUser(process.argv[2], process.argv[3], process.argv[4]);