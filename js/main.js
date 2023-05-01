import { keys, specialKeys } from "./keys.js";

const body = document.querySelector("body");
let capsState = false;
let shiftState = false;
const initDOM = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  const title = document.createElement("h1");
  title.innerText = "RSS Virtual Keyboard by Eugene";
  title.classList.add("title");
  container.appendChild(title);
  const textArea = document.createElement("textarea");
  textArea.classList.add("textarea");
  textArea.setAttribute("id", "textarea");
  textArea.setAttribute("rows", "5");
  textArea.setAttribute("cols", "40");
  container.appendChild(textArea);
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.setAttribute("id", "keyboard");
  const keyboardKeys = document.createDocumentFragment();
  for (let i = 0; i < keys.length; i += 1) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < keys[i].length; j += 1) {
      const key = document.createElement("div");
      key.classList.add("key", keys[i][j].event);
      key.setAttribute("data-code", keys[i][j].event);
      key.setAttribute("data-key", keys[i][j].key); 
      keys[i][j].shift && key.setAttribute("data-shift", keys[i][j].shift); 
      key.innerText = keys[i][j].key;
      row.appendChild(key);
    }
    keyboardKeys.appendChild(row);
  }
  keyboard.appendChild(keyboardKeys);
  container.appendChild(keyboard);
  body.appendChild(container);
}

initDOM();

function updateKeysOnCaps(virtualKey) {
  capsState = !capsState;
  const keyboardKeys = document.querySelectorAll('.key');
  keyboardKeys.forEach(key => {
    const keyCode = key.dataset.code;
    if (!specialKeys.includes(keyCode)) {
      if (capsState) {
        key.dataset.key = key.dataset.key.toUpperCase();
        key.textContent = key.dataset.key;
      } else {
        key.dataset.key = key.dataset.key.toLowerCase();
        key.textContent = key.dataset.key;
        virtualKey.classList.remove('active');
      }
    }
  });
}


function handleKeys(virtualKey) {
  const textarea = document.getElementById('textarea');
  const keyCode = virtualKey.dataset.code;
  if (!specialKeys.includes(keyCode)) {
    textarea.value += virtualKey.textContent;
  } else {
    switch (keyCode) {
      case "Backspace":
        textarea.value = textarea.value.slice(0, -1);
        break;
      case "Delete":
        textarea.value = "";
        break;
      case "Tab":
        textarea.value += "\t";
        break;
      case "Enter":
        textarea.value += "\n";
        break;
      case "CapsLock":
        updateKeysOnCaps(virtualKey);
        break;
      default:
        break;
    }
  }
}

document.addEventListener('keydown', event => {
  event.preventDefault();
  const code = event.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.add('active');
  handleKeys(virtualKey);
});

document.addEventListener('keyup', event => {
  const code = event.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  if (virtualKey.dataset.code !== "CapsLock") {
    setTimeout(() => {
      virtualKey.classList.remove('active');
    }, 300);
  }
});

document.addEventListener('mousedown', event => {
  event.preventDefault();
  const code = event.target.dataset.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.add('active');
  handleKeys(virtualKey);
});

document.addEventListener('mouseup', event => {
  const code = event.target.dataset.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  if (virtualKey.dataset.code !== "CapsLock") {
    setTimeout(() => {
      virtualKey.classList.remove('active');
    }, 300);
  }
});

function updateKeysOnShift() {
  const keyboardKeys = document.querySelectorAll('.key');
  keyboardKeys.forEach(key => {
    const keyCode = key.dataset.code;
    if (!specialKeys.includes(keyCode)) {
      if (shiftState) {
        key.dataset.key = capsState ? key.dataset.key.toLowerCase() : key.dataset.key.toUpperCase();
        key.textContent = key.dataset.shift || key.dataset.key;
      } else {
        key.dataset.key = capsState ? key.dataset.key.toUpperCase() : key.dataset.key.toLowerCase();
        key.textContent = key.dataset.key;
      }
    }
  });
}

function handleShift() {
  const shiftKeys = document.querySelectorAll('.key[data-key="Shift"]');

  shiftKeys.forEach(shiftKey => {
    shiftKey.addEventListener('mousedown', () => {
      shiftState = true;
      updateKeysOnShift();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Shift') {
        shiftState = true;
        updateKeysOnShift();
      }
    });
    
    shiftKey.addEventListener('mouseup', () => {
      shiftState = false;
      updateKeysOnShift();
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Shift') {
        shiftState = false;
        updateKeysOnShift();
      }
    });
  })
}

handleShift();

function switchLanguage() {
  const shortcut = ['Control', 'Alt'];
  let shortcutCurrent = [];
  let language = localStorage.getItem('language');

  document.addEventListener('keydown', (event) => {
    if (shortcut.includes(event.key)) {
      shortcutCurrent.push(event.key);
      if (shortcutCurrent.length === shortcut.length) {
        if (language === 'en') {
          language = 'ru';
        } else {
          language = 'en';
        }
        localStorage.setItem('language', language);
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    if (shortcut.includes(event.key)) {
      shortcutCurrent = shortcutCurrent.filter(key => key !== event.key);
    }
  });
}

switchLanguage();