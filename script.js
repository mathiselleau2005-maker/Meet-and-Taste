const reservationButton =
document.querySelector(".reservation-form button");

reservationButton.addEventListener("click", () => {

  alert("Merci 🌼 Votre réservation a bien été prise en compte.");

});

const daisies =
document.querySelectorAll(".daisy-item");

daisies.forEach((daisy) => {

  daisy.addEventListener("click", () => {

    const target =
    document.getElementById(daisy.dataset.target);

    if(target){

      target.scrollIntoView({
        behavior:"smooth"
      });

    }

  });

});
