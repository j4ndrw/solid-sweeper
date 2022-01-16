import { ITile } from "@/interfaces/ITile";
import { createMemo } from "solid-js";

function createNeighbours(tiles: ITile[], size: number) {
    return tiles.map((tile, index) => {
        const topLeft = 0;
        const topRight = size - 1;
        const bottomLeft = size * size - size;
        const bottomRight = size * size - 1;

        const isTopLeft = index === topLeft;
        const isTopRight = index === topRight;
        const isBottomRight = index === bottomRight;
        const isBottomLeft = index === bottomLeft;
        const isTop = index > topLeft && index < topRight;
        const isBottom = index > bottomLeft && index < bottomRight;
        const isLeft =
            index % size === 0 && index > topLeft && index < bottomLeft;
        const isRight =
            (index + 1) % size === 0 && index > topRight && index < bottomRight;

        const up = (given?: number) => (given ? given - size : index - size);
        const down = (given?: number) => (given ? given + size : index + size);
        const left = (given?: number) => (given ? given - 1 : index - 1);
        const right = (given?: number) => (given ? given + 1 : index + 1);

        if (isTopLeft)
            return [
                () => tiles[right()],
                () => tiles[down()],
                () => tiles[down(right())],
            ];

        if (isTopRight)
            return [
                () => tiles[left()],
                () => tiles[down()],
                () => tiles[down(left())],
            ];

        if (isBottomRight)
            return [
                () => tiles[left()],
                () => tiles[up()],
                () => tiles[up(left())],
            ];

        if (isBottomLeft)
            return [
                () => tiles[right()],
                () => tiles[up()],
                () => tiles[up(right())],
            ];

        if (isTop)
            return [
                () => tiles[left()],
                () => tiles[right()],
                () => tiles[down()],
                () => tiles[down(right())],
                () => tiles[down(left())],
            ];

        if (isBottom)
            return [
                () => tiles[left()],
                () => tiles[right()],
                () => tiles[up()],
                () => tiles[up(right())],
                () => tiles[up(left())],
            ];

        if (isLeft)
            return [
                () => tiles[up()],
                () => tiles[down()],
                () => tiles[up(right())],
                () => tiles[down(right())],
                () => tiles[right()],
            ];

        if (isRight)
            return [
                () => tiles[up()],
                () => tiles[down()],
                () => tiles[up(left())],
                () => tiles[down(left())],
                () => tiles[left()],
            ];

        return [
            () => tiles[up(left())],
            () => tiles[up()],
            () => tiles[up(right())],
            () => tiles[left()],
            () => tiles[right()],
            () => tiles[down(left())],
            () => tiles[down()],
            () => tiles[down(right())],
        ];
    });
}

export default createNeighbours;
