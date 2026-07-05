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

    let badge = "";

    if (order.status === "Done") {
        badge = `<span class="badge bg-success">Done</span>`;
    }
    else if (order.status === "Pending") {
        badge = `<span class="badge bg-warning text-dark">Pending</span>`;
    }
    else {
        badge = `<span class="badge bg-primary">Shipped</span>`;
    }

    table.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>₹${order.amount}</td>
            <td>${badge}</td>
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
const searchInput = document.getElementById("searchOrder");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let rows = document.querySelectorAll("#ordersTable tr");

        rows.forEach(row => {

            let text = row.innerText.toLowerCase();

            if (text.includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}

document.getElementById("exportCSV").addEventListener("click", function () {

    let rows = document.querySelectorAll("#ordersTable tr");

    let csv = "Order ID,Customer,Amount,Status\n";

    rows.forEach(row => {

        let cols = row.querySelectorAll("td");

        if (cols.length > 0) {

            csv +=
                cols[0].innerText + "," +
                cols[1].innerText + "," +
                cols[2].innerText + "," +
                cols[3].innerText + "\n";

        }

    });

    let blob = new Blob([csv], { type: "text/csv" });

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");

    a.href = url;

    a.download = "orders.csv";

    a.click();

});