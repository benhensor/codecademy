const hat = '🎩';
const hole = '🕳️';
const fieldCharacter = '░';
const pathCharacter = '🚶‍♂️';

class Field {
  constructor(field) {
    this.field = field;
    this.playerPosition = { x: 0, y: 0 };
    this.field[0][0] = pathCharacter;
  }

  print() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = ''; // Clear previous grid

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.classList.add(this.getClass(cell));
        cellDiv.textContent = cell;
        gameDiv.appendChild(cellDiv);
      });
    });
  }

  getClass(cell) {
    switch (cell) {
      case pathCharacter: return 'path';
      case hole: return 'hole';
      case hat: return 'hat';
      case fieldCharacter: return 'field';
    }
  }

  movePlayer(direction) {
    let { x, y } = this.playerPosition;

    switch (direction) {
      case 'up': y -= 1; break;
      case 'down': y += 1; break;
      case 'left': x -= 1; break;
      case 'right': x += 1; break;
      case 'restart': window.location.reload(); return;
      default: console.log('Invalid move'); return;
    }

    if (this.isOutOfBounds(x, y)) {
      result('You moved outside the field! Game over.');
      return;
    }

    if (this.field[y][x] === hole) {
      result('You fell into a hole! Game over.');
      return;
    }

    if (this.field[y][x] === hat) {
      result('You found your hat! You win!');
      return;
    }

    this.field[this.playerPosition.y][this.playerPosition.x] = fieldCharacter;
    this.playerPosition = { x, y };
    this.field[y][x] = pathCharacter;
    this.print();
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x >= this.field[0].length || y >= this.field.length;
  }

  static generateField(height, width, percentage = 0.1) {
    const field = Array.from({ length: height }, () => Array.from({ length: width }, () => fieldCharacter));

    const hatPosition = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    while (hatPosition.x === 0 && hatPosition.y === 0) {
      hatPosition.x = Math.floor(Math.random() * width);
      hatPosition.y = Math.floor(Math.random() * height);
    }
    field[hatPosition.y][hatPosition.x] = hat;

    const totalHoles = Math.floor(height * width * percentage);
    for (let i = 0; i < totalHoles; i++) {
      let holePosition = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
      while (field[holePosition.y][holePosition.x] !== fieldCharacter) {
        holePosition = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
      }
      field[holePosition.y][holePosition.x] = hole;
    }

    return field;
  }
}

const generatedField = Field.generateField(10, 10, 0.2);
const myField = new Field(generatedField);
myField.print();

function result(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
}

document.addEventListener('keydown', (event) => {
  const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    r: 'restart'
  };
  if (keyMap[event.key]) {
    myField.movePlayer(keyMap[event.key]);
  }
});
