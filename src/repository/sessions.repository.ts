import prisma from "../database"

export async function createUser(name: string, email: string, password: string) {
    let user = await prisma.users.create({
        data: {
            name,
            email,
            password
        }
    })

    return user
}

export async function readUsers() {
    let users = await prisma.users.findMany();

    return users
}

export async function updateUser(id: number, name: string, email: string, password: string) {
    let user = await prisma.users.update({
        where: {
            id
        },
        data: {
            name,
            email,
            password,
            created_at: new Date()
        }
    })

    return user
}

export async function deleteUser(id: number) {
    let user = await prisma.users.delete({
        where: {
            id
        }
    })

    return user
}