import random

def create_empty_grid(size):
    return [['-' for _ in range(size)] for _ in range(size)]

def can_place_word(grid, word, row, col, direction):
    length = len(word)
    if direction == 'across':
        if col + length > len(grid[0]):  # Check bounds
            return False
        for i in range(length):
            if grid[row][col + i] not in ('-', word[i]):  # Check conflicts
                return False
    elif direction == 'down':
        if row + length > len(grid):  # Check bounds
            return False
        for i in range(length):
            if grid[row + i][col] not in ('-', word[i]):  # Check conflicts
                return False
    return True

def place_word(grid, word, row, col, direction):
    for i, letter in enumerate(word):
        if direction == 'across':
            grid[row][col + i] = letter
        elif direction == 'down':
            grid[row + i][col] = letter

def fill_random_letters(grid):
    for row in range(len(grid)):
        for col in range(len(grid[row])):
            if grid[row][col] == '-':
                grid[row][col] = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')  # Fill with random letters

def print_grid(grid):
    for row in grid:
        print(' '.join(row))

# word usage
words = [
    "power", "time", "life", "script", "coward", "craft", "apple", "chair", "brave", "quiet", 
    "night", "plane", "sword", "dance", "flash", "dream", "cat", "dog", "sun", "bat", 
    "jam", "pie", "car", "map", "bag", "run"
]
size = 15
grid = create_empty_grid(size)

for word in words:
    placed = False
    while not placed:
        direction = random.choice(['across', 'down'])
        row = random.randint(0, size - 1)
        col = random.randint(0, size - 1)
        if can_place_word(grid, word, row, col, direction):
            place_word(grid, word, row, col, direction)
            placed = True

fill_random_letters(grid)
print_grid(grid)
