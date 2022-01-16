import { Component, createEffect, createMemo, createSignal } from "solid-js";

import { FiX as X, FiFlag as Flag } from "solid-icons/fi";

import { state, updateScore, updateTileRevealed } from "@store/store";
import { ITile } from "@/interfaces/ITile";

interface Props {
    bomb: boolean;
    neighbours: readonly (() => ITile)[];
    which: number;
}

const Tile: Component<Props> = ({ bomb, neighbours, which }) => {
    const tileState = createMemo(() => state.tiles[which]);

    const [flagged, setFlagged] = createSignal<boolean>(false);
    const [isScoreUpdated, setIsScoreUpdated] = createSignal<boolean>(false);

    const neighbourBombs = createMemo(() =>
        neighbours.reduce((bombs, neighbour) => {
            if (neighbour().kind === "bomb") return bombs + 1;
            return bombs;
        }, 0)
    );

    const Icon = createMemo(() => () => {
        if (flagged()) return <Flag class="w-6 h-6 bg-yellow-500" />;

        if (tileState().revealed) {
            if (bomb) return <X class="w-6 h-6 bg-red-600" />;

            return (
                <h2 class="text-xl text-center mb-2 w-6 h-6 bg-green-600">
                    {neighbourBombs() === 0 ? "" : neighbourBombs()}
                </h2>
            );
        }
        return <></>;
    });

    createEffect(() => {
        if (tileState().revealed && !bomb) {
            if (!isScoreUpdated()) {
                updateScore(8 - neighbourBombs());
                setIsScoreUpdated(true);
            }
        }
    });

    return (
        <div
            class={`w-7 h-7 ${
                tileState().revealed ? "bg-gray-200" : "bg-gray-100"
            } hover:bg-gray-300 border-2 rounded-sm m-1`}
            onClick={() => {
                if (!tileState().revealed && !flagged() && !state.gameOver) {
                    updateTileRevealed(which);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (!state.gameOver && !tileState().revealed) {
                    setFlagged((prev) => !prev);
                }
            }}
        >
            <Icon />
        </div>
    );
};

export default Tile;
