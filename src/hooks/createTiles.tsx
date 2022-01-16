import { ITile } from "@interfaces/ITile";
import { setState, state } from "@store/store";
import createNeighbours from "./createNeighbours";

const populateBombs = (tiles: ITile[], size: number): ITile[] => {
    if (tiles.filter((tile) => tile.kind === "bomb").length < size) {
        const freeIdxs = tiles.flatMap((tile, index) =>
            tile.kind === "free" ? [index] : []
        );
        const randomIdx = Math.floor(Math.random() * freeIdxs.length);

        const selectedTile = tiles[freeIdxs[randomIdx]];
        tiles[freeIdxs[randomIdx]] = {
            ...selectedTile,
            kind: "bomb",
        };
        return populateBombs(tiles, size);
    }
    return tiles;
};

function createTiles(size: number) {
    const tiles: ITile[] = Array(size * size).fill({
        kind: "free",
        revealed: false,
    } as ITile);

    const allNeighbours = createNeighbours(tiles, size);

    const initializedTiles = populateBombs(tiles, size).map(
        (tile, index): ITile => {
            const neighbours = allNeighbours[index];
            return {
                ...tile,
                neighbours,
            };
        }
    );

    setState({
        ...state,
        tiles: initializedTiles,
    });
}

export default createTiles;
