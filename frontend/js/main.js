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

  outlineButton.addEventListener("pointerenter", function () {
    show(partyPetKitImage);
    hide(partyKitImage);
  });
  outlineButton.addEventListener("pointerleave", function () {
    hide(partyPetKitImage);
    show(partyKitImage);
  });
});
