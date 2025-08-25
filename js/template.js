function showWinScreen(){
    return `
                    <button class="endscreen-button" onclick="returnToStartScreen()">
                    Back to Home Screen
                </button>
                <button class="endscreen-button" onclick="restartGame()">
                    Play again
                </button>
        `
}

function showLoseScreen(){
    return `
                    <button class="endscreen-button" onclick="returnToStartScreen()">
                    Back to Home Screen
                </button>
                <button class="endscreen-button" onclick="restartGame()">
                    Try again
                </button>
        `
}