import { Color, Colors } from "../../scripts/model.js";

describe("Color", () => {
  it("debería crear una instancia de Color con los valores correctos", () => {
    const color = new Color("HTML", "HTML", "#f66b3a");
    expect(color.id).toBe("HTML");
    expect(color.title).toBe("HTML");
    expect(color.colorCode).toBe("#f66b3a");
  });
});

describe("Colors", () => {
  // Simulación y reemplazo de localStorage para las pruebas
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => (store[key] = value.toString()),
      clear: () => (store = {}),
      removeItem: (key) => delete store[key],
    };
  })();
  global.localStorage = mockLocalStorage;

  let colorsInstance = new Colors();

  it("al inicializase debería cargar los 3 colores por defecto", () => {
    const allColors = colorsInstance.getAllColors();
    expect(allColors.length).toBe(3);
    expect(allColors).toEqual([
      new Color("HTML", "HTML", "#f66b3a"),
      new Color("CSS", "CSS", "#16a1dc"),
      new Color("JS", "JS", "#ffde24"),
    ]);
  });

  it("debería añadir un nuevo color", () => {
    colorsInstance.addColor("PHP", "PHP", "#8991b7");
    const allColors = colorsInstance.getAllColors();
    expect(allColors.length).toBe(4);
    expect(allColors[3]).toEqual(new Color("PHP", "PHP", "#8991b7"));
  });

  it("debería eliminar un color existente", () => {
    colorsInstance.deleteColor("HTML");
    const allColors = colorsInstance.getAllColors();
    expect(allColors.length).toBe(3);
    expect(allColors.find((color) => color.id === "HTML")).toBeUndefined();
  });

  it("debería no eliminar un color inexistente", () => {
    const consoleErrorSpy = spyOn(console, "error");
    colorsInstance.deleteColor("NO_EXISTE");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Color con ID 'NO_EXISTE' no encontrado."
    );
  });

  it("debería actualizar un color existente", () => {
    colorsInstance.updateColor("PHP", "PHP7", "#8991b8");
    const color = colorsInstance.getAllColors().find((c) => c.id === "PHP");
    expect(color.title).toBe("PHP7");
    expect(color.colorCode).toBe("#8991b8");
  });

  it("no debería actualizar un color que no existe", () => {
    const consoleErrorSpy = spyOn(console, "error");
    colorsInstance.updateColor("HTML", "Nuevo Título", "#000000");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Color con ID 'HTML' no encontrado."
    );
  });

  it("no debería actualizar un color sin un título", () => {
    const consoleErrorSpy = spyOn(console, "error");
    colorsInstance.updateColor("PHP", "", "#000000");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Color no actualizado ya que el valor 'nombre' es obligatorio."
    );
  });
});
