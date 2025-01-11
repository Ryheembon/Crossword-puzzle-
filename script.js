const words = [
    "power", "time", "life", "script", "coward", "craft", "apple", "chair", "brave", "quiet", 
    "night", "plane", "sword", "dance", "flash", "dream", "cat", "dog", "sun", "bat", 
    "jam", "pie", "car", "map", "bag", "run"
];
const gridSize = 15;

function createEmptyGrid() {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push('-');  // Empty cell
        }
        grid.push(row);
    }
    return grid;
}

function canPlaceWord(grid, word, row, col, direction) {
    const length = word.length;
    if (direction === 'across') {
        if (col + length > gridSize) return false;
        for (let i = 0; i < length; i++) {
            if (grid[row][col + i] !== '-' && grid[row][col + i] !== word[i]) {
                return false;
            }
        }
    } else if (direction === 'down') {
        if (row + length > gridSize) return false;
        for (let i = 0; i < length; i++) {
            if (grid[row + i][col] !== '-' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
}

function placeWord(grid, word, row, col, direction) {
    const length = word.length;
    for (let i = 0; i < length; i++) {
        if (direction === 'across') {
            grid[row][col + i] = word[i];
        } else if (direction === 'down') {
            grid[row + i][col] = word[i];
        }
    }
}

function fillRandomLetters(grid) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '-') {
                grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

function generateGrid() {
    let grid = createEmptyGrid();

    // Place words
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.5 ? 'across' : 'down';
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (canPlaceWord(grid, word, row, col, direction)) {
                placeWord(grid, word, row, col, direction);
                placed = true;
            }
        }
    });

    // Fill remaining empty cells with random letters
    fillRandomLetters(grid);

    // Display the grid
    displayGrid(grid);
}

function displayGrid(grid) {
    const container = document.getElementById('crossword-container');
    container.innerHTML = '';  // Clear the container

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('grid-cell');
            cellElement.textContent = cell === '-' ? '' : cell;
            if (cell !== '-') {
                cellElement.classList.add('filled');
            }
            container.appendChild(cellElement);
        });
    });
}
