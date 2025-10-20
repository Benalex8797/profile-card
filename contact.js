document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  // Validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    const input = document.getElementById(fieldId);
    input.setAttribute('aria-describedby', fieldId + '-error');
    input.setAttribute('aria-invalid', 'true');
  }

  function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.style.display = 'none';
    const input = document.getElementById(fieldId);
    input.removeAttribute('aria-describedby');
    input.setAttribute('aria-invalid', 'false');
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const value = input.value.trim();

    hideError(fieldId);

    if (!value) {
      showError(fieldId, 'This field is required.');
      return false;
    }

    if (fieldId === 'email' && !validateEmail(value)) {
      showError(fieldId, 'Please enter a valid email address.');
      return false;
    }

    if (fieldId === 'message' && value.length < 10) {
      showError(fieldId, 'Message must be at least 10 characters long.');
      return false;
    }

    return true;
  }

  // Add event listeners for real-time validation
  ['name', 'email', 'subject', 'message'].forEach(fieldId => {
    const input = document.getElementById(fieldId);
    input.addEventListener('blur', () => validateField(fieldId));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        validateField(fieldId);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    fields.forEach(fieldId => {
      if (!validateField(fieldId)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Hide form and show success message
      form.style.display = 'none';
      successMessage.style.display = 'block';

      // Reset form for potential future use
      form.reset();

      // Reset error states
      fields.forEach(fieldId => {
        hideError(fieldId);
      });
    }
  });
});