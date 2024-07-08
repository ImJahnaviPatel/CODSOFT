// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.05)';
            box.style.transition = 'transform 0.3s ease';
        });
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1)';
        });
    });
});