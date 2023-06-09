document.addEventListener('DOMContentLoaded', () => {

const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');

const width = 10;
let currentIndex = 0; // first div in our grid
let appleIndex = 0;
let currentSnake = [2, 1, 0]; // so that the div in the grid being 2 is the head, 1 is the body and 0 is the tail from now on
let direction = 0;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

// to start/restart the game
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}

// function that deals with all of the move outcomes of the snake
function moveOutcomes() {

// deals with snake hitting border and hitting itself
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // is snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
        return clearInterval(interval) // this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() // removes last ite of the array and shows it
    squares[tail].classList.remove('snake') // removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

// deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

// generate new apple when apple is eaten
function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) // making sure apples don't appear on the snake
    squares[appleIndex].classList.add('apple')
}

// assign functions to key codes
function control(e) {
    squares[currentIndex].classList.remove('snake'); //removing the class of snake with each move so that it doesn't look like it's being left behind

    if (e.keyCode === 39) {
        direction = 1 //if we press the right arrow on the keyboard, the snake moves right
    } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow the snake will go up one row (-10 divs) as this is what we set the width to
    } else if (e.keyCode === 37) {
        direction = -1 //if we press left, the snake will go back one div
    } else if (e.keyCode === 40) {
        direction = +width // if we press the down arrow, the snake's head will appear ten rows down from its current position
    }

}

document.addEventListener('keyup', control);
startBtn.addEventListener('click', startGame);

})