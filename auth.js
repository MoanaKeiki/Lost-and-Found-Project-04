
document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("auth-message");

    // SIGN UP
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const studentId = document.getElementById("signup-student-id").value.trim();
        const password = document.getElementById("signup-password").value;

        message.textContent = "";

        // Check university email
        if (!email.endsWith("@astanait.edu.kz")) {
            message.textContent = "Use your university email!";
            return;
        }

        // Register user
        const { data, error } = await db.auth.signUp({
            email: email,
            password: password,

            options: {
                data: {
                    full_name: name,
                    student_id: studentId
                }
            }
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        if (data.session) {
            message.textContent = "Registration successful!";
        } else {
            message.textContent = "Check your university email to confirm registration!";
        }
    });


    // SIGN IN
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;

        message.textContent = "";

        const { data, error } = await db.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            message.textContent = "Login failed: " + error.message;
            return;
        }

        if (!data.user.email_confirmed_at) {
            message.textContent = "Please confirm your university email first!";
            return;
        }

        message.textContent = "Login successful!";

        window.location.href = "mainpage.html";
    });

});