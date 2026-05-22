const flowers =
document.querySelectorAll(".flower-item");

flowers.forEach((flower)=>{

  flower.addEventListener("click",()=>{

    const targetId =
    flower.getAttribute("data-target");

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

reservationButton.addEventListener("click",()=>{

  alert(
    "Merci 🌼 Votre réservation a bien été prise en compte."
  );

});
