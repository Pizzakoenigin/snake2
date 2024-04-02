'use strict';

const helpFunctions = {
    createNumber(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    }
}

export default helpFunctions;