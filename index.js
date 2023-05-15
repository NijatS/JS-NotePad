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

for (const c of color) {
  c.addEventListener("click", () => {
    Blur(color);
    Click(c);
    style = getComputedStyle(c);
    selectedColor = style.backgroundColor;
    divColor = selectedColor.substring(0, selectedColor.length - 1);
    divColor += ",0.4)";
  });
}

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
  newCard.style.borderColor = selectedColor;
  cardDiv.style.backgroundColor = divColor;
  newCard.className = "card";
  cards.append(newCard);
  cardsArray.push(newCard);
  Blur(color);
  titleInput.value = "";
  noteInput.value = "";
  selectedColor = "";
  const trash = newCard.querySelector("img");
  trash.addEventListener("click", () => {
    if (!confirm("Are you sure?")) {
      return;
    }
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
  if (!confirm("Are you sure?")) {
    return;
  }
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
      text.includes(searchInput.value.toLowerCase()) ||
      title.includes(searchInput.value.toLowerCase())
    ) {
    } else {
      matchedCard.push(card);
    }
  }
  return matchedCard;
}
