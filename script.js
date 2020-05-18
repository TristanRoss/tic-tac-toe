const gameBoard = (() => {
    let theBoard = ['', '', '', '', '', '', '', '', ''];
    const insertX = (x) => gameBoard.theBoard[x] = "X";
    const insertO = (o) => gameBoard.theBoard[o] = "O";

    const checkWinOrGameOver = () => {
        theBoard = gameBoard.theBoard;
        // Top Row
        if (theBoard[0] == theBoard[1] && theBoard[1] == theBoard[2] && theBoard[0] != '') {
            return theBoard[0];
        }

        // Middle Row
        if (theBoard[3] == theBoard[4] && theBoard[4] == theBoard[5] && theBoard[3] != '') {
            return theBoard[3];
        }

        // Bottom Row
        if (theBoard[6] == theBoard[7] && theBoard[7] == theBoard[8] && theBoard[6] != '') {
            return theBoard[6];
        }

        // Left Column
        if (theBoard[0] == theBoard[3] && theBoard[3] == theBoard[6] && theBoard[0] != '') {
            return theBoard[0];
        }

        // Middle Column
        if (theBoard[1] == theBoard[4] && theBoard[4] == theBoard[7] && theBoard[1] != '') {
            return theBoard[1];
        }

        // Right Column
        if (theBoard[2] == theBoard[5] && theBoard[5] == theBoard[8] && theBoard[2] != '') {
            return theBoard[2];
        }

        // Left Diagonal
        if (theBoard[0] == theBoard[4] && theBoard[4] == theBoard[8] && theBoard[0] != '') {
            return theBoard[0];
        }

        // Right Diagonal
        if (theBoard[2] == theBoard[4] && theBoard[4] == theBoard[6] && theBoard[2] != '') {
            return theBoard[2];
        }

        for (let i = 0; i < 9; i++) {
            if (theBoard[i] == '') {
                return '';
            }
        }

        return 'Tie';

    }

    const isOver = () => {
        let result = checkWinOrGameOver();
        if (result == 'X' || result == 'O' || result == 'Tie') {
            return true;
        }
        return false;
    }

    const restart = () => {
        gameBoard.theBoard = ['', '', '', '', '', '', '', '', ''];
    }

    return {
        theBoard,
        insertX,
        insertO,
        checkWinOrGameOver,
        isOver,
        restart,
    };
})();

const displayController = (() => {
    const displayBoard = (player) => {
        const parent = document.querySelector('#container');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        let str = '';
        for (let x = 0; x < 3; x++) {
            str += 'auto ';
        }
        
        parent.style.width = '50%';
        parent.style.margin = 'auto';
        parent.style.paddingTop = '30px';
        parent.style.display = 'grid';
        parent.style.gridTemplateColumns = str;
        parent.style.gridGap = '0';
        parent.style.width = '306px';
        parent.style.height = '306px';
        
        for (let i = 0; i < 9; i++) {
            const newDiv = document.createElement('div');
            newDiv.textContent = gameBoard.theBoard[i];
            newDiv.style.border = '1px solid black';
            newDiv.style.color = 'black';
            newDiv.style.textAlign = 'center';
            newDiv.style.width = 300 / 3 + 'px';
            newDiv.style.height = 300 /3 + 'px';
            newDiv.style.fontSize = '50px';
            newDiv.style.lineHeight = 300 / 3 + 'px';
            newDiv.style.backgroundColor = 'white';
            newDiv.dataset.index = i;
            if (gameBoard.theBoard[i] == 'X' || gameBoard.theBoard[i] == 'O' || gameBoard.isOver()) {
                
            } else {
                newDiv.addEventListener('click', () => {
                    player.takeMove(newDiv.dataset.index)
                    game.isOver(player.number);
                    
                    

                });
            }
            parent.appendChild(newDiv);
        }
    }

    const promptName = (number) => {
        let playerName = prompt(`Player ${number}, enter your name:`);
        return playerName;
    }

    const displayName = (name, number) => {
        const div = document.createElement('div');
        div.textContent = `Player ${number}: ${name}`;
        div.style.fontSize = '20px';
        const names = document.querySelector('#names');
        names.appendChild(div);
    }

    const removeNames = () => {
        const names = document.querySelector('#names');
        while (names.firstChild) {
            names.removeChild(names.firstChild);
        }
    }

    const removeWinnerText = () => {
        const winner = document.querySelector('#winner');
        winner.textContent = '';
    }

    return {
        displayBoard,
        promptName,
        displayName,
        removeNames,
        removeWinnerText,
    }

})();

const Player = (number, name) => {
    const sayName = () => {
        displayController.displayName(name, number);
    }

    const getName = () => name;

    const takeMove = (slot) => {
        if (number == 1) {
            gameBoard.insertX(slot);
        }
        if (number == 2) {
            gameBoard.insertO(slot);
        }
    }


    return {
        sayName,
        takeMove,
        getName,
        number,
    };
}

const game = (() => {
    

    const isOver = (num) => {
        let gameOver = gameBoard.checkWinOrGameOver();
        if (gameBoard.isOver()) {
            displayController.displayBoard(player1);
            const winner = document.querySelector('#winner');
            if (gameOver == 'X') {
                winner.textContent = `${player1.getName()} Wins!`;
            }
        
            if (gameOver == 'O') {
                winner.textContent = `${player2.getName()} Wins!`;
            }
        
            if (gameOver == 'Tie') {
                winner.textContent = 'Tie!';
            }
        } else {
        
            if (num == 1) {
                displayController.displayBoard(player2);
                
            } else {
                displayController.displayBoard(player1);
            }
        }
    }
    

    return {
        isOver,
    };
})();

let player1;
let player2;

const button = document.querySelector('#start-restart');
button.addEventListener('click', () => {
    displayController.removeNames();
    displayController.removeWinnerText();
    button.textContent = 'Restart';
    player1 = Player(1, displayController.promptName(1));
    player2 = Player(2, displayController.promptName(2));
    player1.sayName();
    player2.sayName();
    gameBoard.restart();
    displayController.displayBoard(player1);
});

