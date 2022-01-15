import { Component, createMemo, createSignal } from "solid-js";

import { FiX as X, FiCheck as Check, FiFlag as Flag } from "solid-icons/fi";

const Tile: Component = () => {
    const [clicked, setClicked] = createSignal<boolean>(false);
    const [flagged, setFlagged] = createSignal<boolean>(false);
    const bomb = createMemo(() => Math.random() >= 0.5);

    const Icon = createMemo(() => () => {
        if (flagged()) return <Flag class="bg-yellow-500" />;
        if (clicked()) {
            if (bomb()) return <X class="bg-red-600" />;
            return <Check class="bg-green-600" />;
        }
        return <></>;
    });

    return (
        <div
            class={`w-10 h-10 ${
                clicked() ? "bg-gray-200" : "bg-gray-100"
            } hover:bg-gray-300 border-2 rounded-sm m-1`}
            onClick={() => {
                if (!clicked()) setClicked(true);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (!clicked()) setFlagged((prev) => !prev);
            }}
        >
            <Icon />
        </div>
    );
};

export default Tile;
