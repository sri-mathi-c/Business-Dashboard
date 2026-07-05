console.log("LOGIN JS LOADED");

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // page refresh stop

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "admin@insightiq.com" && password === "InsightIQ@2026") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
});

// eye icon
function togglePassword() {
    const pass = document.getElementById("password");

    pass.type = pass.type === "password" ? "text" : "password";
}