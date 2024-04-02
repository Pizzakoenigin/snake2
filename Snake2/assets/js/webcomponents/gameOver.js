'use strict';

import settings from "../game/gameSettings.js";
import gameInit from "../game/gameInit.js"

let container = document.createElement('div')
let addSlot = document.createElement('slot')
container.append(addSlot)

class GameOver extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })

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
                background-color: rgba(0, 0, 0);
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
                margin: 0 auto;
                background-color: rgb(90, 90, 90);
                border: 3px solid rgb(30, 30, 30);
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
                <p>You lost :(</p>
                <button id="rstBtn">↻ Resssstart Snake</button>
            </div>
        </div>
        `
    }

    connectedCallback() {
        const button = this.shadowRoot.getElementById('rstBtn');
        button.addEventListener(
            'click', () => {
                settings.restart = true
                gameInit()
            }
        )
    }
}

customElements.define("gameover-element", GameOver)