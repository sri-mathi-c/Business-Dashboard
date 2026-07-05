function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "admin@insightiq.com" && password === "InsightIQ@2026") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
}