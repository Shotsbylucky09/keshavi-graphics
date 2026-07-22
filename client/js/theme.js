/*==================================================
    KESHAVI GRAPHICS
    theme.js
    Part 1
==================================================*/

"use strict";

/*==========================================
DOM ELEMENTS
==========================================*/

const themeToggle =
document.getElementById("themeToggle");

const body =
document.body;

const themeIcon =
document.querySelector("#themeToggle i");

/*==========================================
THEME STORAGE KEY
==========================================*/

const THEME_KEY = "keshavi_theme";

/*==========================================
AVAILABLE THEMES
==========================================*/

const THEMES = {

    LIGHT:"light",

    DARK:"dark"

};

/*==========================================
SAVE THEME
==========================================*/

function saveTheme(theme){

    localStorage.setItem(

        THEME_KEY,

        theme

    );

}

/*==========================================
GET SAVED THEME
==========================================*/

function getTheme(){

    return localStorage.getItem(

        THEME_KEY

    );

}

/*==========================================
SET ICON
==========================================*/

function updateIcon(theme){

    if(!themeIcon) return;

    themeIcon.className =

    theme===THEMES.DARK

    ?

    "fas fa-sun"

    :

    "fas fa-moon";

}

/*==========================================
ENABLE DARK MODE
==========================================*/

function enableDarkMode(){

    body.classList.add("dark");

    saveTheme(

        THEMES.DARK

    );

    updateIcon(

        THEMES.DARK

    );

}

/*==========================================
ENABLE LIGHT MODE
==========================================*/

function enableLightMode(){

    body.classList.remove("dark");

    saveTheme(

        THEMES.LIGHT

    );

    updateIcon(

        THEMES.LIGHT

    );

}

/*==========================================
TOGGLE
==========================================*/

function toggleTheme(){

    if(

        body.classList.contains(

            "dark"

        )

    ){

        enableLightMode();

    }

    else{

        enableDarkMode();

    }

}

/*==========================================
BUTTON
==========================================*/

if(themeToggle){

themeToggle.addEventListener(

"click",

toggleTheme

);

}

/*==========================================
SYSTEM THEME
==========================================*/

function detectSystemTheme(){

    return window.matchMedia(

        "(prefers-color-scheme: dark)"

    ).matches

    ?

    THEMES.DARK

    :

    THEMES.LIGHT;

}

/*==========================================
LOAD THEME
==========================================*/

function loadTheme(){

    const saved = getTheme();

    if(saved){

        saved===THEMES.DARK

        ?

        enableDarkMode()

        :

        enableLightMode();

    }

    else{

        detectSystemTheme()

        ===THEMES.DARK

        ?

        enableDarkMode()

        :

        enableLightMode();

    }

}

/*==========================================
SYSTEM CHANGE
==========================================*/

window.matchMedia(

"(prefers-color-scheme: dark)"

)

.addEventListener(

"change",

(event)=>{

if(getTheme()) return;

event.matches

?

enableDarkMode()

:

enableLightMode();

}

);

/*==========================================
INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

loadTheme();

});

/*==================================================
END OF PART 1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    theme.js
    Part 2
==================================================*/

"use strict";

/*==========================================
ACCENT COLOR
==========================================*/

const colorButtons =
document.querySelectorAll("[data-color]");

const root =
document.documentElement;

const COLOR_KEY =
"keshavi_accent";

function applyAccent(color){

    root.style.setProperty(

        "--primary",

        color

    );

    localStorage.setItem(

        COLOR_KEY,

        color

    );

}

function loadAccent(){

    const saved =

    localStorage.getItem(

        COLOR_KEY

    );

    if(saved){

        applyAccent(saved);

    }

}

colorButtons.forEach(button=>{

button.addEventListener("click",()=>{

applyAccent(

button.dataset.color

);

});

});

/*==========================================
RESET THEME
==========================================*/

const resetTheme =
document.getElementById("resetTheme");

function resetAppearance(){

    localStorage.removeItem(

        THEME_KEY

    );

    localStorage.removeItem(

        COLOR_KEY

    );

    root.style.removeProperty(

        "--primary"

    );

    loadTheme();

}

if(resetTheme){

resetTheme.addEventListener(

"click",

()=>{

resetAppearance();

showThemeMessage(

"Theme Reset"

);

}

);

}

/*==========================================
SMOOTH TRANSITION
==========================================*/

function enableTransitions(){

    body.classList.add(

        "theme-transition"

    );

    setTimeout(()=>{

        body.classList.remove(

            "theme-transition"

        );

    },400);

}

/*==========================================
THEME MESSAGE
==========================================*/

function showThemeMessage(text){

    const message =

    document.createElement("div");

    message.className=

    "theme-toast";

    message.innerHTML=`

        <i class="fas fa-palette"></i>

        <span>${text}</span>

    `;

    document.body.appendChild(

        message

    );

    setTimeout(()=>{

        message.classList.add(

            "show"

        );

    },100);

    setTimeout(()=>{

        message.classList.remove(

            "show"

        );

        setTimeout(()=>{

            message.remove();

        },300);

    },2500);

}

/*==========================================
UPDATE TOGGLE
==========================================*/

if(themeToggle){

themeToggle.addEventListener(

"click",

()=>{

enableTransitions();

showThemeMessage(

body.classList.contains("dark")

?

"Dark Mode Enabled"

:

"Light Mode Enabled"

);

});

}

/*==========================================
AUTO MODE
==========================================*/

const autoTheme =
document.getElementById("autoTheme");

if(autoTheme){

autoTheme.addEventListener(

"click",

()=>{

localStorage.removeItem(

THEME_KEY

);

loadTheme();

showThemeMessage(

"Auto Theme Enabled"

);

});

}

/*==========================================
PREFERS COLOR SCHEME
==========================================*/

const media =

window.matchMedia(

"(prefers-color-scheme: dark)"

);

media.addEventListener(

"change",

()=>{

if(

localStorage.getItem(

THEME_KEY

)

) return;

loadTheme();

});

/*==========================================
KEYBOARD SHORTCUT
Ctrl + D
==========================================*/

document.addEventListener(

"keydown",

(event)=>{

if(

event.ctrlKey

&&

event.key.toLowerCase()==="d"

){

event.preventDefault();

toggleTheme();

}

});

/*==========================================
INITIALIZATION
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

loadTheme();

loadAccent();

});

/*==================================================
END OF theme.js
==================================================*/