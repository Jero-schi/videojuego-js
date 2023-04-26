const canva = document.querySelector('#game');
const game = canva.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
let canvaSize;
let elementSize;
const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
function setCanvasSize() { 
    window.innerHeight > window.innerWidth
        ? canvaSize = window.innerWidth * 0.8
        : canvaSize = window.innerHeight * 0.8

    canva.setAttribute('width', canvaSize);
    canva.setAttribute('height', canvaSize);

    elementSize = canvaSize / 10;

    startGame();
}

function startGame(level=0) {
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    const map = maps[level];
    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0,canvaSize, canvaSize)
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            }

            game.fillText(emoji, posX, posY)
        });
    });
    movePLayer()
}

function movePLayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    console.log({ giftCollisionX, giftCollisionY, giftCollision, giftPosition, playerPosition});

    if (giftCollision) {
    console.log('Subiste de nivel!');
    // startGame(1)
    }

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
        startGame()
    }
function moveLeft() {
    (playerPosition.x - elementSize) < elementSize
        ? console.log('out')
        : playerPosition.x -= elementSize
        startGame()
}
function moveRight() {
    (playerPosition.x + elementSize) > canvaSize
        ? console.log('out')
        : playerPosition.x += elementSize
        startGame()
}
function moveDown() {
    (playerPosition.y + elementSize) > canvaSize
        ? console.log('out')
        : playerPosition.y += elementSize
        startGame()
}