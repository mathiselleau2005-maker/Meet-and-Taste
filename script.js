const flowers = document.querySelectorAll(".flower-item");

flowers.forEach((flower) => {

  flower.addEventListener("click", () => {

    const targetId = flower.getAttribute("data-target");

    const targetSection =
    document.getElementById(targetId);

    if(targetSection){

      targetSection.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

    }

  });

});

const reservationButton =
document.getElementById("reservation-btn");

reservationButton.addEventListener("click", () => {

  alert(
    "Merci 🌼 Votre réservation a bien été prise en compte."
  );

});

/* apparition douce au scroll */

const sections =
document.querySelectorAll(
  ".section, .values-strip, .reservation-section, .recruit-section"
);

const observer =
new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add("show-section");

    }

  });

},{
  threshold:0.15
});

sections.forEach((section) => {

  section.classList.add("hidden-section");

  observer.observe(section);

});
