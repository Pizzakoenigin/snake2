'use strict';

import gameInit from "../game/gameInit.js"
import settings from "../game/gameSettings.js";

let container = document.createElement('div')
let addSlot = document.createElement('slot')
container.append(addSlot)

class Start extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(container.cloneNode(true));

        this.shadowRoot.innerHTML = `
        <style>
            .container {
                display: flex;
                justify-content: center;
            }
            
            .centered {
                width: ${settings.width}px
            }
            
            p {
                font-size: 2rem;
                line-height: 1.2;
                color: white;
                margin: 1.2rem
            }

            button {
                font-size: 2rem;
                line-height: 1.3;
                color: white;
                display: block;
                margin: 5px auto;
                background-color: rgb(90, 90, 90);
                border: 3px solid rgb(30, 30, 30);
                padding: 0.7rem 1rem;
                text-align: inherit;
                appearance: none;
            }

            button:hover, button:focus {
                cursor: pointer;
                background-color: rgba(136, 255, 127, 0.671);
            }

            .right {
                display: block;
                text-align: right;
            }

            .red {
                color: red;
            }

            .violet {
                color: rgb(189, 19, 160);
            }

            .orange {
                color: orange;
            }
        </style>

        <div class="container">
            <div class="centered">
                <p>This is Snake 2.0!</p>
                <p>Controlls: Arrow Keys</p>
                <p><span class="red">⬤</span> grow.</p>
                <p><span class="violet">▲</span> Enhance the playfield</p>
                <p><span class="orange">▼</span> shrink the playfield.</p>
                <p>If you shrink the playfield while the <span class="orange">▼</span> has a <span class="red">▽</span>,
                    you lose.</p>
                <p>Press Esc to pause. <span class="right">Have fun!</span></p>
                <button id="btn">Sssssstart Ssssnake! 🐍</button>
            </div>
        </div>
        `
    }

    connectedCallback() {
        const button = this.shadowRoot.getElementById('btn');
        button.addEventListener(
            'click', () => {
                this.remove();
                gameInit()
            }
        )
    }
}

customElements.define("start-element", Start)