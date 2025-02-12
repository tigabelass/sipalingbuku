// scroll
$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    document.getElementById("myBodyContent").style.marginTop = (-100 - 0.5*scroll) + "px";

	if(scroll >= 30){
		$("#myNav").addClass("bg-primary");
	} else {
		$("#myNav").removeClass("bg-primary");
	}})

// ourteam js
document.addEventListener("DOMContentLoaded", function() {
    let fadeElements = document.querySelectorAll(".fade-in");

    function fadeInOnScroll() {
        fadeElements.forEach(element => {
            let elementTop = element.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Panggil sekali saat halaman dimuat
});