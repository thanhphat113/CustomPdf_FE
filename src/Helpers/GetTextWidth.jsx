export function getTextWidth(text, font = "16px Arial") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
}

