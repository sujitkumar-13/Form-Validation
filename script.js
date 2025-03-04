const container = document.querySelector('.container');
const register = document.querySelector('.register');
const logIn = document.querySelector('.log-in');
const signIn = document.querySelector('.sign-in');
const signUp = document.querySelector('.sign-up');
const Password1 = document.querySelector('#password1');
const hidePassword1 = document.querySelector('#hide-password1');
const showPassword1 = document.querySelector('#show-password1');
const Password2 = document.querySelector('#password2');
const hidePassword2 = document.querySelector('#hide-password2');
const showPassword2 = document.querySelector('#show-password2');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const registerError = document.querySelector('.sign-up .all-error');
const loginError = document.querySelector('.sign-in .all-error');
const logOutBtn = document.querySelector('.log-out-btn button');
const afterRegister = document.querySelector('.afterRegister');
const logOut = document.querySelector('.log-out-btn');
const greetingUser = document.querySelector('.username');
const miniBox = document.querySelector('.mini-box')

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

let users = JSON.parse(localStorage.getItem("users")) || [];

register.addEventListener('click', (e) => {
    e.preventDefault();
    showSignup();
});

logIn.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signInUser();
});

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupUser();
});

hidePassword1.addEventListener('click', () => togglePassword(Password1, hidePassword1, showPassword1));
showPassword1.addEventListener('click', () => togglePassword(Password1, hidePassword1, showPassword1));

hidePassword2.addEventListener('click', () => togglePassword(Password2, hidePassword2, showPassword2));
showPassword2.addEventListener('click', () => togglePassword(Password2, hidePassword2, showPassword2));

function showSignup() {
    signIn.style.display = "none";
    signUp.style.display = "block";
}

function showLogin() {
    signUp.style.display = "none";
    signIn.style.display = "block";
}

function togglePassword(passwordField, hideIcon, showIcon) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        hideIcon.style.display = "block";
        showIcon.style.display = "none";
    } else {
        passwordField.type = "password";
        hideIcon.style.display = "none";
        showIcon.style.display = "block";
    }
}

function signupUser() {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("password2").value.trim();
    const fullContact = document.getElementById("signupNumber").value.trim();
    const userName = document.getElementById("signupUsername").value.trim();
    const name = document.getElementById("signupname").value.trim();

    clearErrors();

    if (!email || !password || !fullContact || !userName || !name) {
        registerError.innerText = 'All fields are required!';
        return;
    }

    if (!validateUserName(userName)) {
        document.querySelector('.userError').innerText = 'Username can only contain lowercase letters!';
        return;
    }

    if (!validateEmail(email)) {
        document.querySelector('.emailError').innerText = 'Enter a valid email address!';
        return;
    }

    if (!validateContact(fullContact)) {
        document.querySelector('.numberError').innerText = 'Enter a valid 10-digit number!';
        return;
    }

    if (!validatePassword(password)) {
        document.querySelector('.passwordError').innerText = 'Password must be 8-16 characters with uppercase, lowercase, number & symbol!';
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === email)) {
        registerError.innerText = "Email already exists. Please login.";
        return;
    }

    if (users.find(user => user.contact === fullContact)) {
        registerError.innerText = "This number is already registered!";
        return;
    }

    users.push({ name, userName, email, contact: fullContact, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    showLogin();
}

function signInUser() {
    const emailInput = document.querySelector(".sign-in .input-field input[type='text']");
    const passwordInput = document.querySelector(".sign-in .input-field input[type='password']");

    const email = emailInput?.value.trim() || "";
    const password = passwordInput?.value.trim() || "";

    if (!email || !password) {
        loginError.innerText = 'Email and password are required!';
        return;
    }

    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        loginError.innerText = "Invalid email or password!";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    greetingUser.innerText = user.userName;
    miniBox.style.display = "none";
    afterRegister.style.display = "block";
    logOut.style.display = "block";
}

function validateUserName(userName) {
    return /^[a-z0-9!@#$%^&*()-_=+]+$/.test(userName) && userName === userName.toLowerCase();
}

function validateEmail(email) {
    return /^[^\s@]+@[^@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
}

function validateContact(contact) {
    return /^\d{10}$/.test(contact);
}

document.querySelectorAll(".sign-up input").forEach(input => {
    input.addEventListener("focus", clearErrors);
});

document.querySelectorAll(".sign-in input").forEach(input => {
    input.addEventListener("focus", () => loginError.innerText = "");
});

function clearErrors() {
    registerError.innerText = "";
    document.querySelector('.userError').innerText = '';
    document.querySelector('.emailError').innerText = '';
    document.querySelector('.numberError').innerText = '';
    document.querySelector('.passwordError').innerText = '';
}

if (logOutBtn) {
    logOutBtn.addEventListener('click', logoutUser);
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    afterRegister.style.display = "none";
    miniBox.style.display = "block";
    logOut.style.display = "none";

    alert("You have successfully logged out!");
}


document.addEventListener("DOMContentLoaded", checkLoginStatus);

function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        greetingUser.innerText = loggedInUser.userName;
        miniBox.style.display = "none";
        afterRegister.style.display = "block";
        logOut.style.display = "block";
    } else {
        afterRegister.style.display = "none";
        miniBox.style.display = "block";
        logOut.style.display = "none";
    }
}



