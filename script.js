
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



/* ==========================================
   PRECIOS DE BUZOS POR COLEGIO, TELA Y TALLA
========================================== */

const preciosBuzos = {

  // 1. NÉSTOR ESCUDERO OTERO
  "Néstor Escudero Otero": {
    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    }
  },

  // 2. FE Y ALEGRÍA
  "Fe y Alegría": {

    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    },

    "Polialgodón": {
      "6": 35,
      "8": 35,
      "10": 35,
      "12": 38,
      "14": 38,
      "16": 40,
      "S": 40,
      "M": 40,
      "L": 45,
      "XL": 45
    }

  },

  // 3. MICAELA BASTIDAS
  "Micaela Bastidas": {
    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    }
  },

  // 4. GRAN PASCAL
  "Gran Pascal": {
    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    }
  },

  // 5. CÉSAR VALLEJO
  "César Vallejo": {
    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    }
  },

  // 6. CRISANTO SALINAS
  "Crisanto Salinas": {
    "Polinam": {
      "6": 25,
      "8": 25,
      "10": 30,
      "12": 30,
      "14": 30,
      "16": 30,
      "S": 30,
      "M": 30,
      "L": 35,
      "XL": 35
    }
  }
};


// =====================================
// 3. FOTOGRAFÍAS DISPONIBLES
// =====================================

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

  if (!prenda || !escuela) {
    return null;
  }

  return `imagenes/${prenda}-${escuela}.jpg`;
}

// =====================================
// 5. SELECCIÓN ACTUAL
// =====================================

let colegioSeleccionado = null;
let prendaSeleccionada = null;
let telaSeleccionada = null;
let generoSeleccionado = null;

// =====================================
// 6. FUNCIONES AUXILIARES
// =====================================

function ocultarCategorias() {

  const categorias =
    document.getElementById("categorias");

  if (categorias) {
    categorias.style.display = "none";
  }
}

function limpiarProductos() {

  const productos =
    document.getElementById("lista-productos");

  if (productos) {
    productos.innerHTML = "";
  }
}

function desplazarA(elemento) {

  if (!elemento) return;

  elemento.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// =====================================
// 7. EXPLORAR UNIFORMES
// =====================================

function explorarUniformes() {

  ocultarCategorias();

  const colegios =
    document.getElementById("colegios");

  const productos =
    document.querySelector(".products");

  if (colegios) {
    colegios.style.display = "";
  }

  if (productos) {
    productos.style.display = "";
  }

  desplazarA(colegios);
}

// =====================================
// 8. SELECCIONAR COLEGIO
// =====================================

function seleccionarColegio(colegio) {

  colegioSeleccionado = colegio;
  prendaSeleccionada = null;
  telaSeleccionada = null;
  generoSeleccionado = null;
actualizarPasosCompra();
  ocultarCategorias();
  limpiarProductos();

  const contenedor =
    document.getElementById("prendas-del-colegio");

  const panelTelas =
    document.getElementById("tipos-tela-colegio");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (panelTelas) {
    panelTelas.innerHTML = "";
  }

  // Marcar el colegio seleccionado
  document.querySelectorAll(".colegio-destacado")
    .forEach(boton => {

      const nombre =
        boton.querySelector("h3")?.textContent.trim();

      boton.classList.toggle(
        "seleccionado",
        nombre === colegio
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

      grid.querySelectorAll(".prenda-colegio-card")
        .forEach(b => {
          b.classList.remove("seleccionado");
        });

      boton.classList.add("seleccionado");

      colegioSeleccionado = colegio;
      prendaSeleccionada = prenda;
      telaSeleccionada = null;
      generoSeleccionado = null;
actualizarPasosCompra();
      ocultarCategorias();
      limpiarProductos();

      mostrarTiposTela();

    });

    grid.appendChild(boton);

  });

  contenedor.append(titulo, descripcion, grid);

  desplazarA(contenedor);
}

// =====================================
// 9. TIPOS DE TELA
// =====================================

function mostrarTiposTela() {

  const contenedor =
    document.getElementById("tipos-tela-colegio");

  if (!contenedor) {
    console.error("Falta tipos-tela-colegio en HTML");
    return;
  }

  contenedor.innerHTML = "";

  // Telas configuradas por prenda
  


const telasPorPrenda = {

  // BUZOS: telas según el colegio
  "Buzos":
    colegioSeleccionado === "Fe y Alegría"
      ? ["Polinam", "Polialgodón"]
      : ["Polinam"],

  // PANTALONES: conservar sus telas originales
  "Pantalones": [
    "Gabardina",
    "Drill",
    "Tergal",
    "Poliviscosa",
    "Lanilla"
  ]

};

  const tiposTela =
    telasPorPrenda[prendaSeleccionada];

  const titulo = document.createElement("h2");
  titulo.textContent =
    "Selecciona el tipo de tela para " +
    prendaSeleccionada;

  const descripcion = document.createElement("p");
  descripcion.textContent =
    "Colegio: " + colegioSeleccionado;

  contenedor.append(titulo, descripcion);

  if (!tiposTela) {

    const mensaje = document.createElement("p");
    mensaje.textContent =
      "Tipos de tela pendientes de configurar para esta prenda.";

    mensaje.style.marginTop = "15px";
    contenedor.appendChild(mensaje);

    desplazarA(contenedor);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "prendas-colegio-grid";

  tiposTela.forEach(tela => {

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "prenda-colegio-card";
    boton.textContent = tela;

    boton.addEventListener("click", () => {

      // Marcar únicamente la tela seleccionada
      grid.querySelectorAll(".prenda-colegio-card")
        .forEach(b => {
          b.classList.remove("seleccionado");
        });

      boton.classList.add("seleccionado");

      telaSeleccionada = tela;
      generoSeleccionado = null;
actualizarPasosCompra();
      limpiarProductos();

      // Mostrar categorías al seleccionar tela
      const categorias =
        document.getElementById("categorias");

      if (categorias) {

        categorias.style.display = "block";

        // Quitar selección anterior Hombre/Mujer
        document.querySelectorAll(
          ".genero-botones button"
        ).forEach(b => {
          b.classList.remove("activo");
          b.setAttribute("aria-pressed", "false");
        });

        desplazarA(categorias);
      }

    });

    grid.appendChild(boton);

  });

  contenedor.appendChild(grid);

  desplazarA(contenedor);
}

// =====================================
// 10. SELECCIONAR HOMBRE O MUJER
// =====================================

function mostrarCategorias(genero) {

  generoSeleccionado = genero;

  const botones =
    document.querySelectorAll(
      ".genero-botones button"
    );

  botones.forEach((boton, indice) => {

    const activo =
      (genero === "hombre" && indice === 0) ||
      (genero === "mujer" && indice === 1);

    boton.classList.toggle("activo", activo);
    boton.setAttribute(
      "aria-pressed",
      String(activo)
    );

  });

  if (colegioSeleccionado && prendaSeleccionada &&
      telaSeleccionada) {

    mostrarProductos(
      prendaSeleccionada,
      genero,
      colegioSeleccionado
    );

    desplazarA(
      document.getElementById("lista-productos")
    );
  }
}

// =====================================
// 11. MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos(
  categoria,
  genero,
  colegioInicial = null
) {

  const seccion =
    document.getElementById("lista-productos");

  if (!seccion) return;

  seccion.innerHTML = "";

  const titulo = document.createElement("h2");

  titulo.textContent =
    categoria + " - " +
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

      // Fotografías para Combo 2 en 1
      if (categoria === "Combo 2 en 1") {

        ["Buzos", "Casacas"].forEach(tipo => {

          const rutaCombo =
            obtenerImagen(tipo, colegio);

          if (rutaCombo) {

            const imagenCombo =
              document.createElement("img");

            imagenCombo.src = rutaCombo;
            imagenCombo.alt =
              tipo + " de " + colegio;

            imagenCombo.className =
              "imagen-producto";

            imagenCombo.onerror = () => {
              imagenCombo.remove();
            };

            resultado.appendChild(imagenCombo);
          }

        });

        mensaje.textContent =
          "Combo: Buzo + Casaca. Precio según talla por registrar.";
      }

      // Fotografía de una prenda individual
      if (ruta) {

        const imagen = document.createElement("img");
        imagen.src = ruta;
        imagen.alt =
          categoria + " de " + colegio;

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

/* TALLAS Y PRECIOS DE BUZOS */

if (categoria === "Buzos") {


const preciosTela =
  preciosBuzos[colegio]?.[telaSeleccionada];


  if (preciosTela) {

    mensaje.textContent =
      "Selecciona tu talla para conocer el precio.";

    const panelTallas = document.createElement("div");
    panelTallas.className = "panel-tallas";

    const tituloTallas = document.createElement("h3");
    tituloTallas.textContent = "Selecciona tu talla";

    const opcionesTallas = document.createElement("div");
    opcionesTallas.className = "opciones-tallas";

    const precioMostrado = document.createElement("p");
    precioMostrado.className = "precio-uniforme";
    precioMostrado.textContent =
  "El precio aparecerá al seleccionar una talla.";

    Object.entries(preciosTela).forEach(([talla, precio]) => {

      const botonTalla = document.createElement("button");
      botonTalla.type = "button";
      botonTalla.textContent = talla;
      botonTalla.className = "boton-talla";

      botonTalla.addEventListener("click", () => {

        opcionesTallas.querySelectorAll(".boton-talla")
          .forEach(b => b.classList.remove("activo"));

        botonTalla.classList.add("activo");

precioMostrado.innerHTML =
  `<span class="talla-elegida">Talla seleccionada: ${talla}</span>
   <strong>S/ ${precio.toFixed(2)}</strong>`;

      });

      opcionesTallas.appendChild(botonTalla);

    });

    panelTallas.append(
      tituloTallas,
      opcionesTallas,
      precioMostrado
    );

    resultado.appendChild(panelTallas);

  }

}

    });

    grid.appendChild(boton);

    if (colegio === colegioInicial) {
      boton.dataset.inicial = "true";
    }

  });

  if (colegioInicial) {
    seccion.append(titulo, resultado);
  } else {
    seccion.append(
      titulo,
      subtitulo,
      grid,
      resultado
    );
  }

  const inicial = grid.querySelector(
    '[data-inicial="true"]'
  );

  if (inicial) {
    inicial.click();
  }
}

// =====================================
// 12. INICIAR PÁGINA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // Las categorías comienzan ocultas
  ocultarCategorias();

});

/* MENÚ HAMBURGUESA */

const botonMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

if (botonMenu && menuPrincipal) {

  botonMenu.addEventListener("click", () => {
    const abierto = menuPrincipal.classList.toggle("menu-abierto");

    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.textContent = abierto ? "✕ Cerrar" : "☰ Menú";
  });

  menuPrincipal.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      menuPrincipal.classList.remove("menu-abierto");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.textContent = "☰ Menú";
    });
  });

}

/* =====================================
   BUSCADOR INTELIGENTE - AYALA
===================================== */

(function () {

  const campo = document.getElementById("buscador-productos");
  const boton = document.getElementById("btn-buscar");

  if (!campo || !boton) return;

  function normalizar(texto) {
    return texto.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function buscar() {

    const busqueda = normalizar(campo.value);

    if (!busqueda) {
      campo.focus();
      return;
    }

    // 1. Buscar colegio
    const colegio = Object.keys(colegiosArchivos).find(
      nombre => normalizar(nombre).includes(busqueda)
    );

    if (colegio) {
      seleccionarColegio(colegio);
      return;
    }

    // 2. Buscar prendas
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

    const prenda = prendas.find(nombre => {
      const nombreNormal = normalizar(nombre);
      return nombreNormal.includes(busqueda) ||
             (busqueda.length >= 4 &&
              busqueda.includes(nombreNormal));
    });

    if (prenda) {

      alert(
        "Buscas: " + prenda +
        "\n\nPrimero selecciona tu colegio para continuar."
      );

      explorarUniformes();
      return;
    }

    // 3. Buscar telas
    const telas = [
      "Polinam",
      "Polialgodón",
      "Gabardina",
      "Drill",
      "Tergal",
      "Poliviscosa",
      "Lanilla"
    ];

    const tela = telas.find(nombre =>
      normalizar(nombre).includes(busqueda)
    );

    if (tela) {

      alert(
        "Buscas tela: " + tela +
        "\n\nPrimero selecciona tu colegio y prenda."
      );

      explorarUniformes();
      return;
    }

    // 4. Buscar arreglos de ropa
    if (
      busqueda.includes("arreglo") ||
      busqueda.includes("costura") ||
      busqueda.includes("basta") ||
      busqueda.includes("entalle")
    ) {

      document.getElementById("costura")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    // 5. Sin resultados
    alert(
      "No encontramos resultados para: " + campo.value
    );
  }

  boton.addEventListener("click", buscar);

  campo.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
      evento.preventDefault();
      buscar();
    }
  });

})();

/* =====================================
   INDICADOR AUTOMÁTICO DE COMPRA
   CONFECCIONES AYALA
===================================== */

function actualizarPasosCompra() {

  const pasos = document.querySelectorAll(
    "#pasos-compra .paso-compra"
  );

  let pasoActual = 1;

  if (colegioSeleccionado) {
    pasoActual = 2;
  }

  if (colegioSeleccionado && prendaSeleccionada) {
    pasoActual = 3;
  }

  if (
    colegioSeleccionado &&
    prendaSeleccionada &&
    telaSeleccionada
  ) {
    pasoActual = 4;
  }

  pasos.forEach((paso, indice) => {

    paso.classList.toggle(
      "activo",
      indice === pasoActual - 1
    );

    paso.classList.toggle(
      "completado",
      indice < pasoActual - 1
    );

  });

}