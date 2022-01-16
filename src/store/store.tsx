import { ITile } from "@/interfaces/ITile";
import { createStore } from "solid-js/store";

export interface Store {
    tiles: ITile[];
    gameOver: boolean;
    score: number;
}

export const [state, setState] = createStore<Store>({
    tiles: [],
    gameOver: false,
    score: 0,
});

export function updateGameOver(newState: boolean) {
    setState({
        ...state,
        gameOver: false,
    });
}

export function updateScore(score: number) {
    setState({
        ...state,
        score: state.score + score,
    });
}

export function updateTileRevealed(currentTileIndex: number) {
    if (!state.tiles[currentTileIndex].revealed)
        setState({
            ...state,
            tiles: state.tiles.map((tile, index) => {
                if (currentTileIndex === index) {
                    return {
                        ...tile,
                        revealed: true,
                    };
                }
                return tile;
            }),
        });
}
