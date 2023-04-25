{HTMLCanvasElement}
const canva = document.querySelector('#game');
const game = canva.getContext('2d');

window.addEventListener('load', starGame)

function starGame() {
    let canvaSize;

    if (window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.8
    } else {
        canvaSize = window.innerHeight * 0.6
    }

    canva.setAttribute('width', canvaSize)
    canva.setAttribute('height', canvaSize)

    const elementSize = (canvaSize / 10) - 1

    console.log({canvaSize, elementSize});

    game.font = elementSize + 'px Verdana'
    game.textAlign = ""
    
    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize)

    }

//     game.fillRect(0,0,100,100);
//     game.clearRect(50,0,50,50);
}