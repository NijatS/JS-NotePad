const titleInput = document.querySelector("#titleInput");
const noteInput = document.querySelector("#noteInput");
const redColor = document.querySelector("#red");
const purpleColor = document.querySelector("#purple");
const blueColor = document.querySelector("#blue");
const yellowColor = document.querySelector("#yellow");
const greenColor = document.querySelector("#green");
const colors = document.querySelector("#colors");
const saveButton = document.querySelector("#save");
colors.forEach((color) => {
  color.addEventListener("click", () => {
    color.focus();
  });
});
