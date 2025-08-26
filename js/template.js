/**
 * @description Displays the win screen.
 * @returns {*} The HTML content for the win screen.
 */
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


/**
 * @description Displays the lose screen.
 * @returns {*} The HTML content for the lose screen.
 */
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