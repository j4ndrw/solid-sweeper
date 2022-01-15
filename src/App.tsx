import SolidSweeper from "@components/game/SolidSweeper";
import type { Component } from "solid-js";

const App: Component = () => {
    return (
        <div class="w-screen h-screen flex flex-col justify-center items-center">
            <SolidSweeper />
        </div>
    );
};

export default App;
