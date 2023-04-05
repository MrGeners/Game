export let layers = {};
//wrapped in a function so we can initialize layers only after the html is done processing
function initializeLayers() {
    layers = {
        background: document.getElementById("background").getContext("2d"),
        effects1: document.getElementById("effects1").getContext("2d"),
        middle: document.getElementById("middle").getContext("2d"),
        effects2: document.getElementById("effects2").getContext("2d"),
        foreground: document.getElementById("foreground").getContext("2d"),
        effects3: document.getElementById("effects3").getContext("2d"),
        ctxlayers: (function () {
            let clayers = document.querySelectorAll(".layer");
            clayers = Array.from(clayers).map(layer => layer.getContext("2d"));
            return clayers;
        })(),
        screens: (function () {
            let screens = document.querySelectorAll("canvas");
            screens = Array.from(screens).map(screen => screen.getContext("2d"));
            return screens;
        })(),
    }

    console.log(layers.effects3.canvas);
}

document.addEventListener("DOMContentLoaded", initializeLayers);