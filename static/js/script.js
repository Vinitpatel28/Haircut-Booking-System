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
    document.addEventListener("DOMContentLoaded", function () {
        const formSteps = document.querySelectorAll(".form-step");
        const nextBtns = document.querySelectorAll(".next-btn");
        const prevBtns = document.querySelectorAll(".prev-btn");
        const summaryService = document.getElementById("summary-service");
        const summaryBarber = document.getElementById("summary-barber");
        const summaryDate = document.getElementById("summary-date");
        const summaryTime = document.getElementById("summary-time");
        let currentStep = 0;
    
        function showStep(step) {
            formSteps.forEach((el, index) => {
                el.style.display = index === step ? "block" : "none";
            });
        }
    
        nextBtns.forEach((button) => {
            button.addEventListener("click", () => {
                if (currentStep < formSteps.length - 1) {
                    currentStep++;
                    if (currentStep === formSteps.length - 2) {
                        summaryService.textContent = document.getElementById("service").value;
                        summaryBarber.textContent = document.getElementById("barber").value;
                        summaryDate.textContent = document.getElementById("date").value;
                        summaryTime.textContent = document.getElementById("time").value;
                    }
                    showStep(currentStep);
                }
            });
        });
    
        prevBtns.forEach((button) => {
            button.addEventListener("click", () => {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        });
    
        showStep(currentStep);
    });
    
    document.getElementById("booking-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload
    
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
    
        if (!service || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Save the appointment
        const appointment = { service, date, time };
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    
        alert("Appointment booked successfully!");
    
        // Redirect to dashboard after booking
        // window.location.href = "./dashboard.html";
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const bookingForm = document.getElementById("booking-form");
        const successMessage = document.getElementById("success-message");
    
        if (bookingForm) {
            bookingForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent actual form submission
                
                // Show success message
                successMessage.style.display = "block";
    
                // Wait for 3 seconds, then redirect to payment
                setTimeout(() => {
                    window.location.href = "payment.html"; // Redirect to the payment page
                }, 3000);
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const bookingForm = document.getElementById("booking-form");
    
        if (bookingForm) {
            bookingForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent actual form submission
                
                // Show popup success message
                if (confirm("✅ Appointment booked successfully! Click OK to proceed to payment.")) {
                    window.location.href = "payment.html"; // Redirect to payment page when OK is clicked
                }
            });
        }
    });
    
        
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
    document.addEventListener("DOMContentLoaded", function () {
        const signUpForm = document.querySelector(".auth-form");
    
        if (signUpForm) {
            signUpForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent page refresh
    
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                const confirmPassword = document.getElementById("confirm-password").value;
    
                // Validate inputs
                if (name === "" || email === "" || password === "" || confirmPassword === "") {
                    alert("⚠️ Please fill in all the fields.");
                    return;
                }
    
                if (!validateEmail(email)) {
                    alert("⚠️ Please enter a valid email address.");
                    return;
                }
    
                if (password.length < 6) {
                    alert("⚠️ Password must be at least 6 characters.");
                    return;
                }
    
                if (password !== confirmPassword) {
                    alert("⚠️ Passwords do not match.");
                    return;
                }
    
                // Store user data (this is just for testing, real projects should use a database)
                localStorage.setItem("user", JSON.stringify({ name, email, password }));
    
                // Show success message
                alert("✅ Signup successful! Redirecting to login page...");
    
                // Redirect to login page
                window.location.href = "login.html";
            });
        }
    });
    
    // Email Validation Function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
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