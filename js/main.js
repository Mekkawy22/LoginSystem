// Input elements and messages
var userName = document.getElementById('signupName');
var userEmail = document.getElementById('signupEmail');
var userPassword = document.getElementById('signupPassword');
var nameMessage = document.getElementById('nameMessage');
var emailMessage = document.getElementById('emailMessage');
var passwordMessage = document.getElementById('passwordMessage');
var existMessage = document.getElementById('exist');
var users = [];

// Load users from localStorage
if (localStorage.getItem('usersList') != null) {
    users = JSON.parse(localStorage.getItem('usersList'));
}

// Define patterns
var namePattern = /^[a-zA-Z0-9\s\-_]{3,10}$/;
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Validate name
function validateName() {
    if (namePattern.test(userName.value.trim())) {
        userName.classList.remove('is-invalid');
        userName.classList.add('is-valid');
        nameMessage.style.display = 'none';
    } else {
        userName.classList.remove('is-valid');
        userName.classList.add('is-invalid');
        nameMessage.style.display = 'block';
    }
}

// Validate email
function validateEmail() {
    const emailValue = userEmail.value.trim();
    if (emailPattern.test(emailValue)) {
        if (isEmailExist(emailValue)) {
            emailMessage.style.display = 'block';
            emailMessage.innerText = 'This email is already registered!';
        } else {
            userEmail.classList.remove('is-invalid');
            userEmail.classList.add('is-valid');
            emailMessage.style.display = 'none';
        }
    } else {
        emailMessage.style.display = 'block';
        emailMessage.innerText = 'Please enter a valid email.';
    }
}

// Validate password
function validatePassword() {
    if (passwordPattern.test(userPassword.value.trim())) {
        userPassword.classList.remove('is-invalid');
        userPassword.classList.add('is-valid');
        passwordMessage.style.display = 'none';
    } else {
        userPassword.classList.remove('is-valid');
        userPassword.classList.add('is-invalid');
        passwordMessage.style.display = 'block';
    }
}

// Check if email already exists
function isEmailExist(email) {
    return users.some(user => user.email === email);
}

// Sign up user
function signUp(event) {
    event.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    if (!isEmailExist(userEmail.value.trim()) && document.querySelectorAll('#signup-form .is-valid').length === 3) {
        users.push({
            name: userName.value.trim(),
            email: userEmail.value.trim(),
            password: userPassword.value.trim()
        });
        localStorage.setItem('usersList', JSON.stringify(users));
        alert("Registration successful!");
        toggleForms('login');
    } else {
        alert("Please correct the errors in the form.");
    }
}

// Sign in user
function signIn(event) {
    event.preventDefault();
    var loginEmail = document.getElementById('loginEmail').value.trim();
    var loginPassword = document.getElementById('loginPassword').value.trim();

    var user = users.find(u => u.email === loginEmail && u.password === loginPassword);

    if (user) {
        localStorage.setItem('currentUser', user.name);
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password.');
    }
}

// Toggle between forms
function toggleForms(formType) {
    if (formType === 'signup') {
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    } else {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }
}

// Attach event listeners
userName.addEventListener('input', validateName);
userEmail.addEventListener('input', validateEmail);
userPassword.addEventListener('input', validatePassword);

