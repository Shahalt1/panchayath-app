// Sample detailed area-wise fee data
const detailedFeesData = [
    { sqft: 1077, sqm: 100, grama: 5000, municipality: 7000, corporation: 10000, permit: 2500, development: 1500 },
    { sqft: 1200, sqm: 111, grama: 5550, municipality: 7770, corporation: 11100, permit: 2775, development: 1665 },
    { sqft: 1300, sqm: 121, grama: 6050, municipality: 8470, corporation: 12100, permit: 3025, development: 1815 },
    { sqft: 1400, sqm: 130, grama: 6500, municipality: 9100, corporation: 13000, permit: 3250, development: 1950 },
    { sqft: 1500, sqm: 139, grama: 6950, municipality: 9730, corporation: 13900, permit: 3475, development: 2085 },
    { sqft: 1600, sqm: 149, grama: 7450, municipality: 10430, corporation: 14900, permit: 3725, development: 2235 },
    { sqft: 1700, sqm: 158, grama: 7900, municipality: 11060, corporation: 15800, permit: 3950, development: 2370 },
    { sqft: 1800, sqm: 167, grama: 8350, municipality: 11690, corporation: 16700, permit: 4175, development: 2505 },
    { sqft: 1900, sqm: 176, grama: 8800, municipality: 12320, corporation: 17600, permit: 4400, development: 2640 },
    { sqft: 2000, sqm: 186, grama: 9300, municipality: 13020, corporation: 18600, permit: 4650, development: 2790 },
    { sqft: 2100, sqm: 195, grama: 9750, municipality: 13650, corporation: 19500, permit: 4875, development: 2925 },
    { sqft: 2200, sqm: 204, grama: 10200, municipality: 14280, corporation: 20400, permit: 5100, development: 3060 },
    { sqft: 2300, sqm: 214, grama: 10700, municipality: 14980, corporation: 21400, permit: 5350, development: 3210 },
    { sqft: 2400, sqm: 223, grama: 11150, municipality: 15610, corporation: 22300, permit: 5575, development: 3345 },
    { sqft: 2500, sqm: 232, grama: 11600, municipality: 16240, corporation: 23200, permit: 5800, development: 3480 },
    { sqft: 2600, sqm: 241, grama: 12050, municipality: 16870, corporation: 24100, permit: 6025, development: 3615 },
    { sqft: 2700, sqm: 251, grama: 12550, municipality: 17570, corporation: 25100, permit: 6275, development: 3765 },
    { sqft: 2800, sqm: 260, grama: 13000, municipality: 18200, corporation: 26000, permit: 6500, development: 3900 },
    { sqft: 2900, sqm: 269, grama: 13450, municipality: 18830, corporation: 26900, permit: 6725, development: 4035 },
    { sqft: 3000, sqm: 279, grama: 13950, municipality: 19530, corporation: 27900, permit: 6975, development: 4185 },
    { sqft: 3100, sqm: 288, grama: 14400, municipality: 20160, corporation: 28800, permit: 7200, development: 4320 },
    { sqft: 3200, sqm: 297, grama: 14850, municipality: 20790, corporation: 29700, permit: 7425, development: 4455 }
];

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tableContainers = document.querySelectorAll('.table-container');
const areaFilter = document.getElementById('area-filter');
const detailedFeesTableBody = document.getElementById('detailed-fees-tbody');

// Calculator DOM Elements
const areaInput = document.getElementById('area-input');
const areaUnit = document.getElementById('area-unit');
const panchayatTypeSelect = document.getElementById('panchayat-type');
const buildingCategorySelect = document.getElementById('building-category');
const calculateBtn = document.getElementById('calculate-btn');
const calculationResult = document.getElementById('calculation-result');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    populateDetailedFeesTable();
    setupEventListeners();
    setupCalculatorEventListeners();
});

// Initialize tab functionality
function initializeTabs() {
    // Show the first tab by default
    showTable('grama');
}

// Setup event listeners
function setupEventListeners() {
    // Tab button event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tableType = this.getAttribute('data-type');
            showTable(tableType);
            updateActiveTab(this);
        });
    });

    // Area filter event listener
    areaFilter.addEventListener('change', function() {
        filterDetailedFees(this.value);
    });

    // Add hover effects to table rows
    addTableRowHoverEffects();
}

// Show specific table based on type
function showTable(tableType) {
    // Hide all table containers
    tableContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Show the selected table container
    const targetTable = document.getElementById(`${tableType}-table`);
    if (targetTable) {
        targetTable.classList.add('active');
    }
}

// Update active tab button
function updateActiveTab(activeButton) {
    // Remove active class from all buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to clicked button
    activeButton.classList.add('active');
}

// Populate detailed fees table
function populateDetailedFeesTable() {
    detailedFeesTableBody.innerHTML = '';

    detailedFeesData.forEach(data => {
        const row = createDetailedFeeRow(data);
        detailedFeesTableBody.appendChild(row);
    });
}

// Create a row for detailed fees table
function createDetailedFeeRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.sqft}</td>
        <td>${data.sqm}</td>
        <td>₹${data.grama.toLocaleString()}</td>
        <td>₹${data.municipality.toLocaleString()}</td>
        <td>₹${data.corporation.toLocaleString()}</td>
        <td>₹${data.permit.toLocaleString()}</td>
        <td>₹${data.development.toLocaleString()}</td>
    `;

    // Add click event for row highlighting
    row.addEventListener('click', function() {
        highlightRow(this);
    });

    return row;
}

// Filter detailed fees based on area range
function filterDetailedFees(filterValue) {
    const rows = detailedFeesTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const sqft = parseInt(row.cells[0].textContent);
        let showRow = true;

        switch (filterValue) {
            case '1000-1500':
                showRow = sqft >= 1000 && sqft <= 1500;
                break;
            case '1500-2000':
                showRow = sqft >= 1500 && sqft <= 2000;
                break;
            case '2000-2500':
                showRow = sqft >= 2000 && sqft <= 2500;
                break;
            case '2500-3000':
                showRow = sqft >= 2500 && sqft <= 3000;
                break;
            case '3000+':
                showRow = sqft >= 3000;
                break;
            case 'all':
            default:
                showRow = true;
                break;
        }

        row.style.display = showRow ? '' : 'none';
    });

    // Add fade-in animation to visible rows
    setTimeout(() => {
        const visibleRows = detailedFeesTableBody.querySelectorAll('tr[style=""], tr:not([style])');
        visibleRows.forEach((row, index) => {
            row.style.animation = `fadeIn 0.3s ease-in-out ${index * 0.05}s both`;
        });
    }, 50);
}

// Highlight clicked row
function highlightRow(row) {
    // Remove highlight from all rows
    const allRows = detailedFeesTableBody.querySelectorAll('tr');
    allRows.forEach(r => r.classList.remove('highlight-row'));

    // Add highlight to clicked row
    row.classList.add('highlight-row');

    // Remove highlight after animation
    setTimeout(() => {
        row.classList.remove('highlight-row');
    }, 2000);
}

// Add hover effects to table rows
function addTableRowHoverEffects() {
    const tables = document.querySelectorAll('.rates-table, .detailed-fees-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });

            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// Setup calculator event listeners
function setupCalculatorEventListeners() {
    calculateBtn.addEventListener('click', performCalculation);
    
    // Allow Enter key to trigger calculation
    areaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performCalculation();
        }
    });
    
    // Auto-convert units when area unit changes
    areaUnit.addEventListener('change', function() {
        if (areaInput.value) {
            const currentValue = parseFloat(areaInput.value);
            if (this.value === 'sqm' && currentValue > 500) {
                // Likely was in sq.ft, convert to sq.m
                areaInput.value = sqftToSqm(currentValue);
            } else if (this.value === 'sqft' && currentValue < 500) {
                // Likely was in sq.m, convert to sq.ft
                areaInput.value = sqmToSqft(currentValue);
            }
        }
    });
}

// Perform fee calculation
function performCalculation() {
    const area = parseFloat(areaInput.value);
    const unit = areaUnit.value;
    const panchayatType = panchayatTypeSelect.value;
    const category = buildingCategorySelect.value;
    
    // Validation
    if (!area || area <= 0) {
        alert('Please enter a valid area value');
        areaInput.focus();
        return;
    }
    
    // Convert area to square meters for calculation
    const areaSqm = unit === 'sqft' ? sqftToSqm(area) : area;
    const areaSqft = unit === 'sqm' ? sqmToSqft(area) : area;
    
    // Calculate fees
    const feeCalculation = calculateDetailedFees(areaSqm, panchayatType, category);
    
    // Display results
    displayCalculationResult(areaSqft, areaSqm, panchayatType, category, feeCalculation);
}

// Calculate detailed fees based on area and panchayat type
function calculateDetailedFees(areaSqm, panchayatType, category) {
    const rates = {
        grama: {
            residence: { '81-150': 50, '151-300': 100, '300+': 150 },
            business: { '81-150': 50, '151-300': 100, '300+': 150 },
            commercial: { '81-150': 70, '151-300': 150, '300+': 200 },
            family: { '81-150': 50, '151-300': 100, '300+': 150 }
        },
        municipality: {
            residence: { '81-150': 70, '151-300': 120, '300+': 200 },
            business: { '81-150': 70, '151-300': 120, '300+': 200 },
            commercial: { '81-150': 90, '151-300': 150, '300+': 250 },
            family: { '81-150': 70, '151-300': 120, '300+': 200 }
        },
        corporation: {
            residence: { '81-150': 100, '151-300': 150, '300+': 200 },
            business: { '81-150': 120, '151-300': 150, '300+': 200 },
            commercial: { '81-150': 100, '151-300': 170, '300+': 300 },
            family: { '81-150': 100, '151-300': 150, '300+': 200 }
        }
    };

    // Determine rate range
    let range;
    if (areaSqm <= 150) range = '81-150';
    else if (areaSqm <= 300) range = '151-300';
    else range = '300+';

    const rate = rates[panchayatType][category][range];
    const buildingPermitFee = rate * areaSqm;
    
    // Calculate development fee (typically 60% of building permit fee)
    const developmentFee = Math.round(buildingPermitFee * 0.6);
    
    // Total fee
    const totalFee = buildingPermitFee + developmentFee;
    
    return {
        rate: rate,
        range: range,
        buildingPermitFee: buildingPermitFee,
        developmentFee: developmentFee,
        totalFee: totalFee
    };
}

// Display calculation result
function displayCalculationResult(areaSqft, areaSqm, panchayatType, category, calculation) {
    // Update result values
    document.getElementById('result-area').textContent = `${areaSqft.toFixed(1)} sq.ft (${areaSqm.toFixed(1)} sq.m)`;
    document.getElementById('result-panchayat').textContent = getPanchayatDisplayName(panchayatType);
    document.getElementById('result-category').textContent = getCategoryDisplayName(category);
    document.getElementById('result-rate').textContent = `₹${calculation.rate}/sq.m`;
    document.getElementById('result-permit-fee').textContent = `₹${calculation.buildingPermitFee.toLocaleString()}`;
    document.getElementById('result-development-fee').textContent = `₹${calculation.developmentFee.toLocaleString()}`;
    document.getElementById('result-total-fee').textContent = `₹${calculation.totalFee.toLocaleString()}`;
    
    // Show result section with animation
    calculationResult.style.display = 'block';
    calculationResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper function to get panchayat display name
function getPanchayatDisplayName(type) {
    const names = {
        grama: 'Grama Panchayat',
        municipality: 'Municipality',
        corporation: 'Corporation'
    };
    return names[type] || type;
}

// Helper function to get category display name
function getCategoryDisplayName(category) {
    const names = {
        residence: 'താമസം (Residence)',
        business: 'വ്യാപാരം (Business)',
        commercial: 'വാണിജ്യം (Commercial)',
        family: 'കുടുംബ (Family)'
    };
    return names[category] || category;
}

// Legacy calculate fees function (kept for compatibility)
function calculateFees(area, panchayatType, category = 'residence') {
    const calculation = calculateDetailedFees(area, panchayatType, category);
    return calculation.buildingPermitFee;
}

// Search functionality (can be extended)
function searchTable(searchTerm) {
    const tables = document.querySelectorAll('.rates-table tbody tr, .detailed-fees-table tbody tr');
    
    tables.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        row.style.display = matches ? '' : 'none';
    });
}

// Export functionality (can be extended)
function exportToCSV() {
    const table = document.querySelector('.detailed-fees-table');
    const rows = table.querySelectorAll('tr');
    let csvContent = '';

    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => cell.textContent.trim());
        csvContent += rowData.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panchayat_fees.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Utility function to convert sq.ft to sq.m
function sqftToSqm(sqft) {
    return Math.round(sqft * 0.092903 * 100) / 100;
}

// Utility function to convert sq.m to sq.ft
function sqmToSqft(sqm) {
    return Math.round(sqm * 10.7639 * 100) / 100;
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Performance optimization: Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-btn.active');
        const tabs = Array.from(tabButtons);
        const currentIndex = tabs.indexOf(activeTab);
        
        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabs[newIndex].click();
        tabs[newIndex].focus();
    }
});

// Add loading state management
function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Initialize tooltips for better UX (can be extended)
function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Setup calculator event listeners
function setupCalculatorEventListeners() {
    calculateBtn.addEventListener('click', performCalculation);
    
    // Allow Enter key to trigger calculation
    areaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performCalculation();
        }
    });
    
    // Auto-convert units when area unit changes
    areaUnit.addEventListener('change', function() {
        if (areaInput.value) {
            const currentValue = parseFloat(areaInput.value);
            if (this.value === 'sqm' && currentValue > 500) {
                // Likely was in sq.ft, convert to sq.m
                areaInput.value = sqftToSqm(currentValue);
            } else if (this.value === 'sqft' && currentValue < 500) {
                // Likely was in sq.m, convert to sq.ft
                areaInput.value = sqmToSqft(currentValue);
            }
        }
    });
}

// Perform fee calculation
function performCalculation() {
    const area = parseFloat(areaInput.value);
    const unit = areaUnit.value;
    const panchayatType = panchayatTypeSelect.value;
    const category = buildingCategorySelect.value;
    
    // Validation
    if (!area || area <= 0) {
        alert('Please enter a valid area value');
        areaInput.focus();
        return;
    }
    
    // Convert area to square meters for calculation
    const areaSqm = unit === 'sqft' ? sqftToSqm(area) : area;
    const areaSqft = unit === 'sqm' ? sqmToSqft(area) : area;
    
    // Calculate fees
    const feeCalculation = calculateDetailedFees(areaSqm, panchayatType, category);
    
    // Display results
    displayCalculationResult(areaSqft, areaSqm, panchayatType, category, feeCalculation);
}

// Calculate detailed fees based on area and panchayat type
function calculateDetailedFees(areaSqm, panchayatType, category) {
    const rates = {
        grama: {
            residence: { '81-150': 50, '151-300': 100, '300+': 150 },
            business: { '81-150': 50, '151-300': 100, '300+': 150 },
            commercial: { '81-150': 70, '151-300': 150, '300+': 200 },
            family: { '81-150': 50, '151-300': 100, '300+': 150 }
        },
        municipality: {
            residence: { '81-150': 70, '151-300': 120, '300+': 200 },
            business: { '81-150': 70, '151-300': 120, '300+': 200 },
            commercial: { '81-150': 90, '151-300': 150, '300+': 250 },
            family: { '81-150': 70, '151-300': 120, '300+': 200 }
        },
        corporation: {
            residence: { '81-150': 100, '151-300': 150, '300+': 200 },
            business: { '81-150': 120, '151-300': 150, '300+': 200 },
            commercial: { '81-150': 100, '151-300': 170, '300+': 300 },
            family: { '81-150': 100, '151-300': 150, '300+': 200 }
        }
    };

    // Determine rate range
    let range;
    if (areaSqm <= 150) range = '81-150';
    else if (areaSqm <= 300) range = '151-300';
    else range = '300+';

    const rate = rates[panchayatType][category][range];
    const buildingPermitFee = Math.round(rate * areaSqm);
    
    // Calculate development fee (typically 60% of building permit fee)
    const developmentFee = Math.round(buildingPermitFee * 0.6);
    
    // Total fee
    const totalFee = buildingPermitFee + developmentFee;
    
    return {
        rate: rate,
        range: range,
        buildingPermitFee: buildingPermitFee,
        developmentFee: developmentFee,
        totalFee: totalFee
    };
}

// Display calculation result
function displayCalculationResult(areaSqft, areaSqm, panchayatType, category, calculation) {
    // Update result values
    document.getElementById('result-area').textContent = `${areaSqft.toFixed(1)} sq.ft (${areaSqm.toFixed(1)} sq.m)`;
    document.getElementById('result-panchayat').textContent = getPanchayatDisplayName(panchayatType);
    document.getElementById('result-category').textContent = getCategoryDisplayName(category);
    document.getElementById('result-rate').textContent = `₹${calculation.rate}/sq.m`;
    document.getElementById('result-permit-fee').textContent = `₹${calculation.buildingPermitFee.toLocaleString()}`;
    document.getElementById('result-development-fee').textContent = `₹${calculation.developmentFee.toLocaleString()}`;
    document.getElementById('result-total-fee').textContent = `₹${calculation.totalFee.toLocaleString()}`;
    
    // Show result section with animation
    calculationResult.style.display = 'block';
    calculationResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper function to get panchayat display name
function getPanchayatDisplayName(type) {
    const names = {
        grama: 'Grama Panchayat',
        municipality: 'Municipality',
        corporation: 'Corporation'
    };
    return names[type] || type;
}

// Helper function to get category display name
function getCategoryDisplayName(category) {
    const names = {
        residence: 'താമസം (Residence)',
        business: 'വ്യാപാരം (Business)',
        commercial: 'വാണിജ്യം (Commercial)',
        family: 'കുടുംബ (Family)'
    };
    return names[category] || category;
} 