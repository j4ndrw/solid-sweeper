import Board from "@components/elements/Board";
import type { Difficulty } from "@/types/Difficulty";
import {
    Component,
    createMemo,
    createSignal,
    Match,
    Show,
    Switch,
} from "solid-js";
import { state, updateGameOver } from "@store/store";
import { FaSmile, FaSolidSadCry } from "solid-icons/fa";

const SolidSweeper: Component = () => {
    const [difficulty, setDifficulty] = createSignal<Difficulty | null>(null);

    const isEveryFreeTileRevealed = createMemo(
        () =>
            state.tiles.length > 0 &&
            state.tiles
                .filter((tile) => tile.kind === "free")
                .every((tile) => tile.revealed)
    );
    const isBombRevealed = createMemo(
        () =>
            state.tiles.length > 0 &&
            state.tiles
                .filter((tile) => tile.kind === "bomb")
                .some((tile) => tile.revealed)
    );

    if (isEveryFreeTileRevealed() || isBombRevealed()) {
        updateGameOver(true);
    }

    return (
        <div class="flex flex-col justify-center items-center -mt-48">
            <h1 class="mt-32 mb-5">Solid-Sweeper by j4ndrw</h1>

            <Show when={!difficulty()} fallback={<></>}>
                <h2 class="text-xl m-10">
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
                    <Switch
                        fallback={
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
                        }
                    >
                        <Match when={isEveryFreeTileRevealed()}>
                            <h1 class="text-2xl m-10 flex justify-center items-center">
                                Yay, you won! Congrats <FaSmile />
                            </h1>
                        </Match>
                        <Match when={isBombRevealed()}>
                            <h1 class="text-2xl m-10 flex justify-center items-center">
                                Oof... game over! tough luck!!!{" "}
                                <FaSolidSadCry />
                            </h1>
                        </Match>
                    </Switch>
                </div>
                <Board difficulty={difficulty()!} />
            </Show>
        </div>
    );
};

export default SolidSweeper;
