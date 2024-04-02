// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  HOME BANNER

document.addEventListener("DOMContentLoaded", (event) => {
    $(document).ready(function () {

       gsap.set(".effect", { autoAlpha: 1 }); //remove fouc
       let tl = gsap
          .timeline({})//repeat:4, yoyo:true
          .from("h1", { scale: 0.03, duration: 4, ease: "power4.inOut" })
          .to(".blendImage, .bg", { scale: 1, duration: 3 }, 0)
          .to(".dark", { opacity: 0, duration: 1 }, ">-=100%")
          .from(".right-h", { y: -700, duration: 1, ease: "power4.out" }, 2.8)
          .from(".left-h", { y: 700, duration: 1, ease: "power4.out" }, 2.8)
          .from(".mouse", { scale: 0.1, opacity: 0, duration: 1, ease: "back(4)" }, 2.8)
          .from("span.center", { scale: 0.1, opacity: 0, stagger: 0.05, duration: 1, ease: "back(4)" }, 2.8);



       var curPage = 0;
       var numOfPages = $(".skw-page").length;
       var animTime = 2000;
       var scrolling = false;
       var pgPrefix = ".skw-page-";

       function pagination() {
          scrolling = true;

          if (curPage == 1) {
             gsap.set(".parent-h", { opacity: 1 });
          }


          $(pgPrefix + curPage).removeClass("inactive").addClass("active");

          $(pgPrefix + (curPage - 1)).addClass("inactive");
          $(pgPrefix + (curPage + 1)).removeClass("active");

          setTimeout(function () {
             scrolling = false;
          }, animTime);
       }

       function navigateUp() {
          if (curPage === 0) return;
          curPage--;
          pagination();
       }

       function navigateDown() {
          if (curPage === numOfPages) return;
          curPage++;
          pagination();
       }

       $(document).on("mousewheel DOMMouseScroll", function (e) {
          if (scrolling) return;
          if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
             navigateUp();
          } else {
             navigateDown();
          }
       });

       $(document).on("keydown", function (e) {
          if (scrolling) return;
          if (e.which === 38) {
             navigateUp();
          } else if (e.which === 40) {
             navigateDown();
          }
       });
    });

 });



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  PROGRESS WRAP

document.addEventListener("DOMContentLoaded", (event) => {
    (function ($) {
       $(document).ready(function () {
          var progressPath = document.querySelector(".progress-wrap path");
          var pathLength = progressPath.getTotalLength();
          progressPath.style.transition = progressPath.style.WebkitTransition = "none";
          progressPath.style.strokeDasharray = pathLength + " " + pathLength;
          progressPath.style.strokeDashoffset = pathLength;
          progressPath.getBoundingClientRect();
          progressPath.style.transition = progressPath.style.WebkitTransition =
             "stroke-dashoffset 10ms linear";
          var updateProgress = function () {
             var scroll = $(window).scrollTop();
             var height = $(document).height() - $(window).height();
             var progress = pathLength - (scroll * pathLength) / height;
             progressPath.style.strokeDashoffset = progress;
          };
          updateProgress();
          $(window).scroll(updateProgress);
          var offset = 50;
          var duration = 550;
          jQuery(window).on("scroll", function () {
             if (jQuery(this).scrollTop() > offset) {
                jQuery(".progress-wrap").addClass("active-progress");
             } else {
                jQuery(".progress-wrap").removeClass("active-progress");
             }
          });
          jQuery(".progress-wrap").on("click", function (event) {
             event.preventDefault();
             jQuery("html, body").animate({ scrollTop: 0 }, duration);
             return false;
          });
       });
    })(jQuery);


 });

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  BAKGROUND BOX
document.addEventListener("DOMContentLoaded", (event) => {
    $(window).mousemove(function (e) {
       $(".background-box").css(
          "background-position",
          `calc(50% + ${(window.innerWidth / 2) - e.clientX}px * -1) calc(10% + ${(window.innerHeight / 2) - e.clientY}px * -1)`
       );
    });

 });
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Demo theme js

const slider = document.querySelector(".horr-hover-slider");
      const links = document.querySelectorAll(".horr-hover-slider-link");
      const label = document.querySelectorAll(".horr-hover-slider-label");
      const labelDefaultText = label[0].textContent;

      function splitText(string) {
         label[0].innerHTML = '';

         let transition = 0;

         string.split("").forEach((symbol) => {
            transition += 40;

            const span = document.createElement("span");
            span.innerHTML = symbol;
            span.style.transitionDelay = `${transition}ms`;


            setTimeout(() => {
               span.classList.add('show');
            }, 10);

            label[0].append(span);
         });
      }

      links.forEach((link) => {
         link.addEventListener("mouseenter", function () {
            splitText(this.querySelector('.horr-hover-slider-link-heading').innerText);
         }, false);
      });

      slider.addEventListener("mouseleave", function () {
         splitText(labelDefaultText);
      }, false);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Ball movable


document.addEventListener("DOMContentLoaded", (event) => {
    const text = document.querySelector("#text");
    const ball = document.querySelector("#ball");
    window.addEventListener("mousemove", function (dets) {
       let x = Math.floor(dets.clientX * 0.05 - 30);
       let y = Math.floor(dets.clientY * 0.05 - 50);

       text.style.transform = `translate(${x}px,${y}px)`;
       ball.style.transform = `translate(${-x}px,${-y}px)`;
    });
 });
 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  PRELOADER

jQuery(window).on('load', function () {
    jQuery(".nk-preloader-content").delay("slow").fadeOut();
 });

 // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 
 
 
 
 // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Swiper slider
 const swiper = new Swiper('.swiper-container', {
    speed: 500,
    pagination: {
       el: '.swiper-pagination',
       clickable: true,
    },
    centeredSlides: true,
    paginationClickable: true,
    watchSlidesProgress: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
    },
 });
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

jQuery('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
       0: {
          items: 1,
          nav: true
       },
       400: {
          items: 2,
          nav: true
       },

       600: {
          items: 2,
          nav: false
       },
       1000: {
          items: 4,
          nav: true,
          loop: false
       },
       1200: {
          items: 5,
          nav: true,
          loop: false
       }
    }
 })



