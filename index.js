const titleInput = document.querySelector("#titleInput");
const noteInput = document.querySelector("#noteInput");
const searchInput = document.querySelector("#searchInput");

const redColor = document.querySelector("#red");
const purpleColor = document.querySelector("#purple");
const blueColor = document.querySelector("#blue");
const yellowColor = document.querySelector("#yellow");
const greenColor = document.querySelector("#green");

const saveButton = document.querySelector("#save");

const cards = document.querySelector("#cards");
const card = document.getElementsByClassName("card");
const defaultCard = document.querySelector("#default");
const defaultTrash = defaultCard.querySelector("img");

let style;
let selectedColor;

let color = [redColor, purpleColor, blueColor, yellowColor, greenColor];
let cardsArray = [defaultCard];

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
  cardsArray.push(newCard);
  Blur(color);
  titleInput.value = "";
  noteInput.value = "";
  selectedColor = "";
  const trash = newCard.querySelector("img");
  trash.addEventListener("click", () => {
    let index = cardsArray.findIndex((card) => card == newCard);
    newCard.remove();
    cardsArray.splice(index, 1);
  });
});
searchInput.addEventListener("keyup", () => {
  const matchedCard = Search();
  if (matchedCard.length != 0) {
    for (const card of matchedCard) {
      card.style.display = "none";
    }
  }
});

defaultTrash.addEventListener("click", () => {
  defaultCard.remove();
  cardsArray.shift();
});
function Click(body) {
  body.textContent = "✓";
}
function Blur(color) {
  for (const c of color) {
    c.textContent = "";
  }
}
function Search() {
  let matchedCard = [];
  for (const card of cardsArray) {
    card.style.display = "initial";
    const text = card.children[1].textContent.trim().toLowerCase();
    const title = card.children[0].children[0].textContent.trim().toLowerCase();
    if (
      text.startsWith(searchInput.value.trim()) ||
      title.startsWith(searchInput.value.trim())
    ) {
    } else {
      matchedCard.push(card);
    }
  }
  return matchedCard;
}
