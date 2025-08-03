// Toggle for impact-category-collapsible
function toggleImpactCategory(section) {
    let content, btn, icon;
    if (!section) {
        // Default: Faculty of Law
        content = document.querySelector('.impact-category-content');
        btn = document.querySelector('.collapsible-toggle');
    } else {
        content = document.getElementById('impact-' + section);
        btn = content ? content.previousElementSibling : null;
    }
    if (!content || !btn) return;
    icon = btn.querySelector('.toggle-icon');
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    if (!expanded) {
        content.style.display = 'block';
        btn.setAttribute('aria-expanded', 'true');
        icon.textContent = '−';
    } else {
        content.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        icon.textContent = '+';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero Slideshow Functionality
    const heroSlideshowImages = document.querySelectorAll('.hero-slideshow-image');
    let currentHeroImageIndex = 0;

    function showNextHeroImage() {
        // Remove active class from current image
        heroSlideshowImages[currentHeroImageIndex].classList.remove('active');

        // Increment index, loop back to start if at the end
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroSlideshowImages.length;

        // Add active class to the next image
        heroSlideshowImages[currentHeroImageIndex].classList.add('active');
    }

    // Start slideshow after a delay
    setInterval(showNextHeroImage, 5000); // Change image every 5 seconds

    // Optional: Add a subtle parallax to the active hero slideshow image
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        const activeImage = document.querySelector('.hero-slideshow-image.active');
        if (activeImage) {
            activeImage.style.transform = `scale(1.05) translateY(${scrollPos * 0.2}px)`; // Adjust 0.2 for speed
        }
    });

    // Carousel for About Section
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = document.querySelectorAll('.photo-carousel img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    // Get width of one image dynamically, consider margin/gap if present
    const getCarouselImageWidth = () => carouselImages[0] ? carouselImages[0].offsetWidth : 0;
    let imageWidth = getCarouselImageWidth();

    function updateCarousel() {
        if (!carouselTrack) return;
        imageWidth = getCarouselImageWidth(); // Re-calculate on update
        carouselTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel); // Update carousel on window resize

        // Auto-advance carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            updateCarousel();
        }, 5000); // Change image every 5 seconds
    }

    // Agenda Accordion
    const agendaTitles = document.querySelectorAll('.agenda-title');
    agendaTitles.forEach(title => {
        title.addEventListener('click', () => {
            const parent = title.parentElement;
            // Close other open accordions
            document.querySelectorAll('.agenda-point.active').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                    item.querySelector('.agenda-details').style.maxHeight = '0';
                }
            });

            parent.classList.toggle('active');

            const details = parent.querySelector('.agenda-details');
            if (parent.classList.contains('active')) {
                details.style.maxHeight = details.scrollHeight + 'px'; // Expand to content height
            } else {
                details.style.maxHeight = '0';
            }
        });
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter; // Get data-filter value

            galleryImages.forEach(img => {
                const category = img.dataset.category;
                if (filter === 'all' || category === filter) {
                    img.style.display = 'block'; // Show image
                    img.style.animation = 'fadeIn 0.5s ease-out'; // Add fade-in animation
                    img.style.animationFillMode = 'forwards'; // Keep end state
                } else {
                    img.style.display = 'none'; // Hide image
                    img.style.animation = ''; // Remove animation
                }
            });
        });
    });

    // Lightbox Functionality for Gallery Images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Show lightbox
            lightboxImg.src = img.src; // Set image source
            lightboxCaption.textContent = img.alt; // Set caption
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none'; // Hide lightbox
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Close if clicking outside image
            lightbox.style.display = 'none';
        }
    });

    // Highlight Item Video Play
    document.querySelectorAll('.highlight-item.video-placeholder').forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.dataset.videoSrc;
            if (videoSrc) {
                // Create an iframe and embed the video
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoSrc + '?autoplay=1');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
                iframe.setAttribute('allowfullscreen', '');
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';

                // Replace the image and play button with the iframe
                this.innerHTML = ''; // Clear existing content
                this.appendChild(iframe);
            }
        });
    });

    // Testimonials Carousel
    const testimonialCarouselContainer = document.querySelector('.endorsements-carousel'); // Renamed to avoid conflict
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrevBtn = document.querySelector('.testimonial-button.prev');
    const testimonialNextBtn = document.querySelector('.testimonial-button.next');
    let currentTestimonialIndex = 0;

    // Function to calculate and update testimonial carousel position
    function updateTestimonialCarousel() {
        if (!testimonialCarouselContainer || testimonialItems.length === 0) return;

        // Get the width of a single testimonial item, including its margin
        // Assuming margin-right is 20px as per CSS
        const itemWidth = testimonialItems[0].offsetWidth + 20;
        testimonialCarouselContainer.style.transform = `translateX(-${currentTestimonialIndex * itemWidth}px)`;
    }

    if (testimonialPrevBtn && testimonialNextBtn) {
        testimonialNextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            updateTestimonialCarousel();
        });

        testimonialPrevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateTestimonialCarousel();
        });

        window.addEventListener('resize', updateTestimonialCarousel); // Recalculate and update on resize

        // Initial update to ensure correct positioning
        updateTestimonialCarousel();

        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            updateTestimonialCarousel();
        }, 7000); // Change testimonial every 7 seconds
    }
});

// Simple CSS for the fade-in animation (add to style.css if not already present)
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }