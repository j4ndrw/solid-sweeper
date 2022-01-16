export interface ITile {
    kind: "free" | "bomb";
    neighbours: (() => ITile)[];
    revealed: boolean;
}
