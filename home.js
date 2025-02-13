// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    let enquiryNumber = 1;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            message: form.elements.message.value,
            enquiryNumber: enquiryNumber++
        };

        try {
            // Here you would typically send the data to your server
            // For demonstration, we'll just log it
            console.log('Form submitted:', formData);
            
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            showMessage('There was an error sending your message. Please try again.', 'error');
        }
    });
});

// Helper function to show messages
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.borderRadius = '0.5rem';
    messageDiv.style.textAlign = 'center';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#dcfce7';
        messageDiv.style.color = '#166534';
    } else {
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
    }

    const form = document.getElementById('contact-form');
    form.insertBefore(messageDiv, form.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});