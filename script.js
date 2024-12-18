const sidebar = document.getElementById('sidebar');
    const searchBar = document.querySelector('.search-bar');
    const searchIconMobile = document.querySelector('.search-icon-mobile');

    
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

    /* sidebar */
    function toggleSidebar() {
        sidebar.classList.toggle('show');
    }

    function showSearchBar() {
        searchIconMobile.style.display = 'none';
        searchBar.style.display = 'flex';
    }

// Search Functionality
function triggerSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim().toLowerCase();

    const homepageContent = document.querySelector('.row'); // Target the homepage content
    const customerDataSection = document.getElementById('customerData');
    const defaultCharts = document.querySelectorAll('.row.mt-4'); // Default charts section

    // Hide default charts initially
    defaultCharts.forEach(chart => chart.style.display = 'none');

    // Check if search input is empty
    if (!searchValue) {
        homepageContent.style.display = 'block'; // Show homepage content
        customerDataSection.style.display = 'none'; // Hide search results section
        document.getElementById('noDataMessage').style.display = 'block';
        document.getElementById('noDataMessage').textContent = 'Enter a character to search.';
        hideCharts();
        return;
    }

    const filteredCustomer = customers.find(customer => customer.name.toLowerCase().includes(searchValue));
    if (filteredCustomer) {
        homepageContent.style.display = 'none'; // Hide homepage content
        customerDataSection.style.display = 'block'; // Show search results section
        document.getElementById('noDataMessage').style.display = 'none';
        displayCustomerData(filteredCustomer);
    } else {
        homepageContent.style.display = 'none'; // Hide homepage content
        customerDataSection.style.display = 'block'; // Show search results section
        document.getElementById('customerDetails').innerHTML = '';
        document.getElementById('noDataMessage').style.display = 'block';
        document.getElementById('noDataMessage').textContent = 'Customer Not Found.';
        hideCharts();
    }
}




    const customers = [
        { name: 'Alice Johnson', heartRate: 72, steps: 5000, sleepScore: 85, deviceName: 'FitPro A1' },
        { name: 'Bob Smith', heartRate: 68, steps: 6200, sleepScore: 78, deviceName: 'HealthTracker X' },
        { name: 'Charlie Brown', heartRate: 80, steps: 7000, sleepScore: 90, deviceName: 'SmartFit 2.0' },
        { name: 'Aarav Sharma', heartRate: 78, steps: 10234, sleepScore: 92, deviceName: 'FitPro A1' },
    { name: 'Isha Patel', heartRate: 82, steps: 6578, sleepScore: 88, deviceName: 'FitPro B2' },
    { name: 'Ravi Kumar', heartRate: 75, steps: 8452, sleepScore: 91, deviceName: 'HealthTrack X5' },
    { name: 'Priya Verma', heartRate: 80, steps: 9510, sleepScore: 89, deviceName: 'PulseMate P3' },
    { name: 'Vikram Reddy', heartRate: 74, steps: 12345, sleepScore: 95, deviceName: 'WellnessTrack Z1' },
    { name: 'Neha Desai', heartRate: 77, steps: 4321, sleepScore: 84, deviceName: 'FitPro A1' },
    { name: 'Arjun Nair', heartRate: 70, steps: 5678, sleepScore: 90, deviceName: 'FitPro B2' },
    { name: 'Ananya Gupta', heartRate: 73, steps: 8765, sleepScore: 86, deviceName: 'HealthTrack X5' },
    { name: 'Siddharth Singh', heartRate: 79, steps: 10000, sleepScore: 93, deviceName: 'PulseMate P3' },
    { name: 'Sneha Patel', heartRate: 68, steps: 6345, sleepScore: 91, deviceName: 'WellnessTrack Z1' },
    { name: 'Karan Mehta', heartRate: 81, steps: 14500, sleepScore: 87, deviceName: 'FitPro A1' },
    { name: 'Divya Iyer', heartRate: 76, steps: 7654, sleepScore: 89, deviceName: 'FitPro B2' },
    { name: 'Manoj Yadav', heartRate: 72, steps: 6700, sleepScore: 85, deviceName: 'HealthTrack X5' },
    { name: 'Ritika Joshi', heartRate: 83, steps: 11234, sleepScore: 94, deviceName: 'PulseMate P3' },
    { name: 'Saurabh Rao', heartRate: 70, steps: 9000, sleepScore: 90, deviceName: 'WellnessTrack Z1' },
    { name: 'Nikita Soni', heartRate: 77, steps: 4500, sleepScore: 92, deviceName: 'FitPro A1' },
    { name: 'Amit Bhardwaj', heartRate: 75, steps: 12300, sleepScore: 89, deviceName: 'FitPro B2' },
    { name: 'Simran Kaur', heartRate: 79, steps: 13000, sleepScore: 93, deviceName: 'HealthTrack X5' },
    { name: 'Shivani Verma', heartRate: 71, steps: 8000, sleepScore: 88, deviceName: 'PulseMate P3' },
    { name: 'Rahul Bhagat', heartRate: 82, steps: 10450, sleepScore: 95, deviceName: 'WellnessTrack Z1' },
    { name: 'Pooja Singh', heartRate: 74, steps: 9250, sleepScore: 86, deviceName: 'FitPro A1' },
    { name: 'Vishal Kapoor', heartRate: 80, steps: 15000, sleepScore: 91, deviceName: 'FitPro B2' },
    { name: 'Geeta Sharma', heartRate: 78, steps: 11000, sleepScore: 94, deviceName: 'HealthTrack X5' },
    { name: 'Kartik Jain', heartRate: 76, steps: 9500, sleepScore: 87, deviceName: 'PulseMate P3' },
    { name: 'Ayesha Khan', heartRate: 72, steps: 11000, sleepScore: 93, deviceName: 'WellnessTrack Z1' },
    { name: 'Deepak Agarwal', heartRate: 79, steps: 7600, sleepScore: 89, deviceName: 'FitPro A1' },
    { name: 'Madhuri Joshi', heartRate: 75, steps: 10300, sleepScore: 90, deviceName: 'FitPro B2' },
    { name: 'Rohit Yadav', heartRate: 82, steps: 13000, sleepScore: 91, deviceName: 'HealthTrack X5' },
    { name: 'Sonali Sharma', heartRate: 74, steps: 5500, sleepScore: 85, deviceName: 'PulseMate P3' },
    { name: 'Manish Reddy', heartRate: 80, steps: 11400, sleepScore: 92, deviceName: 'WellnessTrack Z1' },
    { name: 'Swati Gupta', heartRate: 71, steps: 8900, sleepScore: 88, deviceName: 'FitPro A1' },
    { name: 'Sanjay Kumar', heartRate: 78, steps: 14500, sleepScore: 95, deviceName: 'FitPro B2' },
    { name: 'Rekha Nair', heartRate: 76, steps: 12000, sleepScore: 90, deviceName: 'HealthTrack X5' },
    { name: 'Anil Deshmukh', heartRate: 73, steps: 9800, sleepScore: 85, deviceName: 'PulseMate P3' },
    { name: 'Shreya Gupta', heartRate: 79, steps: 10450, sleepScore: 92, deviceName: 'WellnessTrack Z1' },
    { name: 'Tanuja Kapoor', heartRate: 75, steps: 8900, sleepScore: 91, deviceName: 'FitPro A1' },
    { name: 'Ajay Raj', heartRate: 70, steps: 10400, sleepScore: 86, deviceName: 'FitPro B2' },
    { name: 'Kavita Yadav', heartRate: 74, steps: 7200, sleepScore: 93, deviceName: 'HealthTrack X5' },
    { name: 'Varun Sharma', heartRate: 81, steps: 9500, sleepScore: 92, deviceName: 'PulseMate P3' },
    { name: 'Meera Kaur', heartRate: 79, steps: 13000, sleepScore: 94, deviceName: 'WellnessTrack Z1' },
    { name: 'Aditya Joshi', heartRate: 76, steps: 11500, sleepScore: 85, deviceName: 'FitPro A1' },
    { name: 'Rashmi Nair', heartRate: 80, steps: 11200, sleepScore: 90, deviceName: 'FitPro B2' },
    { name: 'Sandeep Raj', heartRate: 75, steps: 8500, sleepScore: 91, deviceName: 'HealthTrack X5' },
    { name: 'Neelam Patel', heartRate: 78, steps: 12450, sleepScore: 88, deviceName: 'PulseMate P3' },
    { name: 'Umesh Kumar', heartRate: 82, steps: 9900, sleepScore: 93, deviceName: 'WellnessTrack Z1' },
    { name: 'Kirti Sharma', heartRate: 73, steps: 10500, sleepScore: 92, deviceName: 'FitPro A1' },
    { name: 'Pankaj Singh', heartRate: 77, steps: 13200, sleepScore: 89, deviceName: 'FitPro B2' },
    { name: 'Shruti Gupta', heartRate: 79, steps: 12100, sleepScore: 86, deviceName: 'HealthTrack X5' },
    { name: 'Mitali Kaur', heartRate: 75, steps: 13500, sleepScore: 95, deviceName: 'PulseMate P3' },
    { name: 'Abhinav Iyer', heartRate: 80, steps: 11700, sleepScore: 90, deviceName: 'WellnessTrack Z1' },
    { name: 'Ravindra Singh', heartRate: 72, steps: 9000, sleepScore: 87, deviceName: 'FitPro A1' },
    { name: 'Tanvi Sharma', heartRate: 76, steps: 12200, sleepScore: 93, deviceName: 'FitPro B2' },
    { name: 'Rohini Joshi', heartRate: 74, steps: 11800, sleepScore: 91, deviceName: 'HealthTrack X5' },
    { name: 'Suraj Mehta', heartRate: 81, steps: 10600, sleepScore: 94, deviceName: 'PulseMate P3' },
    { name: 'Neeraj Reddy', heartRate: 77, steps: 12400, sleepScore: 92, deviceName: 'WellnessTrack Z1' },
    { name: 'Sonu Yadav', heartRate: 72, steps: 9800, sleepScore: 89, deviceName: 'FitPro A1' }

    ];

    function displayCustomerData(customer) { 
        document.getElementById("customerDetail").style.display = 'block'; // Show the heading
        document.getElementById("customerName").innerText = customer.name;
        const detailsContainer = document.getElementById('customerDetails');
        detailsContainer.innerHTML = `
            <div class="data-card"><strong>Heart Rate:</strong> ${customer.heartRate} bpm</div>
            <div class="data-card"><strong>Steps:</strong> ${customer.steps}</div>
            <div class="data-card"><strong>Sleep Score:</strong> ${customer.sleepScore}</div>
            <div class="data-card"><strong>Device:</strong> ${customer.deviceName}</div>
        `;
        renderCharts(customer);
    }

    function renderCharts(customer) {
    showCharts();
    // Replace the default charts with the search result charts
    const heartRateChartCtx = document.getElementById('heartRateChart').getContext('2d');
    const sleepScoreChartCtx = document.getElementById('sleepScoreChart').getContext('2d');
    const stepsChartCtx = document.getElementById('stepsChart').getContext('2d');

    // Heart Rate Chart for the search result
    new Chart(heartRateChartCtx, {
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

    // Sleep Score Chart for the search result
    new Chart(sleepScoreChartCtx, {
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

    // Steps Chart for the search result
    new Chart(stepsChartCtx, {
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
    // Hide charts when no data is found or if user hasn't searched yet
    document.getElementById('heartRateChart').style.display = 'none';
    document.getElementById('sleepScoreChart').style.display = 'none';
    document.getElementById('stepsChart').style.display = 'none';
}

function showCharts() {
    // Show charts after customer search
    document.getElementById('heartRateChart').style.display = 'block';
    document.getElementById('sleepScoreChart').style.display = 'block';
    document.getElementById('stepsChart').style.display = 'block';
}

