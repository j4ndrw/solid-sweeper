import type { Difficulty } from "@/types/Difficulty";
import { Component, createMemo, For } from "solid-js";
import Tile from "./Tile";

interface Props {
    difficulty: Difficulty;
}

const Board: Component<Props> = ({ difficulty }) => {
    const size = createMemo(() => {
        switch (difficulty) {
            case "easy":
                return 10;
            case "medium":
                return 25;
            case "hard":
                return 50;
        }
    });
    return (
        <div>
            <For each={Array(size())}>
                {() => (
                    <div class="flex justify-center items-center">
                        <For each={Array(size())}>
                            {() => (
                                <div class="flex flex-row justify-center items-center">
                                    <Tile />
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
