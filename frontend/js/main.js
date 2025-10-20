document.addEventListener("DOMContentLoaded", function () {
  const primaryButton = document.querySelector(".btn-primary-custom");
  const outlineButton = document.querySelector(".btn-outline-custom");

  const partyKitImage = document.querySelector("#partyKit");
  const partyPetKitImage = document.querySelector("#partyPetKit");

  if (!primaryButton || !outlineButton || !partyKitImage || !partyPetKitImage)
    return;

  function show(img) {
    img.classList.add("visible");
  }
  function hide(img) {
    img.classList.remove("visible");
  }

  show(partyKitImage);
  hide(partyPetKitImage);

  function showPartyKit() {
    show(partyKitImage);
    hide(partyPetKitImage);
  }

  function showPartyPetKit() {
    show(partyPetKitImage);
    hide(partyKitImage);
  }

  showPartyKit();

  primaryButton.addEventListener("click", showPartyKit);
  primaryButton.addEventListener("pointerover", showPartyKit);

  outlineButton.addEventListener("click", showPartyPetKit);
  outlineButton.addEventListener("pointerover", showPartyPetKit);

  outlineButton.addEventListener("pointerleave", showPartyKit);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fetchAndRenderKits);
} else {
  fetchAndRenderKits();
}

// KITS

async function fetchAndRenderKits() {
  try {
    const response = await fetch("/api/kits");
    if (!response.ok)
      throw new Error(`Falha ao obter kits: ${response.status}`);
    const kits = await response.json();
    renderKits(kits);
  } catch (error) {
    console.log("Erro ao buscar kits:", error);
  }
}

function renderKits(kits) {
  const carouselInner = document.querySelector("#carousel-kits-inner");
  if (!carouselInner) {
    console.error("Elemento #carousel-kits-inner não encontrado.");
    return;
  }

  carouselInner.innerHTML = "";

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    kits.forEach((kit, index) => {
      const slide = document.createElement("div");
      slide.className = index === 0 ? "carousel-item active" : "carousel-item";

      const row = document.createElement("div");
      row.className = "row justify-content-center g-0";

      const col = document.createElement("div");
      col.className = "col-12";

      const precoFormatado = Number(kit.preco || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      col.innerHTML = `
        <div class="card card-kit h-100" data-id="${kit._id}">
          <img class="card-img-top img-fluid w-100" src="images/${
            kit.imagem
          }" alt="${kit.nome}">
          <div class="card-body">
            <h4 class="card-title">${kit.nome}</h4>
            <p class="card-text">Pessoas: ${kit.pessoas} | Itens: ${
        kit.itens || [].join(", ")
      }</p>
          </div>
          </div>
          <div class="card-footer d-flex justify-content-center">
            <span class="h5 mb-0 text-success">${precoFormatado}</span>
          </div>
        </div>
      `;
      row.appendChild(col);
      slide.appendChild(row);
      carouselInner.appendChild(slide);
    });
  }

  // Desktop / tablet: renderiza em slides de 3
  for (let i = 0; i < kits.length; i += 3) {
    const slide = document.createElement("div");
    slide.className = "carousel-item" + (i === 0 ? " active" : "");

    const row = document.createElement("div");
    row.className = "row justify-content-center g-4";

    for (let j = 0; j < 3; j++) {
      const kit = kits[i + j];
      const col = document.createElement("div");
      col.className = "col-12 col-md-4";

      if (kit) {
        const precoFormatado = Number(kit.preco || 0).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        col.innerHTML = `
          <div class="card card-kit h-100" data-id="${kit._id}">
            <img class="card-img-top" src="images/${kit.imagem}" alt="${
          kit.nome
        }">
            <div class="card-body">
              <h4 class="card-title">${kit.nome}</h4>
              <p class="card-text">Pessoas: ${kit.pessoas} | Itens: ${
          kit.itens || [].join(", ")
        }</p>
            </div>
            <div class="card-footer justify-content-center d-flex">
              <span class="h5 mb-0 text-success">${precoFormatado}</span>
            </div>
          </div>
        `;
      } else {
        col.classList.add("d-none", "d-md-block");
      }
      row.appendChild(col);
    }
    slide.appendChild(row);
    carouselInner.appendChild(slide);
  }
}
