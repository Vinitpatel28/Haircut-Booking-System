// Utility function to safely query elements
function getElement(selector) {
    return document.querySelector(selector);
}

// Utility function to handle form submission
function handleFormSubmit(event, formData, successCallback) {
    event.preventDefault();
    try {
        console.log('Form submitted:', formData);
        if (successCallback) successCallback();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Booking form handling
    const bookingForm = getElement('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const formData = {
                service: getElement('#service')?.value || '',
                date: getElement('#date')?.value || '',
                time: getElement('#time')?.value || ''
            };
            
            handleFormSubmit(e, formData, function() {
                alert('Booking successful!');
                bookingForm.reset();
            });
        });
    }

    // Login form handling
    const loginForm = getElement('.auth-form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', function(e) {
            const formData = {
                email: getElement('#email')?.value || '',
                password: getElement('#password')?.value || ''
            };
            
            handleFormSubmit(e, formData, function() {
                window.location.href = 'dashboard.html';
            });
        });
    }

    // Signup form handling
    if (loginForm && window.location.pathname.includes('signup.html')) {
        loginForm.addEventListener('submit', function(e) {
            const password = getElement('#password')?.value || '';
            const confirmPassword = getElement('#confirm-password')?.value || '';
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const formData = {
                name: getElement('#name')?.value || '',
                email: getElement('#email')?.value || '',
                password: password
            };
            
            handleFormSubmit(e, formData, function() {
                window.location.href = 'login.html';
            });
        });
    }

    // Dashboard functionality
    const upcomingAppointments = getElement('.appointment-list');
    if (upcomingAppointments && window.location.pathname.includes('dashboard.html')) {
        // Mock data for appointments
        const mockAppointments = [
            {
                service: 'Haircut',
                date: '2025-01-20',
                time: '14:00',
                status: 'upcoming'
            },
            {
                service: 'Beard Trim',
                date: '2025-01-25',
                time: '15:30',
                status: 'upcoming'
            }
        ];

        // Display appointments
        function displayAppointments() {
            const appointmentsHTML = mockAppointments
                .map(appointment => `
                    <div class="appointment">
                        <h4>${appointment.service}</h4>
                        <p>Date: ${appointment.date}</p>
                        <p>Time: ${appointment.time}</p>
                        <p>Status: ${appointment.status}</p>
                    </div>
                `).join('');
            
            upcomingAppointments.innerHTML = appointmentsHTML || '<p>No appointments found</p>';
        }

        displayAppointments();
    }

    // Navigation menu toggle for mobile
    const navToggle = getElement('.nav-toggle');
    const navLinks = getElement('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                input.classList.add('error');
            });
            
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    });
});

// Handle page load errors
window.addEventListener('error', function(e) {
    console.error('Page Error:', e.error);
});