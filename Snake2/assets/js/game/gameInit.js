'use strict';

import settings, { elements } from "./gameSettings.js";
import game from "./game.js";
import BodyPart from "./bodypart.js";
import helpFunctions from "./helpfunctions.js";
import "../webcomponents/start.js"
import "../webcomponents/pause.js"

let backup = JSON.parse(JSON.stringify(settings));

const init = () => {
    if (settings.restart) {
        Object.assign(settings, JSON.parse(JSON.stringify(backup)))
        elements.score.remove();
        settings.restart = false
    }
    elements.main.innerHTML = ''
    elements.playfield = document.createElement('canvas');
    elements.playfield.width = settings.width;
    elements.playfield.height = settings.height;
    elements.main.append(elements.playfield);

    elements.score = document.createElement("score-element")
    document.body.prepend(elements.score)

    settings.snake.push(new BodyPart(
        helpFunctions.createNumber(0, 4),
        helpFunctions.createNumber(0, 4)
    ))

    settings.timerID = setInterval(game.update, settings.intervalDelay)
}

export default init