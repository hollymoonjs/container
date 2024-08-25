export interface User {
    email: string;
    name: string;
    createdAt: Date;
}

export type CreateUserData = Pick<User, "email" | "name">;

export function UserRepository() {
    let users: User[] = [];

    return {
        create(user: CreateUserData) {
            const newUser = {
                ...user,
                createdAt: new Date(),
            };

            users.push(newUser);

            return newUser;
        },
        list() {
            return users;
        },
    };
}
