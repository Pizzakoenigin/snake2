'use strict';

import settings, { elements } from "./gameSettings.js";
import { Apple, ZoomIn, ZoomOut } from "./items.js"
import BodyPart from "./bodypart.js";
import gameInit from "./gameInit.js";
import "../webcomponents/score.js"
import "../webcomponents/pause.js"
import "../webcomponents/gameOver.js"

const game = {
    update() {
        game.collect();
        game.pass();
        game.moveSnake();
        game.checkCollision();
        game.renderPlayfield();
        game.renderApples();
        game.renderZoomItem();
        game.renderSnake();
    },

    addBodyPart(numPartsToAdd) {
        for (let i = 0; i < numPartsToAdd; i++) {
            settings.snake.push(new BodyPart(-1, -1))
        }
    },

    collect() {
        let head = settings.snake[0];
        settings.apples.forEach(apple => {
            if (apple.x == head.x && apple.y == head.y) {
                settings.apples = settings.apples.filter(el => el != apple);
                game.addBodyPart(apple.numPartsToAdd)
            }
        })

        settings.zoomIn.forEach(item => {
            if (item.x == head.x && item.y == head.y) {
                settings.zoomIn = settings.zoomIn.filter(el => el != item);
                settings.rows = settings.rows / 2;
                settings.columns = settings.columns / 2;
            }
        })

        settings.zoomOut.forEach(item => {
            if (item.x == head.x && item.y == head.y) {
                settings.zoomOut = settings.zoomOut.filter(el => el != item);
                settings.rows = settings.rows * 2;
                settings.columns = settings.columns * 2;
            }
        })

        if (settings.rows < settings.minRows) {
            settings.rows = settings.minRows
        }

        if (settings.rows > settings.maxRows) {
            settings.rows = settings.maxRows
        }

        if (settings.columns < settings.minColumns) {
            settings.columns = settings.minColumns
        }

        if (settings.columns > settings.maxColumns) {
            settings.columns = settings.maxColumns
        }
    },

    pass() {
        for (let i = settings.snake.length - 1; i > 0; i--) {
            settings.snake[i] = { ...settings.snake[i - 1] }
        }
    },

    handlekeydown(e) {
        if (e.keyCode == 37 && settings.direction != 'right') {
            settings.direction = 'left';
        }
        if (e.keyCode == 38 && settings.direction != 'down') {
            settings.direction = 'up';
        }
        if (e.keyCode == 39 && settings.direction != 'left') {
            settings.direction = 'right';
        }
        if (e.keyCode == 40 && settings.direction != 'up') {
            settings.direction = 'down';
        }
        if (e.keyCode == 40 && settings.direction != 'up') {
            settings.direction = 'down';
        }
        if (e.keyCode == 27) {
            game.handlePause();
        }
    },

    handlePause() {
        if (settings.timerID) {
            clearInterval(settings.timerID);
            settings.timerID = false;
            elements.pause = document.createElement('pause-element');
            elements.main.prepend(elements.pause)
        } else {
            settings.timerID = setInterval(game.update, settings.intervalDelay);
            elements.pause.remove()
        }
    },

    moveSnake() {
        switch (settings.direction) {
            case 'left':
                settings.snake[0].x -= 1;
                break;
            case 'up':
                settings.snake[0].y -= 1;
                break;
            case 'right':
                settings.snake[0].x += 1;
                break;
            case 'down':
                settings.snake[0].y += 1;
                break;
            default:
                break;
        }
    },

    checkCollision() {
        if (settings.snake[0].x < 0 ||
            settings.snake[0].x + 1 > settings.rows ||
            settings.snake[0].y < 0 ||
            settings.snake[0].y + 1 > settings.columns) {
            clearInterval(settings.timerID);
            elements.gameOver = document.createElement('gameover-element')
            elements.main.prepend(elements.gameOver)

            let loaded = localStorage.getItem('highscore');
            if (settings.snake.length > loaded) {
                localStorage.setItem('highscore', `${settings.snake.length}`)
            }
        }


        for (let i = 1; i < settings.snake.length; i++) {
            if (settings.snake[0].x == settings.snake[i].x && settings.snake[0].y == settings.snake[i].y) {
                clearInterval(settings.timerID);

                elements.gameOver = document.createElement('gameover-element')
                elements.main.prepend(elements.gameOver)

                localStorage.setItem('highscore', `${settings.snake.length}`)
            }
        }
    },

    renderPlayfield() {
        const c = elements.playfield;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'rgba(70,70,70, 0.85)'
        ctx.fillRect(0, 0, c.width, c.height);
    },

    renderApples() {
        if (Date.now() - settings.lastAppleDrop >= settings.appleDrop) {
            settings.apples.push(new Apple());
            settings.lastAppleDrop = Date.now();
        }

        const c = elements.playfield;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'rgb(77,77,77)';
        ctx.lineWidth = 1

        settings.apples.forEach(apple => {
            ctx.beginPath();
            ctx.arc((c.width / settings.columns) * apple.x + ((c.width / settings.columns) / 2),
                (c.height / settings.rows) * apple.y + ((c.height / settings.rows) / 2),
                (c.width / settings.columns) * 0.5,
                0, 2 * Math.PI
            )
            ctx.stroke()
            ctx.fill()
        })
    },

    renderZoomItem() {
        if (Date.now() - settings.lastZoomDrop >= settings.zoomDrop) {
            settings.zoomIn.push(new ZoomIn());
            settings.zoomOut.push(new ZoomOut());
            settings.lastZoomDrop = Date.now();
        }

        const c = elements.playfield;
        const ctx = c.getContext('2d');
        ctx.lineWidth = 1

        // render zoomIn
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'rgb(77,77,77)';
        settings.zoomIn.forEach(item => {
            for (let i = 0; i < settings.apples.length; i++) {
                if (item.x == settings.apples[i].x && item.y == settings.apples[i].y) {
                    settings.zoomIn = settings.zoomIn.filter(el => el != item)
                }
            }

            // check if zoom in is outof Bound
            for (let i = 0; i < settings.zoomIn.length; i++) {
                if (settings.columns > settings.minColumns) {

                    if (item.x >= (settings.columns / 2) || item.y >= (settings.rows / 2)) {
                        ctx.lineWidth = settings.columns/10;
                        ctx.strokeStyle = 'rgb(245, 66, 84)';
                    }
                    else {
                        ctx.strokeStyle = 'rgb(77,77,77)';
                        ctx.lineWidth = 1
                    }
                }
            }
            ctx.beginPath();
            ctx.moveTo(c.width / settings.columns * item.x, c.height / settings.rows * item.y);
            ctx.lineTo((c.width / settings.columns * item.x) + (c.width / settings.columns), c.height / settings.rows * item.y);
            ctx.lineTo((c.width / settings.columns * item.x) + ((c.width / settings.columns) / 2), (c.height / settings.rows * item.y) + (c.height / settings.rows));
            ctx.closePath();
            ctx.stroke()
            ctx.fill()
        })

        // render zoomOut
        ctx.fillStyle = 'rgb(189, 19, 160)';
        ctx.strokeStyle = 'rgb(77,77,77)';
        ctx.lineWidth = 1
        settings.zoomOut.forEach(item => {
            for (let i = 0; i < settings.apples.length; i++) {
                if (item.x == settings.apples[i].x && item.y == settings.apples[i].y) {
                    settings.zoomOut = settings.zoomOut.filter(el => el != item)
                }
            }

            for (let i = 0; i < settings.zoomIn.length; i++) {
                if (item.x == settings.zoomIn[i].x && item.y == settings.zoomIn[i].y) {
                    settings.zoomOut = settings.zoomOut.filter(el => el != item)
                }
            }

            ctx.beginPath();
            ctx.moveTo(c.width / settings.columns * item.x, (c.height / settings.rows * item.y) + c.height / settings.rows);
            ctx.lineTo((c.width / settings.columns * item.x) + ((c.width / settings.columns) / 2), c.height / settings.rows * item.y);
            ctx.lineTo((c.width / settings.columns * item.x) + ((c.width / settings.columns)), (c.height / settings.rows * item.y) + (c.height / settings.rows));
            ctx.closePath();
            ctx.stroke()
            ctx.fill()
        })
    },

    renderSnake() {
        const c = elements.playfield;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'rgb(77,77,77)';
        ctx.lineWidth = 1
        settings.snake.forEach(Bodypart => {
            ctx.fillRect(
                Bodypart.x * (c.width / settings.columns),
                Bodypart.y * (c.height / settings.rows),
                c.width / settings.columns,
                c.height / settings.rows,
            )
            ctx.strokeRect(
                Bodypart.x * (c.width / settings.columns),
                Bodypart.y * (c.height / settings.rows),
                c.width / settings.columns,
                c.height / settings.rows,
            )
        })
    },
}

export default game