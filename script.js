// script.js

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            window.scrollTo({
                top: target.offsetTop - 90,
                behavior:'smooth'
            });

        }

    });

});


window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if(window.scrollY > 50){
        header.style.padding = "14px 7%";
    }else{
        header.style.padding = "20px 7%";
    }

});


console.log("MEET and TASTE lancé 🌼");
