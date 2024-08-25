import { createContainer, run } from "@hollymoon/container";
import user from "./user";
import { UserService } from "./user/userService";

createContainer(
    user,
    run(async (container) => {
        const userService = await container.inject(UserService);

        const user = userService.register({
            email: "john.doe@example.com",
            name: "John Doe",
        });

        console.log("User registered:", user);
    })
);
