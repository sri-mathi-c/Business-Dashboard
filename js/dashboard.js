console.log("JS working");
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let step = Math.ceil(range / (duration / 30));
    let current = start;

    let timer = setInterval(() => {
        current += step;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        obj.innerText = current;
    }, 30);
}
fetch("./data/dashboard.json")
.then(res => res.json())
.then(data => {

    // ================= LINE CHART =================
    new Chart(document.getElementById("revenueChart"), {
        type: "line",
        data: {
            labels: data.months,
            datasets: [{
                label: "Monthly Revenue",
                data: data.revenue,
                borderColor: "#0d6efd",
                backgroundColor: "rgba(13,110,253,0.15)",
                fill: true,
                tension: 0.4
            }]
        }
    });

    // ================= PIE CHART =================
    new Chart(document.getElementById("categoryChart"), {
        type: "doughnut",
        data: {
            labels: data.category.labels,
            datasets: [{
                data: data.category.values,
                backgroundColor: ["#0d6efd","#198754","#ffc107","#dc3545"]
            }]
        }
    });

    // ================= TABLE =================
    const table = document.getElementById("ordersTable");

    data.orders.forEach(order => {
        table.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>₹${order.amount}</td>
                <td>${order.status}</td>
            </tr>
        `;
    });

});


// =======================
// KPI ANIMATION CALLS
// =======================

animateValue("customerGrowth", 0, 8450, 1500);
animateValue("orderCount", 0, 1290, 1500);

// =========================
// DARK MODE TOGGLE
// =========================

document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("monthFilter").addEventListener("change", function () {
    let month = this.value;
    console.log("Selected Month:", month);

    updateDashboard(month);
});

function updateDashboard(month) {

    console.log("Updating dashboard for:", month);

    // 👉 Example logic (future real API / JSON filter)
    if (month === "Jan") {
        console.log("Show Jan data");
    }

    if (month === "Feb") {
        console.log("Show Feb data");
    }

}