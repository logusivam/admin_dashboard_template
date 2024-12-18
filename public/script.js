const sidebar = document.getElementById('sidebar');
    const searchBar = document.querySelector('.search-bar');
    const searchIconMobile = document.querySelector('.search-icon-mobile');
    const mainContent = document.querySelector('.main-content');
    
    // Dark Mode Toggle
    document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('darkModeToggle').querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

    // Sample Chart Data
    const heartRateChart = new Chart(document.getElementById('heartRateChart1'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Heart Rate (BPM)',
            data: [72, 75, 76, 78, 80, 82, 85],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        }]
    }
});

const sleepScoreChart = new Chart(document.getElementById('sleepScoreChart1'), {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Sleep Score',
            data: [60, 65, 70, 75, 80, 85, 90],
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
    }
});

async function fetchMetrics() {
    try {
        const response = await fetch('http://localhost:3000/metrics'); // Adjust port if necessary
        const data = await response.json();

        // Update DOM elements with real-time data
        document.getElementById('total-customers').textContent = data.totalCustomers || 0;
        document.getElementById('average-sleep-score').textContent = data.averageSleepScore || 0;
        document.getElementById('average-calories').textContent = data.averageCaloriesBurned || 0;
        document.getElementById('average-steps').textContent = data.averageSteps || 0;
    } catch (error) {
        console.error("Error fetching metrics:", error);
    }
}

// Fetch data every 5 seconds
setInterval(fetchMetrics, 5000);

// Initial fetch when page loads
fetchMetrics();

    /* sidebar */
    function toggleSidebar() {
        sidebar.classList.toggle('show');mainContent.classList.toggle('shift'); // Adjust main content
    }

    function showSearchBar() {
        searchIconMobile.style.display = 'none';
        searchBar.style.display = 'flex';
    }

    function triggerSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchValue = searchInput.value.trim().toLowerCase();
    
        const homepageContent = document.querySelector('.row');
        const customerDataSection = document.getElementById('customerData');
        const defaultCharts = document.querySelectorAll('.row.mt-4');
    
        defaultCharts.forEach(chart => chart.style.display = 'none');
    
        // If no search value, display a message and return
        if (!searchValue) {
            homepageContent.style.display = 'none'; // Hide homepage content
            customerDataSection.style.display = 'none'; // Hide customer data section
            document.getElementById('customerDetails').innerHTML = ''; // Clear customer details
            

            // Show no data message
            const noDataMessage = document.getElementById('noDataMessage');console.log("noDataMessage element: ", noDataMessage);
            noDataMessage.style.cssText = 'display: block !important; color: red;';

            
            noDataMessage.textContent = 'Enter a character to search.';
            return;
        }
    
    
        // Fetch customer data from MongoDB
        fetch(`http://localhost:3000/search?query=${searchValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No matching data found');
                }
                return response.json();
            })
            .then(data => {
                /* console.log("Search Result:", data); */ // Log the data for debugging
                if (data.name) {
                    // Hide homepage content and show customer data section
                    homepageContent.style.display = 'none';
                    customerDataSection.style.display = 'block';
                    document.getElementById('noDataMessage').style.display = 'none';
    
                    // Display customer data
                    displayCustomerData(data);
                } else {
                    // No customer found
                    homepageContent.style.display = 'none';
                    customerDataSection.style.display = 'block';
                    document.getElementById('noDataMessage').style.display = 'block';
                    document.getElementById('noDataMessage').textContent = 'Customer Not Found.';
                    hideCharts();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                homepageContent.style.display = 'none';
                customerDataSection.style.display = 'block';
                document.getElementById('noDataMessage').style.display = 'block';
                document.getElementById('noDataMessage').textContent = `An error occurred: ${error.message}`;
                hideCharts();
            });

            // If input has value, clear the no data message
            document.getElementById('noDataMessage').style.display = 'none';
            homepageContent.style.display = 'none'; // Hide homepage content when searching
            customerDataSection.style.display = 'block';
            
            // Place your search logic here to show results
            searchAndDisplayResults(searchValue);
    }
    function displayCustomerData(customer) {
       /*  console.log("Displaying customer data:", customer); */ // Log customer data
    
        // Make sure the elements exist and are being selected
        const customerDetail = document.getElementById("customerDetail");
        const customerName = document.getElementById("customerName");
        const detailsContainer = document.getElementById('customerDetails');
    
        // Ensure these elements exist before trying to update
        if (customerDetail && customerName && detailsContainer) {
            customerDetail.style.display = 'block';
            customerName.innerText = customer.name;
            detailsContainer.innerHTML = `
                <div class="data-card">
                    <i class="fas fa-heartbeat animated-icon"></i> 
                    <strong>Heart Rate:</strong> ${customer.heartRate} bpm
                </div>
                <div class="data-card">
                    <i class="fas fa-shoe-prints animated-icon"></i> 
                    <strong>Steps:</strong> ${customer.steps}
                </div>
                <div class="data-card">
                    <i class="fas fa-bed animated-icon"></i> 
                    <strong>Sleep Score:</strong> ${customer.sleepScore}
                </div>
                <div class="data-card">
                    <i class="fas fa-mobile-alt animated-icon"></i> 
                    <strong>Device:</strong> ${customer.deviceName}
                </div>
            `;
            renderCharts(customer);
        } else {
            console.error('Error: One or more elements are missing.');
        }
    }
    
    
    let heartRateChartInstance = null;
    let sleepScoreChartInstance = null;
    let stepsChartInstance = null;

    function renderCharts(customer) {
    showCharts();

    const heartRateChartCtx = document.getElementById('heartRateChart').getContext('2d');
    const sleepScoreChartCtx = document.getElementById('sleepScoreChart').getContext('2d');
    const stepsChartCtx = document.getElementById('stepsChart').getContext('2d');

    // Destroy existing charts if any
    if (heartRateChartInstance) {
        heartRateChartInstance.destroy();
    }
    if (sleepScoreChartInstance) {
        sleepScoreChartInstance.destroy();
    }
    if (stepsChartInstance) {
        stepsChartInstance.destroy();
    }

    // Heart Rate Chart
    heartRateChartInstance = new Chart(heartRateChartCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: Array.from({ length: 7 }, () => customer.heartRate),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        }
    });

    // Sleep Score Chart
    sleepScoreChartInstance = new Chart(sleepScoreChartCtx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Sleep Score',
                data: Array.from({ length: 30 }, () => Math.floor(Math.random() * (100 - 70) + 70)),
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            }]
        }
    });

    // Steps Chart
    stepsChartInstance = new Chart(stepsChartCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Steps',
                data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (8000 - 5000) + 5000)),
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        }
    });
}

function hideCharts() {
    document.getElementById('heartRateChart').style.display = 'none';
    document.getElementById('sleepScoreChart').style.display = 'none';
    document.getElementById('stepsChart').style.display = 'none';
}

function showCharts() {
    document.getElementById('heartRateChart').style.display = 'block';
    document.getElementById('sleepScoreChart').style.display = 'block';
    document.getElementById('stepsChart').style.display = 'block';
}


