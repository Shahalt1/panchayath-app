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

// Calculator DOM Elements
const areaInput = document.getElementById('area-input');
const areaUnit = document.getElementById('area-unit');
const panchayatTypeSelect = document.getElementById('panchayat-type');
const buildingCategorySelect = document.getElementById('building-category');
const calculateBtn = document.getElementById('calculate-btn');
const calculationResult = document.getElementById('calculation-result');

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    setupCalculatorEventListeners();
});

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
    
    // Convert area to square feet for calculation
    const areaSqft = unit === 'sqm' ? sqmToSqft(area) : area;
    const areaSqm = unit === 'sqft' ? sqftToSqm(area) : area;
    
    // Calculate fees
    const feeCalculation = calculateDetailedFees(areaSqft, panchayatType, category);
    
    // Display results
    displayCalculationResult(areaSqft, areaSqm, panchayatType, category, feeCalculation);
}

// Calculate detailed fees based on area and panchayat type
function calculateDetailedFees(areaSqft, panchayatType, category) {
    // Find the closest area in detailedFeesData
    let closestEntry = detailedFeesData.reduce((prev, curr) => {
        return (Math.abs(curr.sqft - areaSqft) < Math.abs(prev.sqft - areaSqft)) ? curr : prev;
    });

    // If area is outside the data range, extrapolate
    if (areaSqft < detailedFeesData[0].sqft) {
        closestEntry = {...detailedFeesData[0]};
        const scaleFactor = areaSqft / detailedFeesData[0].sqft;
        closestEntry.sqft = areaSqft;
        closestEntry.sqm = sqftToSqm(areaSqft);
        closestEntry.grama = Math.round(detailedFeesData[0].grama * scaleFactor);
        closestEntry.municipality = Math.round(detailedFeesData[0].municipality * scaleFactor);
        closestEntry.corporation = Math.round(detailedFeesData[0].corporation * scaleFactor);
        closestEntry.permit = Math.round(detailedFeesData[0].permit * scaleFactor);
    } else if (areaSqft > detailedFeesData[detailedFeesData.length - 1].sqft) {
        closestEntry = {...detailedFeesData[detailedFeesData.length - 1]};
        const scaleFactor = areaSqft / detailedFeesData[detailedFeesData.length - 1].sqft;
        closestEntry.sqft = areaSqft;
        closestEntry.sqm = sqftToSqm(areaSqft);
        closestEntry.grama = Math.round(detailedFeesData[detailedFeesData.length - 1].grama * scaleFactor);
        closestEntry.municipality = Math.round(detailedFeesData[detailedFeesData.length - 1].municipality * scaleFactor);
        closestEntry.corporation = Math.round(detailedFeesData[detailedFeesData.length - 1].corporation * scaleFactor);
        closestEntry.permit = Math.round(detailedFeesData[detailedFeesData.length - 1].permit * scaleFactor);
    }

    // Application Fee
    const applicationFee = areaSqft > 3000 ? 1500 : 500;

    // Permit Fee (from detailedFeesData)
    const permitFee = closestEntry.permit;

    // Total Permit Fee
    const totalPermitFee = applicationFee + permitFee;

    // Number (Reg:) Fee based on panchayat type
    const numberRegFee = panchayatType === 'grama' ? closestEntry.grama :
                        panchayatType === 'municipality' ? closestEntry.municipality :
                        closestEntry.corporation;

    // Labour Cess
    let labourCess = 0;
    if (areaSqft === 1077) {
        labourCess = 0;
    } else if (areaSqft >= 1151 && areaSqft <= 2152) {
        labourCess = Math.round(numberRegFee * 1.87);
    } else if (areaSqft >= 2153) {
        labourCess = Math.round(numberRegFee * 1.1);
    }

    // Building Tax
    const baseBuildingTaxRate = 0.56; // ~0.56 per Sq.F.
    let buildingTax = Math.round(areaSqft * baseBuildingTaxRate);
    if (areaSqft > 3000) {
        buildingTax += 5000; // Surcharge for areas above 3000 Sq.F.
    }
    // Adjust Building Tax by panchayat type percentage
    const buildingTaxMultiplier = panchayatType === 'grama' ? 0.3333 :
                                 panchayatType === 'municipality' ? 0.4 : 0.5;
    buildingTax = Math.round(buildingTax * buildingTaxMultiplier);

    // One Time Tax (for Village)
    let oneTimeTax = 0;
    if (areaSqft <= 1614) {
        oneTimeTax = 1950;
    } else if (areaSqft <= 2152) {
        oneTimeTax = 3900;
    } else {
        oneTimeTax = 7800;
        if (areaSqft > 2700) {
            const excessArea = Math.floor((areaSqft - 2700) / 100);
            oneTimeTax += excessArea * 1560;
        }
    }
    // Adjust One Time Tax by panchayat type percentage
    const oneTimeTaxMultiplier = panchayatType === 'grama' ? 0.3333 : 0.25;
    oneTimeTax = Math.round(oneTimeTax * oneTimeTaxMultiplier);

    // Total Numbering Fee
    const totalNumberingFee = numberRegFee + labourCess + buildingTax + oneTimeTax + applicationFee;

    return {
        applicationFee: applicationFee,
        permitFee: permitFee,
        totalPermitFee: totalPermitFee,
        numberRegFee: numberRegFee,
        labourCess: labourCess,
        buildingTax: buildingTax,
        oneTimeTax: oneTimeTax,
        totalNumberingFee: totalNumberingFee
    };
}

// Display calculation result
function displayCalculationResult(areaSqft, areaSqm, panchayatType, category, calculation) {
    document.getElementById('result-area').textContent = `${areaSqft.toFixed(1)} sq.ft (${areaSqm.toFixed(1)} sq.m)`;
    document.getElementById('result-panchayat').textContent = getPanchayatDisplayName(panchayatType);
    document.getElementById('result-category').textContent = getCategoryDisplayName(category);
    document.getElementById('result-application-fee').textContent = `₹${calculation.applicationFee.toLocaleString()}`;
    document.getElementById('result-permit-fee').textContent = `₹${calculation.permitFee.toLocaleString()}`;
    document.getElementById('result-numbering-fee').textContent = `₹${calculation.numberRegFee.toLocaleString()}`;
    document.getElementById('result-labour-cess').textContent = `₹${calculation.labourCess.toLocaleString()}`;
    document.getElementById('result-building-tax').textContent = `₹${calculation.buildingTax.toLocaleString()}`;
    document.getElementById('result-one-time-tax').textContent = `₹${calculation.oneTimeTax.toLocaleString()}`;
    document.getElementById('result-total-numbering-fee').textContent = `₹${calculation.totalNumberingFee.toLocaleString()}`;
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
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-btn.active');
        const tabs = Array.from(document.querySelectorAll('.tab-btn'));
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

// Initialize tooltips for better UX
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