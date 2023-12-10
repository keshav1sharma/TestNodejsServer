// script.js
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch power data from the server
    const response = await fetch('http://localhost:3000/getChartData');
    const data = await response.json();

    // Extract 'powerConsumed' and 'date' from the data
    const labels = data.map(entry => entry.date);
    const powerConsumed = data.map(entry => parseFloat(entry.powerConsumed));

    // Create a chart
    const ctx = document.getElementById('powerChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Power Consumed',
                data: powerConsumed,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
            }],
        },
        options: {
            scales: {
                x: [{
                    type: 'linear',
                    position: 'bottom',
                }],
            },
        },
    });
});
