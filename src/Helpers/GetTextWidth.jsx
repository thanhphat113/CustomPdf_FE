export function getTextWidth(text,fontSize, font = " Arial" ) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = fontSize +"px"+font;
    return ctx.measureText(text).width;
}

