const gameBoard = (() => {
    let theBoard = ['', '', '', '', '', '', '', '', ''];
    const insertX = (x) => theBoard[x] = "X";
    const insertO = (o) => theBoard[o] = "O";

    const checkWinOrGameOver = () => {
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

    };

    return {
        theBoard,
        insertX,
        insertO,
        checkWinOrGameOver,
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
        
        parent.style.display = 'grid';
        parent.style.gridTemplateColumns = str;
        parent.style.gridGap = '0';
        parent.style.width = '506px';
        parent.style.height = '506px';
        
        for (let i = 0; i < 9; i++) {
            const newDiv = document.createElement('div');
            newDiv.textContent = gameBoard.theBoard[i];
            newDiv.style.border = '1px solid black';
            newDiv.style.color = 'black';
            newDiv.style.textAlign = 'center';
            newDiv.style.width = 500 / 3 + 'px';
            newDiv.style.height = 500 /3 + 'px';
            newDiv.style.fontSize = '50px';
            newDiv.style.lineHeight = 500 / 3 + 'px';
            newDiv.style.backgroundColor = 'white';
            newDiv.dataset.index = i;
            newDiv.addEventListener('click', () => {
                player.takeMove(newDiv.dataset.index)
                game.isOver(player.num);

            });  
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
        const names = document.querySelector('#names');
        names.appendChild(div);
    }

    return {
        displayBoard,
        promptName,
        displayName,
    }

})();

const Player = (number) => {
    let num = number;
    const sayName = () => {
        displayController.displayName(displayController.promptName(number), number);
    }

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
        num,
    };
}

const game = (() => {
    

    const isOver = (num) => {
        let gameOver = gameBoard.checkWinOrGameOver();
        if (gameOver == 'X') {
            console.log('Player 1 Wins!');
        }
    
        if (gameOver == 'O') {
            console.log('Player 2 Wins!');
        }
    
        if (gameOver == 'Tie') {
            console.log('Tie!');
        }

        if (num == 1) {
            
            displayController.displayBoard(player2);
            
        } else {
            displayController.displayBoard(player1);
        }
    }
    
    return {
        isOver,
    }
})();

let player1 = Player(1);
let player2 = Player(2);
player1.sayName();
player2.sayName();
displayController.displayBoard(player1);
