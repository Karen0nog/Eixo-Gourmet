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

  fetchAndRenderKits();
});

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

  function formatItems(items) {
    if (Array.isArray(items)) {
      return items.join(", ");
    }
    return items ? items.toString() : "";
  }

  if (window.innerWidth < 768) {
    const scrollRow = document.createElement("div");
    scrollRow.style.display = "flex";
    scrollRow.style.overflowX = "auto";
    scrollRow.style.gap = "1rem";
    scrollRow.style.padding = "1rem 0";

    kits.forEach((kit) => {
      const card = document.createElement("div");
      card.className = "card card-kit";
      card.style.flex = "0 0 80%";
      card.style.maxWidth = "320px";
      card.style.minWidth = "220px";
      card.style.margin = "0 0.5rem";

      card.innerHTML = `
        <img class="card-img-top" src="images/${kit.imagem}" alt="${kit.nome}">
        <div class="card-body">
          <h4 class="card-title">${kit.nome}</h4>
          <p class="card-text">Pessoas: ${kit.pessoas} | Itens: ${formatItems(
        kit.itens
      )}</p>
        </div>
        <div class="card-footer d-flex justify-content-center">
          <span class="h5 mb-0 text-success">
            ${Number(kit.preco || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      `;
      scrollRow.appendChild(card);
    });

    carouselInner.appendChild(scrollRow);
  } else {
    // Desktop view
    for (let i = 0; i < kits.length; i += 3) {
      const slide = document.createElement("div");
      slide.className = "carousel-item" + (i === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row g-4 align-items-stretch";

      for (let j = 0; j < 3; j++) {
        const kit = kits[i + j];
        const col = document.createElement("div");
        col.className = "col-md-4 d-flex";

        if (kit) {
          col.innerHTML = `
            <div class="card card-kit h-100 mx-2">
              <img class="card-img-top" src="images/${kit.imagem}" alt="${
            kit.nome
          }">
              <div class="card-body d-flex flex-column">
                <h4 class="card-title">${kit.nome}</h4>
                <p class="card-text">Pessoas: ${
                  kit.pessoas
                } | Itens: ${formatItems(kit.itens)}</p>
              </div>
              <div class="card-footer d-flex justify-content-center mt-auto">
                <span class="h5 mb-0 text-success">
                  ${Number(kit.preco || 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          `;
        }
        row.appendChild(col);
      }
      slide.appendChild(row);
      carouselInner.appendChild(slide);
    }
  }
}

