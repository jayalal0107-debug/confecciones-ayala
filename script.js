
console.log("Confecciones Ayala cargada correctamente");

// =====================================
// 1. COLEGIOS
// =====================================

const colegiosArchivos = {
  "Néstor Escudero Otero": "nestor",
  "Fe y Alegría": "feyalegria",
  "Micaela Bastidas": "micaela",
  "Gran Pascal": "granpascal",
  "César Vallejo": "cesarvallejo",
  "Crisanto Salinas": "crisanto"
};

// =====================================
// 2. TIPOS DE PRENDA
// =====================================

const prendasArchivos = {
  "Buzos": "buzo",
  "Casacas": "casaca",
  "Pantalones": "pantalon",
  "Camisas": "camisa",
  "Polos": "polo",
  "Shorts Escolares": "short",
  "Medias Escolares": "medias"

};

// =====================================
// 3. FOTOGRAFÍAS DISPONIBLES
// =====================================

// Registra únicamente colegios cuyas
// fotografías estén guardadas.

const colegiosConFotos = [
  "Néstor Escudero Otero",
  "Fe y Alegría",
  "Micaela Bastidas",
  "Gran Pascal",
  "César Vallejo"
];

const fotosDisponibles = {
  "Buzos": [...colegiosConFotos],
  "Casacas": [...colegiosConFotos],
  "Pantalones": [...colegiosConFotos],
  "Camisas": [...colegiosConFotos],
  "Polos": [...colegiosConFotos],
"Shorts Escolares": [...colegiosConFotos],
"Medias Escolares": []

};

// =====================================
// 4. OBTENER FOTOGRAFÍA
// =====================================

function obtenerImagen(categoria, colegio) {
  if (!fotosDisponibles[categoria]?.includes(colegio)) {
    return null;
  }

  const prenda = prendasArchivos[categoria];
  const escuela = colegiosArchivos[colegio];

  if (!prenda || !escuela) return null;

  return `imagenes/${prenda}-${escuela}.jpg`;
}

// =====================================
// 5. SELECCIÓN ACTUAL
// =====================================

let colegioSeleccionado = null;
let prendaSeleccionada = null;
let generoSeleccionado = "hombre";

// =====================================
// 6. MOSTRAR CATEGORÍAS
// =====================================

function mostrarCategorias(genero) {

  generoSeleccionado = genero;

  // Resaltar el botón Hombre o Mujer
  const botones =
    document.querySelectorAll(".genero-botones button");

  botones.forEach((boton, indice) => {

    const activo =
      (genero === "hombre" && indice === 0) ||
      (genero === "mujer" && indice === 1);

    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));

  });

  // Mostrar el producto del colegio seleccionado
  if (colegioSeleccionado && prendaSeleccionada) {

    mostrarProductos(
      prendaSeleccionada,
      genero,
      colegioSeleccionado
    );

    document.getElementById("lista-productos")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }
}


// =====================================
// 7. MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos(categoria, genero, colegioInicial = null) {

  const seccion =
    document.getElementById("lista-productos");

  if (!seccion) return;

  seccion.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = categoria + " - " +
    (genero === "hombre" ? "Hombre" : "Mujer");

  const subtitulo = document.createElement("h3");
  subtitulo.textContent = "Selecciona tu colegio";

  const grid = document.createElement("div");
  grid.className = "colegios-grid";

  const resultado = document.createElement("div");
  resultado.className = "resultado-colegio";

  Object.keys(colegiosArchivos).forEach(colegio => {

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "colegio-card";
    boton.textContent = colegio;

    boton.addEventListener("click", () => {

      colegioSeleccionado = colegio;

      grid.querySelectorAll(".colegio-card")
        .forEach(b => b.classList.remove("activo"));

      boton.classList.add("activo");
      resultado.innerHTML = "";

      const nombre = document.createElement("h3");
      nombre.textContent =
        categoria + " - " + colegio;

      resultado.appendChild(nombre);

      const mensaje = document.createElement("p");
      mensaje.textContent =
        "Tallas y precios por registrar.";

      const ruta = obtenerImagen(categoria, colegio);


if (categoria === "Combo 2 en 1") {

  ["Buzos", "Casacas"].forEach(tipo => {

    const rutaCombo = obtenerImagen(tipo, colegio);

    if (rutaCombo) {
      const imagenCombo = document.createElement("img");

      imagenCombo.src = rutaCombo;
      imagenCombo.alt = tipo + " de " + colegio;
      imagenCombo.className = "imagen-producto";

      imagenCombo.onerror = () => imagenCombo.remove();

      resultado.appendChild(imagenCombo);
    }
  });

  mensaje.textContent =
    "Combo: Buzo + Casaca. Precio según talla por registrar.";
}



      if (ruta) {
        const imagen = document.createElement("img");
        imagen.src = ruta;
        imagen.alt = categoria + " de " + colegio;
        imagen.className = "imagen-producto";

        imagen.onerror = () => {
          imagen.remove();
          mensaje.textContent =
            "Fotografía pendiente de registrar.";
        };

        resultado.appendChild(imagen);

} else if (categoria !== "Combo 2 en 1") {
  mensaje.textContent =
    "Fotografía, tallas y precios por registrar.";
}


      resultado.appendChild(mensaje);
    });

    grid.appendChild(boton);

    if (colegio === colegioInicial) {
      boton.dataset.inicial = "true";
    }
  });

  // Mostrar botones de colegios solo cuando
  // el cliente todavía no ha elegido uno.

  if (colegioInicial) {
    seccion.append(titulo, resultado);
  } else {
    seccion.append(titulo, subtitulo, grid, resultado);
  }

  // Seleccionar automáticamente el colegio
  // elegido anteriormente.

  const inicial = grid.querySelector(
    '[data-inicial="true"]'
  );

  if (inicial) {
    inicial.click();
  }

} // Fin de mostrarProductos


// =====================================
// 8. SELECCIONAR COLEGIO
// =====================================

function seleccionarColegio(colegio) {

  colegioSeleccionado = colegio;
  prendaSeleccionada = null;

  const contenedor =
    document.getElementById("prendas-del-colegio");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  document.querySelectorAll(".colegio-destacado")
    .forEach(boton => {
      boton.classList.toggle(
        "seleccionado",
        boton.querySelector("h3")?.textContent.trim() === colegio
      );
    });

  const titulo = document.createElement("h2");
  titulo.textContent = "Uniformes de " + colegio;

  const descripcion = document.createElement("p");
  descripcion.textContent =
    "Selecciona una prenda para continuar.";

const prendas = [
  "Buzos",
  "Casacas",
  "Combo 2 en 1",
  "Pantalones",
  "Camisas",
  "Polos",
  "Shorts Escolares",
  "Medias Escolares"
];

  const grid = document.createElement("div");
  grid.className = "prendas-colegio-grid";

  prendas.forEach(prenda => {

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "prenda-colegio-card";
    boton.textContent = prenda;

    
boton.addEventListener("click", () => {

  colegioSeleccionado = colegio;
  prendaSeleccionada = prenda;

  if (prenda === "Buzos") {
    mostrarTiposTela();
    return;
  }

  const categorias = document.getElementById("categorias");

  if (categorias) {
    categorias.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});


    grid.appendChild(boton);
  });

  contenedor.append(titulo, descripcion, grid);

  contenedor.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function mostrarTiposTela() {

  const contenedor = document.getElementById("prendas-del-colegio");

  if (!contenedor) return;

  let panel = document.getElementById("panel-tipos-tela");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "panel-tipos-tela";
    contenedor.appendChild(panel);
  }

  const tiposTela = [
    "Polinam",
    "Polialgodó"

  ];

  panel.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = "Selecciona el tipo de tela";

  const grid = document.createElement("div");
  grid.className = "prendas-colegio-grid";

  tiposTela.forEach(tela => {

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "prenda-colegio-card";
    boton.textContent = tela;

    boton.addEventListener("click", () => {
      const categorias = document.getElementById("categorias");

      if (categorias) {
        categorias.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

    grid.appendChild(boton);
  });

  panel.append(titulo, grid);

  panel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// =====================================
// 9. INICIAR PÁGINA
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  mostrarCategorias("hombre");
});