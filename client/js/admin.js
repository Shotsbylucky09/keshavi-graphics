/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 1A
==================================================*/

"use strict";

/*==========================================
CONFIGURATION
==========================================*/

const ADMIN_CONFIG = {

    username: "admin",

    password: "Keshavi@2026",

    sessionKey: "keshavi_admin",

    sessionTime: 1000 * 60 * 60 * 3 // 3 Hours

};

/*==========================================
DOM ELEMENTS
==========================================*/

const loginForm =
document.getElementById("adminLoginForm");

const usernameInput =
document.getElementById("adminUsername");

const passwordInput =
document.getElementById("adminPassword");

const loginMessage =
document.getElementById("loginMessage");

const dashboard =
document.getElementById("adminDashboard");

const loginPage =
document.getElementById("adminLogin");

const logoutBtn =
document.getElementById("logoutBtn");

/*==========================================
HELPER
==========================================*/

function showMessage(message,color){

    if(!loginMessage) return;

    loginMessage.textContent = message;

    loginMessage.style.color = color;

}

/*==========================================
SESSION
==========================================*/

function saveSession(){

    const session={

        loggedIn:true,

        loginTime:Date.now()

    };

    localStorage.setItem(

        ADMIN_CONFIG.sessionKey,

        JSON.stringify(session)

    );

}

function removeSession(){

    localStorage.removeItem(

        ADMIN_CONFIG.sessionKey

    );

}

function getSession(){

    return JSON.parse(

        localStorage.getItem(

            ADMIN_CONFIG.sessionKey

        )

    );

}

/*==========================================
SESSION VALIDATION
==========================================*/

function isSessionValid(){

    const session=getSession();

    if(!session) return false;

    const now=Date.now();

    const elapsed=

    now-session.loginTime;

    if(

        elapsed>

        ADMIN_CONFIG.sessionTime

    ){

        removeSession();

        return false;

    }

    return true;

}

/*==========================================
LOGIN
==========================================*/

function login(){

    const username=

    usernameInput.value.trim();

    const password=

    passwordInput.value.trim();

    if(username===""){

        showMessage(

        "Enter username",

        "red"

        );

        usernameInput.focus();

        return;

    }

    if(password===""){

        showMessage(

        "Enter password",

        "red"

        );

        passwordInput.focus();

        return;

    }

    if(

        username===ADMIN_CONFIG.username

        &&

        password===ADMIN_CONFIG.password

    ){

        saveSession();

        showDashboard();

    }

    else{

        showMessage(

        "Invalid Credentials",

        "red"

        );

    }

}

/*==========================================
LOGIN FORM
==========================================*/

if(loginForm){

loginForm.addEventListener(

"submit",

(event)=>{

    event.preventDefault();

    login();

});

}

/*==========================================
SHOW DASHBOARD
==========================================*/

function showDashboard(){

    if(loginPage)

        loginPage.style.display="none";

    if(dashboard)

        dashboard.style.display="block";

}

/*==========================================
SHOW LOGIN
==========================================*/

function showLogin(){

    if(loginPage)

        loginPage.style.display="block";

    if(dashboard)

        dashboard.style.display="none";

}

/*==========================================
AUTO LOGIN
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    if(isSessionValid()){

        showDashboard();

    }

    else{

        showLogin();

    }

});

/*==================================================
END OF PART 1A
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 1B-1
==================================================*/

"use strict";

/*==========================================
LOGOUT
==========================================*/

function logout(){

    removeSession();

    showLogin();

    showToast(

        "Logged Out Successfully",

        "success"

    );

}

if(logoutBtn){

    logoutBtn.addEventListener(

        "click",

        logout

    );

}

/*==========================================
ROUTE PROTECTION
==========================================*/

function protectDashboard(){

    if(!isSessionValid()){

        removeSession();

        showLogin();

        return false;

    }

    return true;

}

/*==========================================
AUTO SESSION CHECK
==========================================*/

setInterval(()=>{

    protectDashboard();

},60000);


/*==========================================
PASSWORD TOGGLE
==========================================*/

const togglePassword =

document.getElementById(

"togglePassword"

);

if(togglePassword){

togglePassword.addEventListener(

"click",

()=>{

if(passwordInput.type==="password"){

passwordInput.type="text";

togglePassword.innerHTML=

'<i class="fas fa-eye-slash"></i>';

}

else{

passwordInput.type="password";

togglePassword.innerHTML=

'<i class="fas fa-eye"></i>';

}

});

}

/*==========================================
ENTER KEY LOGIN
==========================================*/

document.addEventListener(

"keydown",

(event)=>{

if(

event.key==="Enter"

&&

loginPage.style.display!=="none"

){

login();

}

});

/*==========================================
REMEMBER ME
==========================================*/

const rememberMe=

document.getElementById(

"rememberMe"

);

function saveRemember(){

if(!rememberMe) return;

if(rememberMe.checked){

localStorage.setItem(

"admin_username",

usernameInput.value

);

}

else{

localStorage.removeItem(

"admin_username"

);

}

}

function loadRemember(){

const username=

localStorage.getItem(

"admin_username"

);

if(username){

usernameInput.value=username;

if(rememberMe){

rememberMe.checked=true;

}

}

}

if(rememberMe){

rememberMe.addEventListener(

"change",

saveRemember

);

}

/*==========================================
FAILED LOGIN COUNTER
==========================================*/

let failedAttempts=0;

const MAX_ATTEMPTS=5;

function failedLogin(){

failedAttempts++;

if(failedAttempts>=MAX_ATTEMPTS){

showMessage(

"Too many failed attempts.",

"red"

);

usernameInput.disabled=true;

passwordInput.disabled=true;

setTimeout(()=>{

failedAttempts=0;

usernameInput.disabled=false;

passwordInput.disabled=false;

},30000);

}

}

/*==========================================
UPDATE LOGIN
==========================================*/

const oldLogin=login;

login=function(){

const username=

usernameInput.value.trim();

const password=

passwordInput.value.trim();

if(

username===ADMIN_CONFIG.username

&&

password===ADMIN_CONFIG.password

){

failedAttempts=0;

saveRemember();

saveSession();

showDashboard();

showToast(

"Welcome Admin",

"success"

);

}

else{

failedLogin();

showToast(

"Invalid Username or Password",

"error"

);

}

};

/*==========================================
END OF PART 1B-1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 1B-2A-1
==================================================*/

"use strict";

/*==========================================
TOAST NOTIFICATION ELEMENT
==========================================*/

const toastContainer =
document.getElementById("toastContainer");

/*==========================================
CREATE TOAST
==========================================*/

function createToast(type, message){

    if(!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    let icon = "";

    switch(type){

        case "success":
            icon = "fa-circle-check";
            break;

        case "error":
            icon = "fa-circle-xmark";
            break;

        case "warning":
            icon = "fa-triangle-exclamation";
            break;

        default:
            icon = "fa-circle-info";

    }

    toast.innerHTML = `

        <div class="toast-icon">

            <i class="fas ${icon}"></i>

        </div>

        <div class="toast-content">

            <p>${message}</p>

        </div>

        <button class="toast-close">

            <i class="fas fa-times"></i>

        </button>

    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    const timer = setTimeout(()=>{

        removeToast(toast);

    },4000);

    const closeBtn =
    toast.querySelector(".toast-close");

    closeBtn.addEventListener("click",()=>{

        clearTimeout(timer);

        removeToast(toast);

    });

}

/*==========================================
REMOVE TOAST
==========================================*/

function removeToast(toast){

    toast.classList.remove("show");

    setTimeout(()=>{

        toast.remove();

    },300);

}

/*==========================================
GLOBAL TOAST
==========================================*/

function showToast(message,type="success"){

    createToast(type,message);

}

/*==========================================
LAST LOGIN
==========================================*/

const lastLoginText =
document.getElementById("lastLogin");

function saveLastLogin(){

    localStorage.setItem(

        "admin_last_login",

        new Date().toLocaleString()

    );

}

function loadLastLogin(){

    if(!lastLoginText) return;

    const last =

    localStorage.getItem(

        "admin_last_login"

    );

    if(last){

        lastLoginText.textContent = last;

    }

    else{

        lastLoginText.textContent =

        "First Login";

    }

}

/*==========================================
HELPER
==========================================*/

function formatDate(date){

    return new Date(date)

    .toLocaleDateString(

        "en-IN",

        {

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

}

function formatTime(date){

    return new Date(date)

    .toLocaleTimeString(

        "en-IN",

        {

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/*==========================================
COPY TO CLIPBOARD
==========================================*/

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast(

            "Copied Successfully",

            "success"

        );

    }

    catch{

        showToast(

            "Copy Failed",

            "error"

        );

    }

}

/*==========================================
CONFIRM DIALOG
==========================================*/

function confirmAction(message){

    return window.confirm(message);

}

/*==========================================
SUCCESS SOUND
==========================================*/

function playSuccessSound(){

    const audio =

    new Audio(

        "assets/audio/success.mp3"

    );

    audio.volume = 0.25;

    audio.play().catch(()=>{});

}

/*==========================================
ERROR SOUND
==========================================*/

function playErrorSound(){

    const audio =

    new Audio(

        "assets/audio/error.mp3"

    );

    audio.volume = 0.25;

    audio.play().catch(()=>{});

}

/*==========================================
END OF PART 1B-2A-1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 1B-2A-2A-1
==================================================*/

"use strict";

/*==========================================
DASHBOARD SELECTORS
==========================================*/

const totalProjectsCard =
document.getElementById("totalProjects");

const totalReviewsCard =
document.getElementById("totalReviews");

const totalVisitorsCard =
document.getElementById("totalVisitors");

const averageRatingCard =
document.getElementById("averageRatingCard");

const recentLoginCard =
document.getElementById("recentLogin");

const dashboardDate =
document.getElementById("dashboardDate");

/*==========================================
LOCAL STORAGE KEYS
==========================================*/

const STORAGE_KEYS = {

    PROJECTS : "keshavi_projects",

    REVIEWS  : "reviews",

    VISITORS : "visitor_count",

    LAST_LOGIN : "admin_last_login"

};

/*==========================================
LOCAL STORAGE HELPERS
==========================================*/

function getStorage(key){

    try{

        return JSON.parse(

            localStorage.getItem(key)

        ) || [];

    }

    catch{

        return [];

    }

}

function setStorage(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

/*==========================================
GET PROJECT COUNT
==========================================*/

function getProjectCount(){

    const projects =

    getStorage(

        STORAGE_KEYS.PROJECTS

    );

    return projects.length;

}

/*==========================================
GET REVIEW COUNT
==========================================*/

function getReviewCount(){

    const reviews =

    getStorage(

        STORAGE_KEYS.REVIEWS

    );

    return reviews.length;

}

/*==========================================
VISITOR COUNTER
==========================================*/

function getVisitorCount(){

    let visitors = Number(

        localStorage.getItem(

            STORAGE_KEYS.VISITORS

        )

    );

    if(isNaN(visitors)){

        visitors = 0;

    }

    return visitors;

}

function increaseVisitorCount(){

    let visitors =

    getVisitorCount();

    visitors++;

    localStorage.setItem(

        STORAGE_KEYS.VISITORS,

        visitors

    );

}

/*==========================================
AVERAGE RATING
==========================================*/

function calculateAverageRating(){

    const reviews =

    getStorage(

        STORAGE_KEYS.REVIEWS

    );

    if(reviews.length===0)

        return "0.0";

    const total =

    reviews.reduce(

        (sum,item)=>sum+item.rating,

        0

    );

    return (

        total /

        reviews.length

    ).toFixed(1);

}

/*==========================================
RECENT LOGIN
==========================================*/

function getRecentLogin(){

    const login =

    localStorage.getItem(

        STORAGE_KEYS.LAST_LOGIN

    );

    return login || "No Login Found";

}

/*==========================================
TODAY DATE
==========================================*/

function getCurrentDate(){

    return new Date()

    .toLocaleDateString(

        "en-IN",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}

/*==========================================
UPDATE DASHBOARD CARDS
==========================================*/

function updateDashboardCards(){

    if(totalProjectsCard){

        totalProjectsCard.textContent =

        getProjectCount();

    }

    if(totalReviewsCard){

        totalReviewsCard.textContent =

        getReviewCount();

    }

    if(totalVisitorsCard){

        totalVisitorsCard.textContent =

        getVisitorCount();

    }

    if(averageRatingCard){

        averageRatingCard.textContent =

        calculateAverageRating();

    }

    if(recentLoginCard){

        recentLoginCard.textContent =

        getRecentLogin();

    }

    if(dashboardDate){

        dashboardDate.textContent =

        getCurrentDate();

    }

}

/*==========================================
END OF PART 1B-2A-2A-1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 1B-2A-2A-2
==================================================*/

"use strict";

/*==========================================
RECENT ACTIVITY
==========================================*/

const activityContainer =
document.getElementById("recentActivity");

/*==========================================
ACTIVITY STORAGE
==========================================*/

function getActivities(){

    return JSON.parse(

        localStorage.getItem(

            "admin_activity"

        )

    ) || [];

}

function saveActivity(text){

    const activities =

    getActivities();

    activities.unshift({

        id:Date.now(),

        text:text,

        time:new Date().toLocaleString()

    });

    if(activities.length>15){

        activities.pop();

    }

    localStorage.setItem(

        "admin_activity",

        JSON.stringify(activities)

    );

}

/*==========================================
RENDER ACTIVITIES
==========================================*/

function renderActivities(){

    if(!activityContainer) return;

    const activities =

    getActivities();

    activityContainer.innerHTML="";

    if(activities.length===0){

        activityContainer.innerHTML=`

        <p>No Recent Activity</p>

        `;

        return;

    }

    activities.forEach(activity=>{

        const item=document.createElement("div");

        item.className="activity-item";

        item.innerHTML=`

            <h4>${activity.text}</h4>

            <small>${activity.time}</small>

        `;

        activityContainer.appendChild(item);

    });

}

/*==========================================
REFRESH DASHBOARD
==========================================*/

function refreshDashboard(){

    updateDashboardCards();

    renderActivities();

}

/*==========================================
AUTO REFRESH
==========================================*/

let dashboardRefresh =

setInterval(()=>{

    if(protectDashboard()){

        refreshDashboard();

    }

},30000);

/*==========================================
CHART DATA
==========================================*/

function dashboardChartData(){

    return{

        projects:getProjectCount(),

        reviews:getReviewCount(),

        visitors:getVisitorCount(),

        rating:calculateAverageRating()

    };

}

/*==========================================
EXPORT DASHBOARD
==========================================*/

function exportDashboard(){

    const data = {

        generated:new Date(),

        statistics:dashboardChartData(),

        activities:getActivities()

    };

    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href=url;

    link.download="dashboard-report.json";

    link.click();

}

/*==========================================
RESET DASHBOARD
==========================================*/

function resetDashboard(){

    if(!confirm(

        "Reset dashboard statistics?"

    )) return;

    localStorage.removeItem(

        STORAGE_KEYS.VISITORS

    );

    localStorage.removeItem(

        "admin_activity"

    );

    refreshDashboard();

    showToast(

        "Dashboard Reset",

        "success"

    );

}

/*==========================================
PERFORMANCE
==========================================*/

function dashboardPerformance(){

    console.log(

        "Dashboard Updated",

        new Date()

    );

}

/*==========================================
INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    updateDashboardCards();

    renderActivities();

    dashboardPerformance();

    loadRemember();

    loadLastLogin();

});

/*==========================================
SAVE LOGIN ACTIVITY
==========================================*/

saveActivity(

"Administrator Logged In"

);

/*==================================================
END OF PART 1B-2A-2A-2
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    admin.js
    Part 2A
    Portfolio Upload System
==================================================*/

"use strict";

/*==========================================
PORTFOLIO FORM
==========================================*/

const portfolioForm =
document.getElementById("portfolioForm");

const projectTitle =
document.getElementById("projectTitle");

const projectCategory =
document.getElementById("projectCategory");

const projectDescription =
document.getElementById("projectDescription");

const projectImage =
document.getElementById("projectImage");

const imagePreview =
document.getElementById("projectPreview");

const projectTable =
document.getElementById("projectTableBody");

const searchProject =
document.getElementById("searchProject");

/*==========================================
PROJECT STORAGE
==========================================*/

const PROJECT_STORAGE =
"keshavi_projects";

let projects =
JSON.parse(

localStorage.getItem(

PROJECT_STORAGE

)

) || [];

/*==========================================
IMAGE PREVIEW
==========================================*/

if(projectImage){

projectImage.addEventListener(

"change",

(event)=>{

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload=function(e){

imagePreview.src =
e.target.result;

imagePreview.style.display=
"block";

}

reader.readAsDataURL(file);

});

}

/*==========================================
VALIDATION
==========================================*/

function validateProject(){

if(projectTitle.value.trim()===""){

showToast(

"Project title required",

"error"

);

projectTitle.focus();

return false;

}

if(projectDescription.value.trim()===""){

showToast(

"Description required",

"error"

);

projectDescription.focus();

return false;

}

if(projectCategory.value===""){

showToast(

"Select category",

"warning"

);

return false;

}

return true;

}

/*==========================================
SAVE
==========================================*/

function saveProjects(){

localStorage.setItem(

PROJECT_STORAGE,

JSON.stringify(projects)

);

}

/*==========================================
PROJECT OBJECT
==========================================*/

function createProject(image){

return{

id:Date.now(),

title:

projectTitle.value.trim(),

category:

projectCategory.value,

description:

projectDescription.value.trim(),

image:image,

created:

new Date()

};

}

/*==========================================
CLEAR FORM
==========================================*/

function clearProjectForm(){

portfolioForm.reset();

imagePreview.src="";

imagePreview.style.display="none";

}

/*==========================================
UPLOAD PROJECT
==========================================*/

if(portfolioForm){

portfolioForm.addEventListener(

"submit",

(event)=>{

event.preventDefault();

if(!validateProject())

return;

if(projectImage.files.length){

const reader=
new FileReader();

reader.onload=function(e){

const project=

createProject(

e.target.result

);

projects.push(project);

saveProjects();

renderProjects();

clearProjectForm();

showToast(

"Project Uploaded",

"success"

);

saveActivity(

"New Project Uploaded"

);

}

reader.readAsDataURL(

projectImage.files[0]

);

}

else{

const project=

createProject(

"assets/images/no-image.png"

);

projects.push(project);

saveProjects();

renderProjects();

clearProjectForm();

showToast(

"Project Uploaded",

"success"

);

}

});

}