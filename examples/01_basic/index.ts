import { Container, createContainer, run } from "@hollymoon/container";
import * as core from "./core";
import * as user from "./user";

createContainer(
    core,
    user,
    run(async ({ inject }: Container) => {
        const userRepository = await inject(user.UserRepository);
        const userService = await inject(user.UserService);

        await userService.register({
            email: "john.doe@example.com",
            name: "John Doe",
        });

        const john = await userRepository.get(1);
        console.log("User created:", john);
    })
);
