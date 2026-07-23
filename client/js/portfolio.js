document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.getElementById("portfolioGrid");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // 1. Fetch Projects from your Backend
    async function fetchProjects() {
        try {
            // Show a temporary loading state
            portfolioGrid.innerHTML = '<p style="text-align:center; width:100%; color: var(--text-muted);">Loading projects...</p>';

            const response = await fetch("https://keshavi-backend.onrender.com/projects");
            const data = await response.json();

            if (data.success && data.projects.length > 0) {
                renderProjects(data.projects);
            } else {
                portfolioGrid.innerHTML = '<p style="text-align:center; width:100%; color: var(--text-muted);">No projects found.</p>';
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            portfolioGrid.innerHTML = '<p style="text-align:center; width:100%; color: var(--danger);">Failed to load projects. Ensure the server is running on Port 5000.</p>';
        }
    }

    // 2. Render Projects into the HTML Grid
    function renderProjects(projects) {
        portfolioGrid.innerHTML = ""; // Clear out the hardcoded HTML placeholders

        projects.forEach(project => {
            // Format category string (e.g., "logo" -> "Logo")
            const displayCategory = project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : "Design";

            // Create the card container matching your index.html structure
            const card = document.createElement("div");
            card.className = "portfolio-card";
            card.setAttribute("data-category", project.category || "all");

            // Inject the data from Firebase/Cloudinary
            card.innerHTML = `
                <div class="portfolio-image">
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <div class="portfolio-overlay">
                        <button class="view-project" 
                            data-img="${project.imageUrl}" 
                            data-title="${project.title}" 
                            data-category="${displayCategory}" 
                            data-desc="${project.description}">
                            View Project
                        </button>
                    </div>
                </div>
                <div class="portfolio-content">
                    <span>${displayCategory}</span>
                    <h3>${project.title}</h3>
                </div>
            `;

            portfolioGrid.appendChild(card);
        });

        // Re-initialize interactive features for the newly created cards
        setupFilters();
        setupLightbox();
    }

    // 3. Setup Category Filtering
    function setupFilters() {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                // Handle Active Button State
                filterBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");

                // Filter Cards
                const filterValue = this.getAttribute("data-filter");
                const allCards = document.querySelectorAll(".portfolio-card");

                allCards.forEach(card => {
                    if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                        card.style.display = "block"; // Show match
                    } else {
                        card.style.display = "none";  // Hide mismatch
                    }
                });
            });
        });
    }

    // 4. Setup Lightbox for Dynamic Images
    function setupLightbox() {
        const viewBtns = document.querySelectorAll(".view-project");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightboxImage");
        const lightboxTitle = document.getElementById("lightboxTitle");
        const lightboxCat = document.getElementById("lightboxCategory");
        const lightboxDesc = document.getElementById("lightboxDescription");
        const closeBtn = document.getElementById("closeLightbox");

        viewBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                // Populate lightbox with data from the clicked button
                lightboxImg.src = this.getAttribute("data-img");
                lightboxTitle.textContent = this.getAttribute("data-title");
                lightboxCat.textContent = this.getAttribute("data-category");
                lightboxDesc.textContent = this.getAttribute("data-desc");
                
                // Show Lightbox (Assuming your CSS handles .active or display:flex)
                lightbox.style.display = "flex"; 
            });
        });

        // Close Lightbox button
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                lightbox.style.display = "none";
            });
        }

        // Close when clicking outside the image
        if (lightbox) {
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = "none";
                }
            });
        }
    }

    // Start the process when the script loads
    fetchProjects();
});