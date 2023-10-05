const titleInput = document.querySelector("#titleInput");
const noteInput = document.querySelector("#noteInput");
const searchInput = document.querySelector("#searchInput");

const redColor = document.querySelector("#red");
const purpleColor = document.querySelector("#purple");
const blueColor = document.querySelector("#blue");
const yellowColor = document.querySelector("#yellow");
const greenColor = document.querySelector("#green");

const addButton = document.querySelector("#add");
const saveButton = document.querySelector("#save");

const cards = document.querySelector("#cards");
const card = document.getElementsByClassName("card");
const defaultCard = document.querySelector("#default");
const defaultTrash = defaultCard.querySelector("#trash");
const defaultEdit = defaultCard.querySelector("#edit");

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

addButton.addEventListener("click", () => {
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
            <img src="./Image/edit-icon.svg" alt="Edit Icon" id="edit">
            <img src="./Image/trash-icon.svg" alt="Trash Icon" id="trash" />
        </div>
          <p>${text}</p>
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
  const trash = newCard.querySelector("#trash");
  trash.addEventListener("click", () => {
    if (!confirm("Are you sure?")) {
      return;
    }
    let index = cardsArray.findIndex((card) => card == newCard);
    newCard.remove();
    cardsArray.splice(index, 1);
  });
  const edit = newCard.querySelector("#edit");
  edit.addEventListener("click", () => {
    // if (!confirm("Are you sure?")) {
    //   return;
    // }
    titleInput.value = newCard.children[0].children[0].textContent;
    noteInput.value = newCard.children[1].textContent;
    for (const c of color) {
      let cardColor = getComputedStyle(c);
      if (cardColor.backgroundColor == newCard.style.borderColor) {
        Blur(color);
        Click(c);
        selectedColor = cardColor.backgroundColor;
        divColor = selectedColor.substring(0, selectedColor.length - 1);
        divColor += ",0.4)";
      }
    }
    saveButton.addEventListener("click", () => {
      for (const card of cardsArray) {
        if (newCard == card) {
          card.children[0].children[0].textContent = titleInput.value;
          card.children[1].textContent = noteInput.value;
          cardsArray[index] = card;
          const cardDiv = card.getElementsByTagName("div")[0];
          card.style.borderColor = selectedColor;
          cardDiv.style.backgroundColor = divColor;
        }
      }
    });
  });
  titleInput.value = "";
  noteInput.value = "";
  selectedColor = "";
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
defaultEdit.addEventListener("click", () => {
  // if (!confirm("Are you sure?")) {
  //   return;
  // }
  titleInput.value = defaultCard.children[0].children[0].textContent;
  noteInput.value = defaultCard.children[1].textContent;
  for (const c of color) {
    let cardColor = getComputedStyle(c);
    if (cardColor.backgroundColor == defaultCard.style.borderColor) {
      Blur(color);
      Click(c);
    }
  }
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
      text.startsWith(searchInput.value.trim().toLowerCase()) ||
      title.startsWith(searchInput.value.trim().toLowerCase())
    ) {
    } else {
      matchedCard.push(card);
    }
  }
  return matchedCard;
}
