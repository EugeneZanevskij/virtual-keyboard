const body = document.querySelector("body");
let textarea = null;

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
  const element = document.createElement("div");
  element.classList.add("keyboard");
  element.setAttribute("id", "keyboard");
  // const c = document.createDocumentFragment();
  container.appendChild(element);
  body.appendChild(container);
}

initDOM();