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
