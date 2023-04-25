{HTMLCanvasElement}
const canva = document.querySelector('#game');
const game = canva.getContext('2d');

let canvaSize;
let elementSize;


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() { 
    window.innerHeight > window.innerWidth
        ? canvaSize = window.innerWidth * 0.8
        : canvaSize = window.innerHeight * 0.6

    canva.setAttribute('width', canvaSize)
    canva.setAttribute('height', canvaSize)

    elementSize = (canvaSize / 10) - 1

    starGame()
}

function starGame() {
    game.font = elementSize + 'px Verdana'
    game.textAlign = ""
    
    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize)

    }
}