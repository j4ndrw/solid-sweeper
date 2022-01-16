import { Component, createEffect, createMemo, createSignal } from "solid-js";

import { FiX as X, FiCheck as Check, FiFlag as Flag } from "solid-icons/fi";

import {
    state,
    updateGameOver,
    updateNeighboursIfTileFree,
    updateScore,
    updateTileRevealed,
} from "@store/store";
import { ITile } from "@/interfaces/ITile";

interface Props {
    bomb: boolean;
    neighbours: readonly (() => ITile)[];
    index: number;
}

const Tile: Component<Props> = ({ bomb, neighbours, index }) => {
    const tileState = createMemo(() => state.tiles[index]);

    const [flagged, setFlagged] = createSignal<boolean>(false);
    const [isScoreUpdated, setIsScoreUpdated] = createSignal<boolean>(false);

    const Icon = createMemo(() => () => {
        if (flagged()) return <Flag class="w-6 h-6 bg-yellow-500" />;

        if (tileState().revealed) {
            if (bomb) {
                updateGameOver(true);
                return <X class="w-6 h-6 bg-red-600" />;
            }

            const neighbourBombs = neighbours.reduce((bombs, neighbour) => {
                if (neighbour().kind === "bomb") return bombs + 1;
                return bombs;
            }, 0);
            if (!isScoreUpdated()) {
                updateNeighboursIfTileFree(neighbourBombs, index);
                updateScore(8 - neighbourBombs);
                setIsScoreUpdated(true);
            }

            return (
                <h2 class="text-xl text-center mb-2 w-6 h-6 bg-green-600">
                    {neighbourBombs === 0 ? "" : neighbourBombs}
                </h2>
            );
        }
        return <></>;
    });

    return (
        <div
            class={`w-7 h-7 ${
                tileState().revealed ? "bg-gray-200" : "bg-gray-100"
            } hover:bg-gray-300 border-2 rounded-sm m-1`}
            onClick={() => {
                if (!tileState().revealed && !flagged() && !state.gameOver) {
                    updateTileRevealed(index);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (!state.gameOver && !tileState().revealed)
                    setFlagged((prev) => !prev);
            }}
        >
            <Icon />
        </div>
    );
};

export default Tile;
