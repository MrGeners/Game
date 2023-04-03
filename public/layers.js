export const layers = {
    background: document.getElementById("background").getContext("2d"),
    effects1: document.getElementById("effects1").getContext("2d"),
    middle: document.getElementById("middle").getContext("2d"),
    effects2: document.getElementById("effects2").getContext("2d"),
    foreground: document.getElementById("foreground").getContext("2d"),
    effects3: document.getElementById("effects3").getContext("2d"),
    layers: (function () {
        let layers = document.querySelectorAll(".layer");
        layers = Array.from(layers).map(layer => layer.getContext("2d"));
        return layers;
    })(),
    screens: (function () {
        let screens = document.querySelectorAll("canvas");
        screens = Array.from(screens).map(screen => screen.getContext("2d"));
        return screens;
    })(),


}