import Board from "@components/elements/Board";
import type { Difficulty } from "@/types/Difficulty";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { state } from "@store/store";

const SolidSweeper: Component = () => {
    const [difficulty, setDifficulty] = createSignal<Difficulty | null>(null);

    return (
        <div class="flex flex-col justify-center items-center -mt-48">
            <h1 class="m-20">Solid-Sweeper - by j4ndrw</h1>

            <Show when={!difficulty()} fallback={<></>}>
                <h2 class="text-xl m-20">
                    A (close enough) minesweeper clone! :D
                </h2>
                <h2 class="text-xl">Choose difficulty</h2>
                <div class="flex justify-between items-center">
                    <button
                        class="hover:bg-slate-800 border-4 border-green-600 rounded-lg text-xl p-5 m-5"
                        onClick={() => setDifficulty("easy")}
                    >
                        Easy
                    </button>
                    <button
                        class="hover:bg-slate-800 border-4 border-yellow-600 rounded-lg text-xl p-5 m-5"
                        onClick={() => setDifficulty("medium")}
                    >
                        Medium
                    </button>
                    <button
                        class="hover:bg-slate-800 border-4 border-red-600 rounded-lg text-xl p-5 m-5"
                        onClick={() => setDifficulty("hard")}
                    >
                        Hard
                    </button>
                </div>
            </Show>
            <Show when={difficulty()} fallback={<></>}>
                <div class="flex justify-center items-center">
                    <Show
                        when={!state.gameOver}
                        fallback={
                            <h1 class="text-2xl m-10">
                                Oof... game over! tough luck!!! :(
                            </h1>
                        }
                    >
                        <div class="flex flex-col justify-center items-center">
                            <div class="flex justify-center items-center">
                                <h2 class="text-2xl mr-5">Difficulty: </h2>
                                <h2
                                    class={`text-2xl capitalize ${(() => {
                                        switch (difficulty()) {
                                            case "easy":
                                                return "text-green-600";
                                            case "medium":
                                                return "text-yellow-600";
                                            case "hard":
                                                return "text-red-600";
                                        }
                                    })()}`}
                                >
                                    {difficulty()}
                                </h2>
                            </div>
                            <h2 class="text-xl">Score: {state.score}</h2>
                        </div>
                    </Show>
                </div>
                <Board difficulty={difficulty()!} />
            </Show>
            <h2 class="absolute bottom-20 text-sm">
                Refresh the page to play again
            </h2>
        </div>
    );
};

export default SolidSweeper;
