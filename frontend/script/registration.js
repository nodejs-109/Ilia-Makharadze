document.getElementById("toLogin").addEventListener("click", function (e) {
    e.preventDefault();
    toggleForms("login");
});

document.getElementById("toRegister").addEventListener("click", function (e) {
    e.preventDefault();
    toggleForms("register");
});

function toggleForms(formType) {
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");

    if (formType === "login") {
        registrationForm.style.display = "none";
        loginForm.style.display = "block";
    } else if (formType === "register") {
        registrationForm.style.display = "block";
        loginForm.style.display = "none";
    }
}

async function registrationSubmit() {
    let firstname = document.getElementById("firstname").value.trim();
    let lastname = document.getElementById("lastname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let resultContainer = document.querySelector(".res");

    let firstnameRegex = /^[A-Za-z]{2,}$/;
    let lastnameRegex = /^[A-Za-z]{2,}$/;
    let emailRegex = /^[A-z][A-z0-9_.+-]+@[A-z0-9.-]+\.[A-z]{2,5}$/;
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!#$%?&*])[A-Za-z\d@!#$%?&*]{8,}$/;

    if (!firstname || !lastname || !email || !password) {
        resultContainer.innerHTML = `<p style="color: red;">All fields are required.</p>`;
        return;
    }

    if (!firstnameRegex.test(firstname)) {
        resultContainer.innerHTML = `<p style="color: red;">First name must be only letters.</p>`;
        return;
    }
    if (!lastnameRegex.test(lastname)) {
        resultContainer.innerHTML = `<p style="color: red;">Last name must be only letters.</p>`;
        return;
    }
    if (!emailRegex.test(email)) {
        resultContainer.innerHTML = `<p style="color: red;">Incorrect email format.</p>`;
        return;
    }
    if (!passwordRegex.test(password)) {
        resultContainer.innerHTML = `<p style="color: red;">Password must be at least 8 characters, include a letter, a number, and a special character.</p>`;
        return;
    }

    // send to backend
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            resultContainer.innerHTML = `<p style="color: green;">${data.message}</p>`;
            setTimeout(() => {
                window.location.href = "main.html"; 
            }, 1000);
        } else {
            resultContainer.innerHTML = `<p style="color: red;">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultContainer.innerHTML = `<p style="color: red;">Something went wrong. Please try again.</p>`;
    }
}


async function loginSubmit() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let resultContainer = document.querySelector(".res1");

    if (!email || !password) {
        resultContainer.innerHTML = `<p style="color: red;">All fields are required.</p>`;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            resultContainer.innerHTML = `<p style="color: green;">${data.message}</p>`;
            setTimeout(() => {
                window.location.href = "main.html"; 
            }, 1000);
        } else {
            resultContainer.innerHTML = `<p style="color: red;">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultContainer.innerHTML = `<p style="color: red;">Something went wrong. Please try again.</p>`;
    }
}
