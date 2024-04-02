'use strict';

import settings from "../game/gameSettings.js";


let container = document.createElement('div')
let addSlot = document.createElement('slot')
container.append(addSlot)

class Score extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const updateScore = () => {
            this.shadowRoot.innerHTML = `
        <style>
            .container {
                display: flex;
                justify-content: center;
            }

            .centered {
                width: ${settings.width}px;
                display: flex
            }

            .right {
                text-align: right
            }

            p {
                font-family: "Ubuntu", sans-serif;
                font-weight: 400;
                font-style: normal;
                margin: 10px auto;
                width: ${settings.width * 0.98}px;
                font-size: 1.5rem;
                line-height: 1.3;
                color: white;
                text-align: justify;
                display: ruby
            }
        </style>

        <div class="container">
            <div class="centered">
                <p>
                    Highscore ${localStorage.getItem('highscore') * 10}

                </p>
                <p class="right">Points ${settings.snake.length * 10} </p>
            </div>
        </div>
        `
        };

        updateScore()

        settings.snake = new Proxy(settings.snake, {
            set: function (target, property, value, receiver) {
                updateScore();
                return Reflect.set(target, property, value, receiver);
            }
        });
    }
}

customElements.define("score-element", Score);