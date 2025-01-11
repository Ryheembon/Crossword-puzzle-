const words = [
    "power", "time", "life", "script", "coward", "craft", "apple", "chair", "brave", "quiet", 
    "night", "plane", "sword", "dance", "flash", "dream", "cat", "dog", "sun", "bat", 
    "jam", "pie", "car", "map", "bag", "run"
];
const gridSize = 15;

let isSelecting = false;
let selectedCells = [];
let gridLetters = []; // Store the grid for validation

function createEmptyGrid() {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push('-'); // Empty cell
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

function displayGrid(grid) {
    const container = document.getElementById('crossword-container');
    container.innerHTML = ''; // Clear the container
    gridLetters = grid; // Save the grid for reference

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('grid-cell');
            cellElement.textContent = cell === '-' ? '' : cell;

            // Add data attributes
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;

            // Add event listeners for highlighting
            cellElement.addEventListener('mousedown', () => handleCellSelectionStart(cellElement));
            cellElement.addEventListener('mouseover', () => handleCellSelection(cellElement));
            container.appendChild(cellElement);
        });
    });

    document.addEventListener('mouseup', handleCellSelectionEnd);
}

function handleCellSelectionStart(cell) {
    isSelecting = true;
    selectedCells = [cell];
    cell.classList.add('selected');
}

function handleCellSelection(cell) {
    if (isSelecting && !selectedCells.includes(cell)) {
        selectedCells.push(cell);
        cell.classList.add('selected');
    }
}

function handleCellSelectionEnd() {
    if (!isSelecting) return;
    isSelecting = false;

    // Get the word formed by the selected cells
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');

    if (words.includes(selectedWord)) {
        alert(`You found the word: ${selectedWord}!`);
        selectedCells.forEach(cell => cell.classList.add('found'));
        markWordAsFound(selectedWord);
    } else {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
    }

    selectedCells = [];
}

function markWordAsFound(word) {
    const wordElements = document.querySelectorAll('#words-to-find li');
    wordElements.forEach(li => {
        if (li.textContent === word) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'lightgray';
        }
    });
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

    // Fill remaining empty cells
    fillRandomLetters(grid);

    // Display the grid and word list
    displayGrid(grid);
    displayWordList();
}

function displayWordList() {
    const wordListContainer = document.getElementById('words-to-find');
    wordListContainer.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        wordListContainer.appendChild(li);
    });
}
