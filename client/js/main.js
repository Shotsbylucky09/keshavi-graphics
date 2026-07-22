/*==================================================
    KESHAVI GRAPHICS
    main.js
    Part 1
==================================================*/

"use strict";

/*==========================================
DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/*==========================================
GLOBAL ELEMENTS
==========================================*/

const body = document.body;

const header = document.getElementById("header");

const loader = document.getElementById("loader");

const progressBar = document.querySelector(".scroll-indicator");

const year = document.getElementById("year");

/*==========================================
INITIALIZATION
==========================================*/

function initializeWebsite(){

    updateYear();

    hideLoader();

    navbarScroll();

    scrollProgress();

}

/*==========================================
CURRENT YEAR
==========================================*/

function updateYear(){

    if(year){

        year.textContent = new Date().getFullYear();

    }

}

/*==========================================
LOADER
==========================================*/

function hideLoader(){

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.style.opacity="0";

            loader.style.visibility="hidden";

            loader.style.pointerEvents="none";

        },700);

    });

}

/*==========================================
STICKY NAVBAR
==========================================*/

function navbarScroll(){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    });

}

/*==========================================
SCROLL PROGRESS
==========================================*/

function scrollProgress(){

    window.addEventListener("scroll",()=>{

        const scrollTop=window.scrollY;

        const height=

        document.documentElement.scrollHeight-

        window.innerHeight;

        const progress=(scrollTop/height)*100;

        progressBar.style.width=progress+"%";

    });

}

/*==================================================
END OF PART 1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    main.js
    Part 2
==================================================*/

/*==========================================
MOBILE MENU ELEMENTS
==========================================*/

const menuButton = document.querySelector(".menu-toggle");

const mobileMenu = document.querySelector(".mobile-menu");

const menuOverlay = document.querySelector(".menu-overlay");

const mobileLinks = document.querySelectorAll(".mobile-menu a");

/*==========================================
OPEN MENU
==========================================*/

function openMobileMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.add("active");

    if(menuOverlay){

        menuOverlay.classList.add("active");

    }

    body.style.overflow = "hidden";

}

/*==========================================
CLOSE MENU
==========================================*/

function closeMobileMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.remove("active");

    if(menuOverlay){

        menuOverlay.classList.remove("active");

    }

    body.style.overflow = "";

}

/*==========================================
MENU EVENTS
==========================================*/

function initializeMobileMenu(){

    if(menuButton){

        menuButton.addEventListener("click",()=>{

            if(mobileMenu.classList.contains("active")){

                closeMobileMenu();

            }

            else{

                openMobileMenu();

            }

        });

    }

    if(menuOverlay){

        menuOverlay.addEventListener("click",closeMobileMenu);

    }

    mobileLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            closeMobileMenu();

        });

    });

}

/*==========================================
ESC KEY SUPPORT
==========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeMobileMenu();

    }

});

/*==========================================
WINDOW RESIZE
==========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>992){

        closeMobileMenu();

    }

});

/*==========================================
INITIALIZE MENU
==========================================*/

initializeMobileMenu();

/*==================================================
END OF PART 2
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    main.js
    Part 3
==================================================*/

/*==========================================
SMOOTH SCROLL
==========================================*/

const allLinks = document.querySelectorAll(
'a[href^="#"]'
);

allLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});

/*==========================================
ACTIVE NAVIGATION
==========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(

".nav-links a, .mobile-menu a"

);

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=

        section.offsetTop-130;

        const sectionHeight=

        section.offsetHeight;

        if(

            window.scrollY>=sectionTop &&

            window.scrollY<sectionTop+sectionHeight

        ){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href")==="#" + current

        ){

            link.classList.add("active");

        }

    });

});

/*==========================================
BACK TO TOP
==========================================*/

const backTop=document.getElementById(

"backTop"

);

window.addEventListener("scroll",()=>{

    if(!backTop) return;

    if(window.scrollY>500){

        backTop.classList.add("show");

    }

    else{

        backTop.classList.remove("show");

    }

});

if(backTop){

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==========================================
SCROLL REVEAL
==========================================*/

const revealItems=document.querySelectorAll(

".fade-up"

);

const revealObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

revealObserver.observe(item);

});

/*==========================================
SECTION REVEAL
==========================================*/

const animatedSections=document.querySelectorAll(

".section-title,.service-card,.portfolio-card,.review-card,.contact-card"

);

const sectionObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(

"animate"

);

}

});

},

{

threshold:.2

}

);

animatedSections.forEach(section=>{

sectionObserver.observe(section);

});

/*==================================================
END OF PART 3
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    main.js
    Part 4
==================================================*/

/*==========================================
ANIMATED COUNTERS
==========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{threshold:0.5});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

function animateCounter(counter){

    const target = parseInt(counter.dataset.target);

    const duration = 2000;

    const step = target / (duration / 16);

    let current = 0;

    function update(){

        current += step;

        if(current < target){

            counter.textContent = Math.floor(current);

            requestAnimationFrame(update);

        }else{

            counter.textContent = target + "+";

        }

    }

    update();

}

/*==========================================
HERO FLOATING IMAGE
==========================================*/

const heroImage = document.querySelector(".hero-right img");

if(heroImage){

    heroImage.animate(

    [

        {

            transform:"translateY(0px)"

        },

        {

            transform:"translateY(-15px)"

        },

        {

            transform:"translateY(0px)"

        }

    ],

    {

        duration:3500,

        iterations:Infinity,

        easing:"ease-in-out"

    });

}

/*==========================================
MOUSE PARALLAX
==========================================*/

const heroSection = document.querySelector(".hero");

if(heroSection && heroImage){

    heroSection.addEventListener("mousemove",(e)=>{

        const x =

        (window.innerWidth/2 - e.clientX)/35;

        const y =

        (window.innerHeight/2 - e.clientY)/35;

        heroImage.style.transform =

        `translate(${x}px,${y}px)`;

    });

    heroSection.addEventListener("mouseleave",()=>{

        heroImage.style.transform =

        "translate(0,0)";

    });

}

/*==========================================
BUTTON RIPPLE EFFECT
==========================================*/

const buttons = document.querySelectorAll(

".primary-btn,.secondary-btn"

);

buttons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = button.getBoundingClientRect();

        ripple.style.left =

        (e.clientX-rect.left)+"px";

        ripple.style.top =

        (e.clientY-rect.top)+"px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==========================================
LAZY IMAGE FADE-IN
==========================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="scale(1)";

            imageObserver.unobserve(entry.target);

        }

    });

});

images.forEach(image=>{

    image.style.opacity="0";

    image.style.transform="scale(.95)";

    image.style.transition=".8s";

    imageObserver.observe(image);

});

/*==========================================
PERFORMANCE
==========================================*/

window.addEventListener(

"pageshow",

()=>{

    document.body.classList.add("loaded");

}

);

/*==================================================
END OF PART 4
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    main.js
    Part 5
==================================================*/

/*==========================================
THEME INITIALIZATION
==========================================*/

(function(){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        const icon = document.querySelector("#themeToggle i");

        if(icon){

            icon.className = "fas fa-sun";

        }

    }

})();

/*==========================================
KEYBOARD SHORTCUTS
==========================================*/

document.addEventListener("keydown",(e)=>{

    // Press "T" to toggle theme

    if(

        e.key.toLowerCase()==="t" &&

        document.activeElement.tagName!=="INPUT" &&

        document.activeElement.tagName!=="TEXTAREA"

    ){

        const btn=document.getElementById("themeToggle");

        if(btn){

            btn.click();

        }

    }

});

/*==========================================
PREVENT EMPTY LINKS
==========================================*/

document.querySelectorAll('a[href="#"]').forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

    });

});

/*==========================================
SCROLL RESTORATION
==========================================*/

if("scrollRestoration" in history){

    history.scrollRestoration="manual";

}

/*==========================================
NETWORK STATUS
==========================================*/

window.addEventListener("offline",()=>{

    console.warn("You are offline.");

});

window.addEventListener("online",()=>{

    console.log("Back online.");

});

/*==========================================
IMAGE ERROR HANDLER
==========================================*/

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", function () {

        console.warn("Image not found:", this.src);

    });

});

/*==========================================
UTILITY FUNCTIONS
==========================================*/

const Utils={

    qs:(selector)=>document.querySelector(selector),

    qsa:(selector)=>document.querySelectorAll(selector),

    addClass:(element,className)=>{

        if(element){

            element.classList.add(className);

        }

    },

    removeClass:(element,className)=>{

        if(element){

            element.classList.remove(className);

        }

    },

    toggleClass:(element,className)=>{

        if(element){

            element.classList.toggle(className);

        }

    }

};

/*==========================================
PAGE READY
==========================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    console.log(

        "%cKeshavi Graphics Website Loaded Successfully",

        "color:#0d6efd;font-size:16px;font-weight:bold;"

    );

});

/*==========================================
FINAL INITIALIZATION
==========================================*/

(function(){

    console.log("UI Initialized");

    console.log("Animations Ready");

    console.log("Responsive Layout Ready");

    console.log("JavaScript Loaded");

})();

/*==================================================
END OF main.js
==================================================*/
/*==========================================
FLOATING WHATSAPP
==========================================*/

const floatingWhatsApp = document.querySelector(".floating-whatsapp");

if(floatingWhatsApp){

    floatingWhatsApp.style.opacity = "0";

    floatingWhatsApp.style.transform = "translateY(40px)";

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 250){

            floatingWhatsApp.style.opacity = "1";

            floatingWhatsApp.style.transform = "translateY(0)";

        }

        else{

            floatingWhatsApp.style.opacity = "0";

            floatingWhatsApp.style.transform = "translateY(40px)";

        }

    });

}