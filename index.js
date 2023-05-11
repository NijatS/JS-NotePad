const titleInput = document.querySelector("#titleInput");
const noteInput = document.querySelector("#noteInput");
const redColor = document.querySelector("#red");
const purpleColor = document.querySelector("#purple");
const blueColor = document.querySelector("#blue");
const yellowColor = document.querySelector("#yellow");
const greenColor = document.querySelector("#green");
const saveButton = document.querySelector("#save");

const cards = document.querySelector("#cards");
const body = document.body;

let color = [redColor, purpleColor, blueColor, yellowColor, greenColor];
let selectedColor;
redColor.addEventListener("click", () => {
  Blur(color);
  Click(redColor);
  selectedColor = redColor;
  body.style.backgroundColor = String(selectedColor.style.backgroundColor);
});
purpleColor.addEventListener("click", () => {
  Blur(color);
  Click(purpleColor);
  selectedColor = purpleColor.style.backgroundColor;
});
blueColor.addEventListener("click", () => {
  Blur(color);
  Click(blueColor);
});
yellowColor.addEventListener("click", () => {
  Blur(color);
  Click(yellowColor);
});
greenColor.addEventListener("click", () => {
  Blur(color);
  Click(greenColor);
});
saveButton.addEventListener("click", () => {
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
  newCard.style.borderColor = selectedColor;
  newCard.className = "card";
  cards.append(newCard);
});

function Click(body) {
  body.textContent = "✓";
}
function Blur(color) {
  for (const c of color) {
    c.textContent = "";
  }
}
