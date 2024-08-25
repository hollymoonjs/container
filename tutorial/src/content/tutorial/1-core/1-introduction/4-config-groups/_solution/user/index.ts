import { defineConfig } from "@hollymoon/container";
import { UserRepository } from "./userRepository";
import { UserService } from "./userService";

export default defineConfig(UserRepository, UserService);
