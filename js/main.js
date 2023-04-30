const body = document.querySelector("body");
import { keys, specialKeys } from "./keys.js";

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

// implementKeyFunction() {
//   let e = this.textarea.value;
//   const s = this.textarea.selectionStart;
//   const a = function() {
//       s >= 0 && s <= e.length ? (this.textarea.value = e.slice(0, s) + this.current.char + e.slice(s, e.length),
//       this.textarea.selectionStart = s + this.current.char.length,
//       this.textarea.selectionEnd = s + this.current.char.length) : this.textarea.value += this.current.char
//   }
//   .bind(this);
//   if (c.SPECIALS.includes(this.current.code))
//       switch (this.current.code) {
//       case "Backspace":
//           s > 0 && s <= e.length && (e = e.slice(0, s - 1) + e.slice(s, e.length),
//           this.textarea.value = e,
//           this.textarea.selectionStart = s - 1,
//           this.textarea.selectionEnd = s - 1);
//           break;
//       case "Delete":
//           s >= 0 && s <= e.length - 1 && (e = e.slice(0, s) + e.slice(s + 1, e.length),
//           this.textarea.value = e,
//           this.textarea.selectionStart = s,
//           this.textarea.selectionEnd = s);
//           break;
//       case "Tab":
//           this.current.char = "    ",
//           a();
//           break;
//       case "Enter":
//           this.current.char = "\n",
//           a();
//           break;
//       case "CapsLock":
//           this.state.isCapsLockPressed && !this.current.event.repeat ? (this.removeActiveState(),
//           this.state.isCapsLockPressed = !1) : (this.addActiveState(),
//           this.state.isCapsLockPressed = !0),
//           this.toggleCase();
//           break;
//       case "ShiftLeft":
//           this.state.isShiftLeftPressed || this.state.isShiftRightPressed || (this.addActiveState(),
//           this.state.isShiftLeftPressed = !0,
//           this.toggleCase());
//           break;
//       case "ShiftRight":
//           this.state.isShiftRightPressed || this.state.isShiftLeftPressed || (this.addActiveState(),
//           this.state.isShiftRightPressed = !0,
//           this.toggleCase())
//       }
//   else
//       a();
//   this.current.event.ctrlKey && this.current.event.altKey && this.toggleLang()
// }

function updateTextarea(key) {
  const textarea = document.getElementById('textarea');
  textarea.value += key.textContent;
}

document.addEventListener('keydown', function(event) {
  const code = event.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.add('active');
  updateTextarea(virtualKey);
});

document.addEventListener('keyup', function(event) {
  const code = event.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.remove('active');
});

document.addEventListener('mousedown', function(event) {
  const code = event.target.dataset.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.add('active');
  updateTextarea(virtualKey);
});

document.addEventListener('mouseup', function(event) {
  const code = event.target.dataset.code;
  const virtualKey = document.querySelector(`.key[data-code="${code}"]`);
  virtualKey.classList.remove('active');
});