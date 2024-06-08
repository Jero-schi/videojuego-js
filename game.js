

const container = document.querySelector('.game-container');
const canva = document.querySelector('#game');
const game = canva.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')
const divReinicio = document.querySelector('#reinicio')
const btnSi = document.querySelector('#btnSi')
const btnNo = document.querySelector('#btnNo')

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
        ? canvaSize = window.innerWidth * 0.7
        : canvaSize = window.innerHeight * 0.7

    canvaSize = Number(canvaSize.toFixed(0))

    canva.setAttribute('width', canvaSize);
    canva.setAttribute('height', canvaSize);

    elementSize = (canvaSize / 10) -1 ;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    const map = maps[level];
    
    if (!map) {
        clearInterval(timeInterval)
        newRecord()
        seguirJugando()
        return
    }
    
    if (!timeStar) {
        // timeStar = Date.now()
        // timeInterval = setInterval(showTime, 200)
        showRecord()
    }

    showLives()

    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0,canvaSize, canvaSize)
    enemiesPosition = [];

    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            // console.log({col, row});
            const emoji = emojisMap[level][col];
            const posX = elementSize * (colI+ 1.3);
            const posY = elementSize * (rowI + 1);


            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
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
    const distanciaTrampa = elementSize * 2

    // if (level == 2) {
    //     console.log(playerPosition);
    //     console.log(giftPosition);
    //     console.log(elementSize);
    //     console.log(giftPosition.x - distanciaTrampa);
    //     if (playerPosition.y == giftPosition.y) {
    //         console.log('Ys iguales');
    //     }
    // }

    if (level==2 && 
    playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2) && 
    playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2) - distanciaTrampa) {
            console.log('kbum🏴‍☠️🏴‍☠️');
            level++;
            lives++
            
            startGame()
    }

    if (giftCollision) {
        level++;
        if (level !== 4) {
            lives++
        }
        startGame()
    }
    
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY
    })
    
    if (enemyCollision) {
        console.log('colision');
        lives--;

        if (lives <= 0) {
            seguirJugando()
        }
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        startGame()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function newRecord() {
    timePlayer = Date.now() - timeStar
    const record = localStorage.getItem('record')

    if (record) {
        if (timePlayer < record) {
            localStorage.setItem('record', timePlayer)
            pResult.innerHTML = 'Superaste tu record🥳';
        } else {
            pResult.innerHTML = 'No superaste tu record🫤';
        }
    } else {
        localStorage.setItem('record', timePlayer)
        pResult.innerHTML = 'Haz un nuevo record';
    }
}

function seguirJugando() {
    clearInterval(timeInterval)
    divReinicio.classList.remove('inactive')
    container.classList.add('opacity')

    btnSi.addEventListener('click', () => {
        divReinicio.classList.add('inactive')
        container.classList.remove('opacity')
        level = 0;
        lives = 3;
        timeStar = undefined
        pResult.innerHTML = 'Intenta superar tu record';
        startGame()
    })

    btnNo.addEventListener('click', () => {
        divReinicio.classList.add('inactive')
        container.classList.remove('opacity')
    })
}

function showLives() {
    spanLives.innerHTML = '🧡'.repeat(lives)
}

function showTime() {  
    spanTime.innerHTML = Date.now() - timeStar
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record')
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