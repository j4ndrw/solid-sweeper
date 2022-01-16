import type { Difficulty } from "@/types/Difficulty";
import { Component, createEffect, createMemo, For } from "solid-js";
import Tile from "./Tile";
import { state, updateGameOver, updateScore } from "@store/store";
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
    const tiles = createMemo(() => state.tiles);

    return (
        <div class="flex flex-col justify-center items-center">
            <For each={Array(size())}>
                {(_, row) => (
                    <div class="flex justify-center items-center">
                        <For each={Array(size())}>
                            {(_, col) => (
                                <div class="flex flex-row justify-center items-center">
                                    <Tile
                                        bomb={
                                            tiles()[row() * size() + col()]
                                                .kind === "bomb"
                                        }
                                        neighbours={
                                            tiles()[row() * size() + col()]
                                                .neighbours
                                        }
                                        which={row() * size() + col()}
                                    />
                                </div>
                            )}
                        </For>
                    </div>
                )}
            </For>
            <button
                class="mt-5 flex justify-center items-center border-4 rounded-lg p-5 text-xl"
                onClick={() => {
                    window.location.reload();
                }}
            >
                Play Again
            </button>
        </div>
    );
};

export default Board;
