document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@demo.com" && password === "1234") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMsg").innerText = "Invalid login";
    }
});