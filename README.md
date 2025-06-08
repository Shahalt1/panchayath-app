# Panchayat House Permit Fee Calculator

A web-based application for calculating building permit fees in Kerala's local self-government system (Panchayat). This tool helps users calculate construction permit fees for different types of local bodies including Grama Panchayat, Municipality, and Corporation.

## 🏗️ Project Overview

This calculator is designed for Kerala Local Self Government Department to provide transparent and accurate fee calculations for building permits across different administrative levels. The application supports multiple building categories and area-based fee structures.

## ✨ Features

### Fee Calculation
- **Multi-tier Government Support**: Calculate fees for Grama Panchayat, Municipality, and Corporation
- **Multiple Building Categories**: 
  - താമസം (Residence)
  - വ്യാപാരം (Business)
  - വാണിജ്യം (Commercial)
  - കുടുംബ (Family)
- **Flexible Area Input**: Support for both square feet and square meter inputs
- **Detailed Breakdown**: Shows permit fees, development charges, and total costs

### Interactive Features
- **Dynamic Fee Tables**: Switch between different local body types with tabbed interface
- **Area-based Filtering**: Filter detailed fee tables by area ranges
- **Real-time Calculation**: Instant fee calculation with detailed breakdown
- **Export Functionality**: Export fee data to CSV format
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Experience
- **Bilingual Support**: Malayalam and English labels
- **Interactive Tables**: Hover effects and row highlighting
- **Search Functionality**: Search through fee tables
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Loading Indicators**: Visual feedback during calculations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download this repository
```bash
git clone <repository-url>
cd panchayath-app
```

2. Open `index.html` in your web browser
```bash
# For local development, you can use a simple HTTP server
python -m http.server 8000
# or
npx serve .
```

3. Navigate to `http://localhost:8000` in your browser

## 📖 How to Use

### 1. Select Panchayat Type
- Choose from Grama Panchayat, Municipality, or Corporation tabs
- View the corresponding fee structure table

### 2. Use the Calculator
- Enter the building area (supports both sq ft and sq m)
- Select the panchayat type from dropdown
- Choose building category
- Click "Calculate" to get detailed fee breakdown

### 3. Browse Detailed Fee Tables
- View pre-calculated fees for common area ranges
- Use the area filter to narrow down results
- Click on rows for highlighting
- Export data to CSV if needed

## 📁 Project Structure

```
panchayath-app/
├── index.html              # Main HTML file
├── style.css              # Styling and responsive design
├── script.js              # JavaScript functionality
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── assets/               # Additional files
    ├── area for panjayath house-2.pdf
    └── panchayath area ratings.jpg
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: Interactive functionality without external dependencies

### Key Features Implementation
- **Tab System**: Dynamic content switching between different panchayat types
- **Fee Calculation Engine**: Comprehensive algorithm for different area slabs and categories
- **Data Filtering**: Client-side filtering for better user experience
- **Export Functionality**: CSV generation for data portability
- **Responsive Design**: Mobile-first approach with breakpoints

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 💡 Usage Examples

### Calculate Residential Permit Fee
1. Enter area: 1500 sq ft
2. Select: Grama Panchayat
3. Category: താമസം (Residence)
4. Result: Detailed breakdown with permit fee, development charge, and total

### Compare Fees Across Different Bodies
1. Use the tabbed interface to switch between Grama Panchayat, Municipality, and Corporation
2. Compare rates in the fee structure tables
3. Use the calculator to get exact figures for your specific case

## 📊 Fee Structure

The application includes comprehensive fee structures for:

### Area Ranges
- 81-150 m² (871.88 - 1614.59 Sq feet)
- 151-300 m² (1614.59 - 3229.17 Sq feet)  
- 300 m² onwards (3229.17+ Sq feet)

### Rate Categories
Different rates apply based on building usage and local body type, with percentage-based calculations for different area slabs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is developed for Kerala Local Self Government Department. Please contact the department for usage permissions and licensing information.

## 📞 Support

For technical support or questions about fee calculations, please contact:
- Kerala Local Self Government Department
- Local Panchayat offices for specific queries

## 🔄 Version History

- **v1.0.0**: Initial release with basic fee calculation functionality
- Supports Grama Panchayat, Municipality, and Corporation fee structures
- Interactive web interface with responsive design

---

**Note**: This calculator provides estimates based on current fee structures. For official permit applications, please consult with your local Panchayat office for the most up-to-date rates and requirements. 