import { Color, Colors } from "./model.js";

const colors = new Colors();

const colorAddButton = document.querySelector("#color-add .color-button-add");
const colorsGrid = document.getElementById("colors");
const colorCodeInput = document.querySelector("#color-add .color-circle");
const colorTitleInput = document.querySelector("#color-add .color-title");

const createColorElement = (color) => {
  const { id, title, colorCode } = color;

  const newColorItem = document.createElement("li");
  newColorItem.classList.add("color");

  const colorCircle = document.createElement("input");
  colorCircle.type = "color";
  colorCircle.classList.add("color-circle");
  colorCircle.value = colorCode;
  colorCircle.addEventListener("input", () =>
    colors.updateColor(id, title, colorCircle.value)
  );
  newColorItem.appendChild(colorCircle);

  const colorTitle = document.createElement("input");
  colorTitle.type = "text";
  colorTitle.classList.add("color-title");
  colorTitle.value = title;
  colorTitle.addEventListener("input", () =>
    colors.updateColor(id, colorTitle.value, colorCode)
  );
  newColorItem.appendChild(colorTitle);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "borra";
  deleteButton.classList.add("color-button-remove");
  deleteButton.addEventListener("click", function () {
    newColorItem.remove();
    colors.deleteColor(id);
  });
  newColorItem.appendChild(deleteButton);

  colorsGrid.appendChild(newColorItem);
};

colors.getAllColors().forEach(createColorElement);

const handler = () => {
  const randomId = crypto.randomUUID();
  const colorCode = colorCodeInput.value;
  const colorTitle = colorTitleInput.value;

  if (!colorTitle) {
    colorTitleInput.style.outline = "dashed orange";
    alert("Se necesita un nombre");
    return;
  } else colorTitleInput.style.outline = "none";

  colors.addColor(randomId, colorTitle, colorCode);
  createColorElement(new Color(randomId, colorTitle, colorCode));

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  colorCodeInput.value = randomColor;
};

colorAddButton.addEventListener("click", handler);
colorTitleInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handler();
  }
});
