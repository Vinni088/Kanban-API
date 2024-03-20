import prisma from "../database"

////////////////////////////////////// CRUD: Users //////////////////////////////////////
export async function createUser(name: string, email: string, password: string) {
    let user = await prisma.users.create({
        data: {
            name,
            email,
            password
        }
    })

    return user
};

export async function readUsers() {
    let users = await prisma.users.findMany();

    return users
};

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
};

export async function deleteUser(id: number) {
    let user = await prisma.users.delete({
        where: {
            id
        }
    })

    return user
};

////////////////////////////////////// Checks: Users //////////////////////////////////////

export async function checkUserEmail(email: string) {
    let users = await prisma.users.findMany({
        where: {
            email
        },
        include: {
            sessions: true
        }
    });

    return users
};

export async function readUserInfoByToken(token: string) {
    let userInfo = await prisma.users.findFirst({
        select: {
            id: true,
            name: true,
            email: true,
            sessions: true
        },
        where: {
            sessions: {
                every: {
                    token
                }
            }
        }
    })

    return userInfo
};

////////////////////////////////////// CRUD: Sessions  //////////////////////////////////////

export async function createSession(user_id: number, token: string) {
    let session = await prisma.sessions.create({
        data: {
            user_id,
            token,
        }
    })

    return session
};

export async function readSessions() {
    let sessions = await prisma.sessions.findMany();

    return sessions
};

export async function updateSession(user_id: number, token: string) {
    let newSession = await prisma.sessions.updateMany({
        where: {
            user_id
        },
        data: {
            token
        }
    })

    return newSession
};

export async function deleteSession(user_id: number) {
    let deletedSession = await prisma.sessions.deleteMany({
        where: {
            user_id
        }
    })

    return deletedSession
};

////////////////////////////////////// Checks: Sessions //////////////////////////////////////

export async function readSessionById(user_id: number) {
    let session = await prisma.sessions.findFirst({
        where: {
            user_id
        }
    });

    return session
};
