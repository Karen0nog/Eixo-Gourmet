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

  function showPartyKit () {
    show(partyKitImage);
    hide(partyPetKitImage);
  }

  function showPartyPetKit () {
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

// KITS

// const kitsData = [
//         { id: 1, nome: , descricao: , pessoas:, preco: , imagem: },
//         { id: 2, nome: , descricao: , pessoas:, preco: , imagem: },
//         { id: 3, nome: , descricao: , pessoas:, preco:  imagem:  },
//         { id: 4, nome: , descricao: , pessoas: 6, preco: , imagem: },
//         { id: 5, nome: , descricao: , pessoas: , preco: , imagem:  },
//     ];

// function createCardContent(kit) {
//         return `
//             <img src="${kit.imagem}" class="card-img-top" alt="Imagem do ${kit.nome}">
//             <div class="card-body px-4 pb-4">
//                 <h5 class="card-title mb-2 text-dark">${kit.nome}</h5>
//                 <p class="card-text text-muted small mb-3">${kit.descricao}</p>
                
//                 <div class="d-flex align-items-center text-muted small mb-3">
//                     <i class="fas fa-users me-2"></i>
//                     <span>Para ${kit.pessoas} pessoas</span>
//                 </div>
                
//                 <p class="card-price fs-5 fw-bold text-dark">R$ ${kit.preco}</p>
                
//                 <a href="#" class="btn btn-detalhes w-100 mt-2">Ver Detalhes</a>
//             </div>
//         `;
//     }

//     document.addEventListener('DOMContentLoaded', () => {
//         kitsData.forEach(kit => {
//             const cardElement = document.querySelector(`.card-kit[data-id="${kit.id}"]`);
//             if (cardElement) {
//                 cardElement.innerHTML = createCardContent(kit);
//             }
//         });
//     });