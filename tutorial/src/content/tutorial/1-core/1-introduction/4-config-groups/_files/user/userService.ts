import { Container } from "@hollymoon/container";
import { CreateUserData, UserRepository } from "./userRepository";

export async function UserService(container: Container) {
    const userRepository = await container.inject(UserRepository);

    return {
        register(data: CreateUserData) {
            const user = userRepository.create(data);

            console.log("Sending verification email to", user.email);

            return user;
        },
    };
}
