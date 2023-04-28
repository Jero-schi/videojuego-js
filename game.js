const canva = document.querySelector('#game');
const game = canva.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')

let canvaSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStar;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemiesPosition = [];

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

function startGame() {
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    const map = maps[level];

    if (!map) {
        clearInterval(timeInterval)
        return
    }

    if (!timeStar) {
        timeStar = Date.now()
        timeInterval = setInterval(showTime, 200)
    }

    showLives()

    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0,canvaSize, canvaSize)
    enemiesPosition = [];

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
            } else if (col == 'X') {
                enemiesPosition.push({
                    x: posX,
                    y: posY
                })
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

    if (giftCollision) {
        level++;
        startGame()
    }

    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
        console.log('chocaste');
        lives--;
        console.log(lives);

        if (lives <= 0) {
            level = 0;
            lives = 3;
            timeStar = undefined
        }
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        startGame()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function showLives() {
    spanLives.innerHTML = '🧡'.repeat(lives)
}

function showTime() {
    spanTime.innerHTML = + ((Date.now() - timeStar) / 1000)
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