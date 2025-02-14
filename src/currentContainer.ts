import { provide } from "./configurators";
import { Container } from "./types";

export const currentContainer = provide<Container>((container) => container);
