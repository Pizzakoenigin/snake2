'use strict';

let settings = {
    elements: {},
    width: 480,
    height: 480,
    rows: 10,
    columns: 10,
    minRows: 10,
    maxRows: 40,
    minColumns: 10,
    maxColumns: 40,

    direction: 'right',

    timerID: true,
    intervalDelay: 200,

    apples: [],
    zoomIn: [],
    zoomOut: [],
    snake: [],

    appleDrop: 1000,
    lastAppleDrop: 1000,

    zoomDrop: 5000,
    lastZoomDrop: 5000,

    restart: false
}

export default settings;
export let elements = settings.elements;