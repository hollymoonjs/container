import { Container, createContainer, ReadyContainer, run } from "@hollymoon/container";
import * as core from "./core";
import * as user from "./user";

createContainer(
    core,
    user,
    run(async ({ get }: ReadyContainer) => {
        const userRepository = get(user.UserRepository);
        const userService = get(user.UserService);

        await userService.register({
            email: "john.doe@example.com",
            name: "John Doe",
        });

        const john = await userRepository.get(1);
        console.log("User created:", john);
    })
);
