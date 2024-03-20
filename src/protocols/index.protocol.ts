export type ApplicationError = {
    type: string;
    message: string;
};

export type SessionInfo = {
    id: number,
    name: string,
    email: string,
    sessions:
    {
        id: number,
        user_id: number,
        token: string
    }[]
}