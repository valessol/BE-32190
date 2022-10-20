class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({ nombre, autor });
  }

  getBookNames() {
    return this.libros.map(({ nombre, _autor }) => nombre);
  }
}

const pablo = new Usuario("Pablo", "Gerez");
const fullName = pablo.getFullName();
pablo.addMascota("gato");
pablo.addMascota("perro");
const petsNumber = pablo.countMascotas();
pablo.addBook("El señor de las moscas", "William Golding");
pablo.addBook("Fundación", "Isaac Asimov");
const bookNames = pablo.getBookNames();

console.log("El nombre completo es ", fullName);
console.log("Cantidad de mascotas: ", petsNumber);
console.log("Nombres de libros: ", bookNames);
