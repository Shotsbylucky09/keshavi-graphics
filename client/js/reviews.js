/*==================================================
    KESHAVI GRAPHICS
    reviews.js
    Part 1
==================================================*/

"use strict";

/*==========================================
DOM ELEMENTS
==========================================*/

const reviewForm =
document.getElementById("reviewForm");

const reviewContainer =
document.getElementById("reviewContainer");

const reviewName =
document.getElementById("reviewName");

const reviewRating =
document.getElementById("reviewRating");

const reviewMessage =
document.getElementById("reviewMessage");

const reviewImage =
document.getElementById("reviewImage");

const imagePreview =
document.getElementById("imagePreview");

const averageRating =
document.getElementById("averageRating");

/*==========================================
REVIEW DATA
==========================================*/

let reviews = JSON.parse(

localStorage.getItem("reviews")

) || [];

/*==========================================
IMAGE PREVIEW
==========================================*/

if(reviewImage){

reviewImage.addEventListener("change",(event)=>{

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        imagePreview.src=e.target.result;

        imagePreview.style.display="block";

    }

    reader.readAsDataURL(file);

});

}

/*==========================================
VALIDATION
==========================================*/

function validateReview(){

    if(reviewName.value.trim()===""){

        alert("Please enter your name.");

        reviewName.focus();

        return false;

    }

    if(reviewMessage.value.trim()===""){

        alert("Please write your review.");

        reviewMessage.focus();

        return false;

    }

    if(reviewMessage.value.length<15){

        alert("Review is too short.");

        reviewMessage.focus();

        return false;

    }

    return true;

}

/*==========================================
GENERATE REVIEW OBJECT
==========================================*/

function createReviewObject(imageURL){

    return{

        id:Date.now(),

        name:reviewName.value.trim(),

        rating:Number(reviewRating.value),

        message:reviewMessage.value.trim(),

        image:imageURL,

        likes:0,

        created:new Date().toISOString()

    };

}

/*==========================================
SAVE REVIEW
==========================================*/

function saveReviews(){

    localStorage.setItem(

        "reviews",

        JSON.stringify(reviews)

    );

}

/*==========================================
CLEAR FORM
==========================================*/

function clearForm(){

    reviewForm.reset();

    imagePreview.src="";

    imagePreview.style.display="none";

}

/*==========================================
SUBMIT REVIEW
==========================================*/

if(reviewForm){

reviewForm.addEventListener("submit",(event)=>{

    event.preventDefault();

    if(!validateReview()) return;

    if(reviewImage.files.length>0){

        const file=reviewImage.files[0];

        const reader=new FileReader();

        reader.onload=function(e){

            const review=createReviewObject(

                e.target.result

            );

            reviews.push(review);

            saveReviews();

            renderReviews();

            updateAverageRating();

            clearForm();

        };

        reader.readAsDataURL(file);

    }

    else{

        const review=createReviewObject(

            "assets/images/default-user.png"

        );

        reviews.push(review);

        saveReviews();

        renderReviews();

        updateAverageRating();

        clearForm();

    }

});

}

/*==========================================
PLACEHOLDER FUNCTIONS
==========================================*/

function renderReviews(){

    // Part 2

}

function updateAverageRating(){

    // Part 2

}

/*==========================================
INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    renderReviews();

    updateAverageRating();

}

);

/*==================================================
END OF PART 1
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    reviews.js
    Part 2
==================================================*/

/*==========================================
SORT REVIEWS
5 Star → 1 Star
Newest First
==========================================*/

function sortReviews() {

    reviews.sort((a, b) => {

        if (b.rating === a.rating) {

            return new Date(b.created) - new Date(a.created);

        }

        return b.rating - a.rating;

    });

}

/*==========================================
GENERATE STARS
==========================================*/

function generateStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;

}

/*==========================================
AVERAGE RATING
==========================================*/

function updateAverageRating() {

    if (!averageRating) return;

    if (reviews.length === 0) {

        averageRating.innerHTML = "No Reviews Yet";

        return;

    }

    const total = reviews.reduce((sum, review) => {

        return sum + review.rating;

    }, 0);

    const average = (total / reviews.length).toFixed(1);

    averageRating.innerHTML = `

        <h3>${average} / 5.0</h3>

        <p>${generateStars(Math.round(average))}</p>

        <small>${reviews.length} Reviews</small>

    `;

}

/*==========================================
RATING COUNTS
==========================================*/

function getRatingCount(star) {

    return reviews.filter(review => review.rating === star).length;

}

/*==========================================
RATING SUMMARY
==========================================*/

function getRatingSummary() {

    return {

        five: getRatingCount(5),

        four: getRatingCount(4),

        three: getRatingCount(3),

        two: getRatingCount(2),

        one: getRatingCount(1)

    };

}

/*==========================================
RENDER REVIEWS
==========================================*/

function renderReviews() {

    if (!reviewContainer) return;

    sortReviews();

    reviewContainer.innerHTML = "";

    if (reviews.length === 0) {

        reviewContainer.innerHTML = `

            <div class="empty-review">

                <h3>No Reviews Available</h3>

                <p>Be the first customer to leave a review.</p>

            </div>

        `;

        return;

    }

    reviews.forEach(review => {

        const card = document.createElement("div");

        card.className = "review-card";

        card.dataset.id = review.id;

        card.innerHTML = `

            <div class="review-header">

                <img src="${review.image}" alt="${review.name}">

                <div>

                    <h4>${review.name}</h4>

                    <span class="stars">

                        ${generateStars(review.rating)}

                    </span>

                </div>

            </div>

            <p>${review.message}</p>

            <div class="review-footer">

                <small>

                    ${new Date(review.created).toLocaleDateString()}

                </small>

                <button

                    class="like-btn"

                    data-id="${review.id}"

                >

                    ❤️ ${review.likes}

                </button>

            </div>

        `;

        reviewContainer.appendChild(card);

    });

}

/*==========================================
RATING DASHBOARD
==========================================*/

function updateDashboard() {

    const stats = getRatingSummary();

    console.table(stats);

}

/*==========================================
REFRESH UI
==========================================*/

function refreshReviews() {

    renderReviews();

    updateAverageRating();

    updateDashboard();

}

/*==========================================
UPDATE ON PAGE LOAD
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    refreshReviews();

});

/*==================================================
END OF PART 2
==================================================*/
/*==================================================
    KESHAVI GRAPHICS
    reviews.js
    Part 3
==================================================*/

"use strict";

/*==========================================
SEARCH REVIEW
==========================================*/

const reviewSearch =
document.getElementById("reviewSearch");

if(reviewSearch){

reviewSearch.addEventListener("keyup",()=>{

    const keyword =
    reviewSearch.value.toLowerCase();

    const filtered = reviews.filter(review=>{

        return(

            review.name
            .toLowerCase()
            .includes(keyword)

            ||

            review.message
            .toLowerCase()
            .includes(keyword)

        );

    });

    renderFilteredReviews(filtered);

});

}

/*==========================================
RENDER FILTERED REVIEWS
==========================================*/

function renderFilteredReviews(data){

    reviewContainer.innerHTML="";

    if(data.length===0){

        reviewContainer.innerHTML=`

        <div class="empty-review">

            <h3>No Matching Reviews</h3>

        </div>

        `;

        return;

    }

    data.forEach(review=>{

        createReviewCard(review);

    });

}

/*==========================================
CREATE REVIEW CARD
==========================================*/

function createReviewCard(review){

    const card=document.createElement("div");

    card.className="review-card";

    card.dataset.id=review.id;

    card.innerHTML=`

    <div class="review-header">

        <img src="${review.image}">

        <div>

            <h4>${review.name}</h4>

            <span class="stars">

                ${generateStars(review.rating)}

            </span>

        </div>

    </div>

    <p>${review.message}</p>

    <div class="review-footer">

        <small>

        ${new Date(review.created)
        .toLocaleDateString()}

        </small>

        <button
        class="like-btn"
        data-id="${review.id}">

        ❤️ ${review.likes}

        </button>

    </div>

    `;

    reviewContainer.appendChild(card);

}

/*==========================================
LIKE SYSTEM
==========================================*/

document.addEventListener("click",event=>{

    if(event.target.classList.contains("like-btn")){

        const id=
        Number(event.target.dataset.id);

        const review=
        reviews.find(r=>r.id===id);

        if(review){

            review.likes++;

            saveReviews();

            refreshReviews();

        }

    }

});

/*==========================================
DELETE REVIEW
(Admin Ready)
==========================================*/

function deleteReview(id){

    reviews=

    reviews.filter(

        review=>review.id!==id

    );

    saveReviews();

    refreshReviews();

}

/*==========================================
EDIT REVIEW
(Admin Ready)
==========================================*/

function editReview(id,newMessage,newRating){

    const review=

    reviews.find(

        r=>r.id===id

    );

    if(!review) return;

    review.message=newMessage;

    review.rating=newRating;

    saveReviews();

    refreshReviews();

}

/*==========================================
PAGINATION
==========================================*/

const reviewsPerPage=6;

let currentPage=1;

function paginateReviews(){

    const start=

    (currentPage-1)

    *reviewsPerPage;

    const end=

    start+reviewsPerPage;

    return reviews.slice(start,end);

}

/*==========================================
LOAD PAGE
==========================================*/

function loadReviewPage(){

    reviewContainer.innerHTML="";

    paginateReviews().forEach(review=>{

        createReviewCard(review);

    });

}

/*==========================================
NEXT PAGE
==========================================*/

function nextPage(){

    if(

    currentPage

    <

    Math.ceil(

    reviews.length/

    reviewsPerPage

    )

    ){

        currentPage++;

        loadReviewPage();

    }

}

/*==========================================
PREVIOUS PAGE
==========================================*/

function previousPage(){

    if(currentPage>1){

        currentPage--;

        loadReviewPage();

    }

}

/*==========================================
EXPORT REVIEWS
==========================================*/

function exportReviews(){

    const data=

    JSON.stringify(

    reviews,

    null,

    2

    );

    const blob=

    new Blob(

    [data],

    {

    type:"application/json"

    }

    );

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="reviews.json";

    a.click();

}

/*==========================================
CLEAR ALL REVIEWS
(Admin Only)
==========================================*/

function clearReviews(){

    if(

    !confirm(

    "Delete all reviews?"

    )

    )

    return;

    reviews=[];

    saveReviews();

    refreshReviews();

}

/*==========================================
UTILITY
==========================================*/

function findReview(id){

    return reviews.find(

    review=>review.id===id

    );

}

/*==========================================
REFRESH
==========================================*/

function refreshReviews(){

    sortReviews();

    loadReviewPage();

    updateAverageRating();

    updateDashboard();

}

/*==========================================
INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    refreshReviews();

});

/*==================================================
END OF reviews.js
==================================================*/