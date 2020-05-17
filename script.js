const gameBoard = (() => {
    let theBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const insertX = (x) => theBoard[x - 1] = "X";
    const insertO = (o) => theBoard[o - 1] = "O";
    return {
        theBoard,
        insertX,
        insertO,
    };
})();

const displayController = (() => {
    const displayBoard = () => {
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
            const newSpan = document.createElement('span');
            newDiv.textContent = gameBoard.theBoard[i];
            newDiv.style.border = '1px solid black';
            newDiv.style.color = 'black';
            newDiv.style.textAlign = 'center';
            newDiv.style.width = 500 / 3 + 'px';
            newDiv.style.height = 500 /3 + 'px';
            newDiv.style.fontSize = '50px';
            newDiv.style.lineHeight = 500 / 3 + 'px';
            newDiv.style.backgroundColor = 'white';
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
    const sayName = () => {
        displayController.displayName(displayController.promptName(number), number);
    }

    const takeMove = (choice, slot) => {
        if (choice == "X") {
            gameBoard.insertX(slot);
        }
        if (choice == "O") {
            gameBoard.insertO(slot);
        }
    }

    return {
        sayName,
        takeMove,
    };
}

const game = (() => {
    let player1 = Player(1);
    let player2 = Player(2);
    player1.sayName();
    player2.sayName();
    player1.takeMove("X", 3);
    player2.takeMove("O", 5);
    displayController.displayBoard();
    console.log(gameBoard.theBoard);

})();
