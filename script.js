const flowers = document.querySelectorAll(".flower-link");

flowers.forEach((flower) => {
  flower.addEventListener("click", () => {
    const targetId = flower.dataset.target;
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const reservationBtn = document.getElementById("reservationBtn");

if (reservationBtn) {
  reservationBtn.addEventListener("click", () => {
    alert("Merci 🌼 Votre demande de réservation a bien été prise en compte.");
  });
}
