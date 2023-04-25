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

    elementSize = (canvaSize / 10)

    starGame()
}

function starGame() {
    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[0];
    const mapRows = map.trim().split('\n')
    const mapCols = mapRows.map(row => row.trim().split(''))
    
    mapCols.forEach((row, rowI) =>
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
            game.fillText(emoji, posX, posY)
        }))

    return {mapRows, mapCols}
}