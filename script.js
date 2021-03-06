const colorsUl = document.querySelector('.colors-ul');
const pixelBoard = document.getElementById('pixel-board');
const clearButton = document.getElementById('clear-board');
const generateBoardButton = document.getElementById('generate-board');
const fillButton = document.getElementById('fill-board')
const rgbColor = document.getElementById('rgb-color')
let backgroundColorSelected = 'rgb(0,0,0)';


rgbColor.addEventListener('input', () => {
  backgroundColorSelected = rgbColor.value
})
function addClassAndBackgroundToColors(colors) {
  colors.unshift('rgb(0,0,0)');
  colors.unshift('rgb(255,255,255)')
  for (let i = 0; i < colors.length; i += 1) {
    const li = document.createElement('li');
    if (i === 0) {
      li.classList.add('selected');
    }
    li.classList.add('color');
    li.style.backgroundColor = colors[i];
    colorsUl.appendChild(li);
  }
}

function boardClear(pixels) {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].remove();
  }
}
function creatPixelsBoard(width, heigth) {
  const boardElements = document.querySelectorAll('.pixel');
  pixelBoard.style.maxWidth = `${width * 40 + 2}px`;

  if (boardElements.length !== 0) {
    boardClear(boardElements);
  }
  for (let line = 1; line <= heigth; line += 1) {
    const lineOfPixels = document.createElement('div');
    lineOfPixels.classList.add('pixel-line');
    lineOfPixels.style.maxWidth = `${width * 40}px`;
    pixelBoard.appendChild(lineOfPixels);
    for (let column = 1; column <= width; column += 1) {
      const block = document.createElement('div');
      block.classList.add('pixel');
      block.style.backgroundColor = 'rgb(255,255,255)';
      lineOfPixels.appendChild(block);
    }
  }
}

colorsUl.addEventListener('click', (e) => {
  const element = e.target;
  backgroundColorSelected = element.style.backgroundColor;

  const previousSelected = document.querySelector('.selected');
  previousSelected.classList.remove('selected');

  element.classList.add('selected');
});


pixelBoard.addEventListener('click', (e) => {
  const element = e.target;
  element.style.backgroundColor = backgroundColorSelected;
});

clearButton.addEventListener('click', () => {
  const pixelsList = document.getElementsByClassName('pixel');
  for (const pixel of pixelsList) {
    pixel.style.backgroundColor = 'rgb(255,255,255)';
  }
});

fillButton.addEventListener('click', () => {
  const pixelsList = document.getElementsByClassName('pixel');
  for (const pixel of pixelsList) {
    pixel.style.backgroundColor = backgroundColorSelected;
  }
});

generateBoardButton.addEventListener('click', () => {
  const inputTextHeigth = document.getElementById('board-heigth').value;
  const inputTextWidth = document.getElementById('board-width').value;
  const inputNumberHeigth = parseInt(inputTextHeigth);
  const inputNumberWidth = parseInt(inputTextWidth)

  if (inputTextHeigth === '' || inputTextWidth === '') {
    window.alert('Board inv??lido!');
  } else if (inputNumberHeigth < 5 || inputNumberWidth < 5) {
    window.alert('Valor baixo demais, considerando como 5.');
    creatPixelsBoard(5, 5);
  } else if (inputNumberHeigth > 50 || inputNumberWidth > 50) {
    window.alert('Valor alto demais, considerando como 50.');
    creatPixelsBoard(50, 50);
  } else {
    creatPixelsBoard(inputNumberHeigth, inputNumberWidth);
  }
});

function generateRGB() {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
function generatePaletColors(howMany) {
  const colors = [];
  for (let i = 0; i < howMany; i += 1) {
    colors.push(generateRGB());
  }
  return colors;
}

const palleteColors = generatePaletColors(10);
addClassAndBackgroundToColors(palleteColors);
creatPixelsBoard(5, 5);
