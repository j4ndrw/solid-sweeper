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
        gameOver: true,
    });
}

export function updateNeighboursIfTileFree(
    neighbourBombs: number,
    currentTileIndex: number
) {
    setState({
        ...state,
        tiles: state.tiles.map((tile, index) => {
            if (currentTileIndex === index) {
                return {
                    ...tile,
                    neighbours:
                        neighbourBombs === 0
                            ? tile.neighbours.map((neighbour) => () => ({
                                  ...neighbour(),
                                  revealed: true,
                              }))
                            : tile.neighbours,
                };
            }
            return tile;
        }),
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
