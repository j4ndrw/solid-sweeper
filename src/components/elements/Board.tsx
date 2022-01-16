import type { Difficulty } from "@/types/Difficulty";
import { Component, createEffect, createMemo, For } from "solid-js";
import Tile from "./Tile";
import { state, setState } from "@store/store";
import { ITile } from "@/interfaces/ITile";
import createNeighbours from "@/hooks/createNeighbours";
import createTiles from "@/hooks/createTiles";

interface Props {
    difficulty: Difficulty;
}

const Board: Component<Props> = ({ difficulty }) => {
    const size = createMemo(() => {
        switch (difficulty) {
            case "easy":
                return 5;
            case "medium":
                return 10;
            case "hard":
                return 15;
        }
    });

    createTiles(size());

    return (
        <div>
            <For each={Array(size())}>
                {(_, row) => (
                    <div class="flex justify-center items-center">
                        <For each={Array(size())}>
                            {(_, col) => (
                                <div class="flex flex-row justify-center items-center">
                                    <Tile
                                        bomb={
                                            state.tiles[row() * size() + col()]
                                                .kind === "bomb"
                                        }
                                        neighbours={
                                            state.tiles[row() * size() + col()]
                                                .neighbours
                                        }
                                        index={row() * size() + col()}
                                    />
                                </div>
                            )}
                        </For>
                    </div>
                )}
            </For>
        </div>
    );
};

export default Board;
