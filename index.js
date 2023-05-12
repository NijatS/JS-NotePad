const titleInput = document.querySelector("#titleInput");
const noteInput = document.querySelector("#noteInput");
const redColor = document.querySelector("#red");
const purpleColor = document.querySelector("#purple");
const blueColor = document.querySelector("#blue");
const yellowColor = document.querySelector("#yellow");
const greenColor = document.querySelector("#green");
const saveButton = document.querySelector("#save");

const defaultCard = document.querySelector("#default");
const defaultTrash = defaultCard.querySelector("img");

let style;
let selectedColor;

let color = [redColor, purpleColor, blueColor, yellowColor, greenColor];

redColor.addEventListener("click", () => {
  Blur(color);
  Click(redColor);
  style = getComputedStyle(redColor);
  selectedColor = style.backgroundColor;
});
purpleColor.addEventListener("click", () => {
  Blur(color);
  Click(purpleColor);
  style = getComputedStyle(purpleColor);
  selectedColor = style.backgroundColor;
});
blueColor.addEventListener("click", () => {
  Blur(color);
  Click(blueColor);
  style = getComputedStyle(blueColor);
  selectedColor = style.backgroundColor;
});
yellowColor.addEventListener("click", () => {
  Blur(color);
  Click(yellowColor);
  style = getComputedStyle(yellowColor);
  selectedColor = style.backgroundColor;
});
greenColor.addEventListener("click", () => {
  Blur(color);
  Click(greenColor);
  style = getComputedStyle(greenColor);
  selectedColor = style.backgroundColor;
});
saveButton.addEventListener("click", () => {
  if (!titleInput.value.trim() || !noteInput.value.trim()) {
    alert("Please write note title");
    return;
  }
  if (!selectedColor) {
    alert("Please select color");
    return;
  }
  let title = titleInput.value.trim();
  let text = noteInput.value.trim();
  const newCard = document.createElement("div");
  newCard.innerHTML = `
  <div>
            <h4>${title}</h4>
            <img src="./Image/trash-icon.svg" alt="Trash Icon" />
          </div>
          <p>
           ${text}
          </p>
  `;
  const cardDiv = newCard.getElementsByTagName("div")[0];
  selectedColor.opacity = "0.4";
  newCard.style.borderColor = selectedColor;
  cardDiv.style.backgroundColor = selectedColor;
  cardDiv.style.backgroundColor.opacity = "0.4";
  newCard.className = "card";
  cards.append(newCard);
  Blur(color);
  titleInput.value = "";
  noteInput.value = "";
  selectedColor = "";
  const trash = newCard.querySelector("img");
  trash.addEventListener("click", () => {
    newCard.remove();
  });
});

defaultTrash.addEventListener("click", () => {
  defaultCard.remove();
});
function Click(body) {
  body.textContent = "✓";
}
function Blur(color) {
  for (const c of color) {
    c.textContent = "";
  }
}
