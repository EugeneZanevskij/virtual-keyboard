const body = document.querySelector("body");
let textarea = null;
import { keys } from "./keys.js";

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
  textarea = textArea;
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