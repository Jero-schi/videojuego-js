{HTMLCanvasElement}
const canva = document.querySelector('#game');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const game = canva.getContext('2d');

let canvaSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined
};


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
    
    game.clearRect(0,0,canvaSize, canvaSize)
    mapCols.forEach((row, rowI) =>
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log({playerPosition});
                }
            }

            game.fillText(emoji, posX, posY)
        }))
    movePLayer()
}

function movePLayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

window.addEventListener('keydown', moves)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown) 

function moves(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break;
        
        case 'ArrowLeft':
            moveLeft()
            break;

        case 'ArrowRight':
            moveRight()
            break;

        case 'ArrowDown':
            moveDown()
            break;

        default:
            break;
    }
}
function moveUp() {
    (playerPosition.y - elementSize) < 0
        ? console.log('out')
        : playerPosition.y -= elementSize
        starGame()
    }
function moveLeft() {
    (playerPosition.x - elementSize) < elementSize
        ? console.log('out')
        : playerPosition.x -= elementSize
        starGame()
}
function moveRight() {
    (playerPosition.x + elementSize) > canvaSize
        ? console.log('out')
        : playerPosition.x += elementSize
        starGame()
}
function moveDown() {
    (playerPosition.y + elementSize) > canvaSize
        ? console.log('out')
        : playerPosition.y += elementSize
        starGame()
}