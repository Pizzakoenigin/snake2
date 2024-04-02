'use strict';

import settings from "../game/gameSettings.js";
import init from "../game/gameInit.js"
import game from "../game/game.js";

let container = document.createElement('div')
let addSlot = document.createElement('slot')
container.append(addSlot)

class Pause extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})

        this.shadowRoot.append(container.cloneNode(true))

        this.shadowRoot.innerHTML = `
        <style>
            .container {
                display: flex;
                justify-content: center;
            }

            .centered {
                width: ${settings.width}px;
                height: ${settings.height}px;
                text-align: center;
                position: absolute;
                background-color: rgba(0, 0, 0, 0.9);
            }

            p {
                padding-top: ${settings.height * 0.2}px;
                font-size: 2rem;
                line-height: 1.3;
                color: white;
            }

            button {
                font-size: 2rem;
                line-height: 1.3;
                color: white;
                display: block;
                background-color: rgb(90, 90, 90);
                border: 3px solid rgb(30, 30, 30);
                margin: 5px auto;
                padding: 0.7rem 1rem;
                text-align: inherit;
                font: inherit;
                appearance: none;
            }

            button:hover, button:focus {
                cursor: pointer;
                background-color: rgba(136, 255, 127, 0.671);
            }
        </style>
        	
        <div class="container">
            <div class="centered">
                <p>Press Esc to continue or press the button to restart</p>

                <button id="cntBtn">Continue Snake!</button>
                <button id="rstBtn">↻ Restart Snake</button>
            </div>
        </div>
        `
    }

    connectedCallback(){
        const cButton = this.shadowRoot.getElementById('cntBtn');
        cButton.addEventListener(
            'click', () => {
                if (settings.timerID) {
                    clearInterval(settings.timerID);
                    settings.timerID = false;
                } else {
                    settings.timerID = setInterval(game.update, settings.intervalDelay);
                    this.remove()
                }
            }
        )
        const button = this.shadowRoot.getElementById('rstBtn');
        button.addEventListener(
            'click', () => {
                settings.restart = true
                init()
            }
        )
    }
}

customElements.define("pause-element", Pause)