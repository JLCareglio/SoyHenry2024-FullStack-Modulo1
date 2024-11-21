class Color {
  constructor(id, title, colorCode) {
    this.id = id;
    this.title = title;
    this.colorCode = colorCode;
  }
}

const defaultColors = [
  new Color("HTML", "HTML", "#dc6e3c"),
  new Color("CSS", "CSS", "#663399"),
  new Color("JS", "JavaScript", "#efde72"),
  new Color("TS", "TypeScript", "#5286c6"),
  new Color("WA", "WebAssembly", "#5f51df"),
];

class Colors {
  constructor(idName = "default") {
    this.idName = idName;
    this.colors = this.loadColors();
  }

  loadColors() {
    const colorsFromStorage = localStorage.getItem(`colors#${this.idName}`);
    return colorsFromStorage
      ? JSON.parse(colorsFromStorage).map(
          (colorData) =>
            new Color(colorData.id, colorData.title, colorData.colorCode)
        )
      : defaultColors;
  }

  saveColors() {
    localStorage.setItem(`colors#${this.idName}`, JSON.stringify(this.colors));
  }

  getAllColors() {
    return this.colors;
  }

  addColor(id, title, colorCode) {
    if (this.colors.some((color) => color.id === id)) {
      console.error(`Ya existe un color con el ID '${id}'.`);
      return;
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(colorCode)) {
      console.error(`El código de color '${colorCode}' no es válido.`);
      return;
    }

    const color = new Color(id, title, colorCode);
    this.colors.push(color);
    this.saveColors();
  }

  deleteColor(id) {
    const found = this.colors.some((color, index) => {
      if (color.id === id) {
        this.colors.splice(index, 1);
        return true;
      }
    });

    if (found) {
      this.saveColors();
    } else {
      console.error(`Color con ID '${id}' no encontrado.`);
    }
  }

  updateColor(id, newTitle, newColorCode) {
    const color = this.colors.find((color) => color.id === id);

    if (!color) {
      console.error(`Color con ID '${id}' no encontrado.`);
      return;
    }

    if (!newTitle) {
      console.error(
        `Color no actualizado ya que el valor 'nombre' es obligatorio.`
      );
      return;
    }

    color.title = newTitle;
    color.colorCode = newColorCode;
    this.saveColors();
  }
}

export { Color, Colors };
