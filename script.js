const reservationButton = document.querySelector(".reservation-form button");

if (reservationButton) {
  reservationButton.addEventListener("click", () => {
    alert("Merci 🌼 Votre demande de réservation a bien été prise en compte.");
  });
}

const daisies = document.querySelectorAll(".daisy-item");

daisies.forEach((daisy) => {
  daisy.addEventListener("click", () => {
    const targetId = daisy.dataset.target;
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
