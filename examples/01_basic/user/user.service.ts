import { Container } from "@hollymoon/container";
import { Mail } from "../core";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export async function UserService({ inject }: Container) {
    const userRepository = await inject(UserRepository);
    const mailService = await inject(Mail);

    return {
        async register(user: User) {
            console.log("[UserService] Registering user:", user);
            await userRepository.create(1, user);
            await mailService.send(
                user.email,
                "Welcome to our platform!",
                "You have successfully registered!"
            );
        },
    };
}
