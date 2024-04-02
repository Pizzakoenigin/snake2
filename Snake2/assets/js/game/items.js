'use strict';

import settings, { elements } from "./gameSettings.js";
import helpFunctions from "./helpfunctions.js";

class Apple {
    constructor() {
        this.x = helpFunctions.createNumber(0, settings.columns);
        this.y = helpFunctions.createNumber(0, settings.rows);
        this.numPartsToAdd = 1;
    }
}

class ZoomIn {
    constructor() {
        this.x = helpFunctions.createNumber(0, settings.columns);
        this.y = helpFunctions.createNumber(0, settings.rows);
    }
}

class ZoomOut {
    constructor() {
        this.x = helpFunctions.createNumber(0, settings.columns);
        this.y = helpFunctions.createNumber(0, settings.rows);
    }
}

export {Apple, ZoomIn, ZoomOut}