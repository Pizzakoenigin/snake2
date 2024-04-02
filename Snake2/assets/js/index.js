'use strict';

import { elements } from './game/gameSettings.js';
import game from './game/game.js';
import "./webcomponents/start.js"

const domMapping = () => {
    elements.main = document.querySelector('main')
    elements.start = document.createElement('start-element');
    elements.main.append(elements.start)
}

const appendEventListeners = () => {
    window.addEventListener('keydown', game.handlekeydown);
}

const init = () => {
    domMapping();
    appendEventListeners();
}

document.addEventListener('DOMContentLoaded', init)