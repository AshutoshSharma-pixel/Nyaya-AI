// Lawyer Database for Nyaya AI Matching System

const LawyerDatabase = [
    // --- DELHI ---
    {
        id: "DEL001",
        name: "Adv. Rajesh Kumar",
        city: "New Delhi",
        specialization: "Criminal Lawyer",
        experience: "15 years",
        courts: ["Supreme Court", "Delhi High Court", "Patiala House Court"],
        rating: 4.8,
        winRatio: "92%",
        fees: "₹5000 - ₹15000 per hearing",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        languages: ["English", "Hindi", "Punjabi"]
    },
    {
        id: "DEL002",
        name: "Adv. Meera Chawla",
        city: "New Delhi",
        specialization: "Family Lawyer", // Divorce, Domestic Violence
        experience: "12 years",
        courts: ["Delhi High Court", "Saket District Court"],
        rating: 4.9,
        winRatio: "88%",
        fees: "₹3000 - ₹10000 per hearing",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        languages: ["English", "Hindi"]
    },
    {
        id: "DEL003",
        name: "Adv. Suresh Gupta",
        city: "New Delhi",
        specialization: "Civil Lawyer", // Property, Cheque Bounce
        experience: "20 years",
        courts: ["Tis Hazari Court", "Delhi High Court"],
        rating: 4.6,
        winRatio: "85%",
        fees: "₹4000 - ₹12000 per hearing",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        languages: ["English", "Hindi"]
    },
    {
        id: "DEL004",
        name: "Adv. Arjun Singh",
        city: "New Delhi",
        specialization: "Cyber Crime Lawyer", // Cyber fraud, harassment
        experience: "8 years",
        courts: ["Delhi High Court", "Cyber Appellate Tribunal"],
        rating: 4.7,
        winRatio: "90%",
        fees: "₹5000 - ₹20000 per consultation",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
        languages: ["English", "Hindi"]
    },

    // --- MUMBAI ---
    {
        id: "MUM001",
        name: "Adv. Priya Desai",
        city: "Mumbai",
        specialization: "Corporate Lawyer",
        experience: "10 years",
        courts: ["Bombay High Court", "NCLT"],
        rating: 4.9,
        winRatio: "95%",
        fees: "₹10000 - ₹30000 per hearing",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        languages: ["English", "Marathi", "Gujarati"]
    },
    {
        id: "MUM002",
        name: "Adv. Rohan Patil",
        city: "Mumbai",
        specialization: "Criminal Lawyer",
        experience: "18 years",
        courts: ["Bombay High Court", "Sessions Court"],
        rating: 4.7,
        winRatio: "89%",
        fees: "₹7000 - ₹20000 per hearing",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        languages: ["English", "Hindi", "Marathi"]
    },
    {
        id: "MUM003",
        name: "Adv. Anjali Mehta",
        city: "Mumbai",
        specialization: "Property Lawyer",
        experience: "14 years",
        courts: ["Bombay High Court", "Small Causes Court"],
        rating: 4.8,
        winRatio: "91%",
        fees: "₹5000 - ₹15000 per hearing",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        languages: ["English", "Hindi", "Gujarati"]
    },

    // --- BANGALORE ---
    {
        id: "BLR001",
        name: "Adv. Karthik Reddy",
        city: "Bangalore",
        specialization: "Cyber Crime Lawyer",
        experience: "9 years",
        courts: ["Karnataka High Court", "Cyber Crime Station"],
        rating: 4.8,
        winRatio: "93%",
        fees: "₹6000 - ₹18000 per consultation",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        languages: ["English", "Kannada", "Telugu"]
    },
    {
        id: "BLR002",
        name: "Adv. Deepa Rao",
        city: "Bangalore",
        specialization: "Family Lawyer", // Divorce, Custody
        experience: "11 years",
        courts: ["Karnataka High Court", "Family Court"],
        rating: 4.7,
        winRatio: "87%",
        fees: "₹4000 - ₹12000 per hearing",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        languages: ["English", "Kannada", "Tamil"]
    },
    {
        id: "BLR003",
        name: "Adv. Vivek Murthy",
        city: "Bangalore",
        specialization: "Civil Lawyer",
        experience: "22 years",
        courts: ["Karnataka High Court", "City Civil Court"],
        rating: 4.6,
        winRatio: "84%",
        fees: "₹5000 - ₹15000 per hearing",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        languages: ["English", "Kannada"]
    },

    // --- CHENNAI ---
    {
        id: "CHE001",
        name: "Adv. R. Venkatesh",
        city: "Chennai",
        specialization: "Criminal Lawyer",
        experience: "25 years",
        courts: ["Madras High Court"],
        rating: 4.9,
        winRatio: "94%",
        fees: "₹8000 - ₹25000 per hearing",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
        languages: ["English", "Tamil"]
    },
    {
        id: "CHE002",
        name: "Adv. Lakshmi Narayanan",
        city: "Chennai",
        specialization: "Civil Lawyer",
        experience: "16 years",
        courts: ["Madras High Court"],
        rating: 4.7,
        winRatio: "88%",
        fees: "₹4000 - ₹12000 per hearing",
        image: "https://randomuser.me/api/portraits/women/11.jpg",
        languages: ["English", "Tamil", "Telugu"]
    }
];

// Helper to find lawyers
window.findLawyers = function (specialization, city) {
    // 1. Filter by specialization (Essential)
    let matches = LawyerDatabase.filter(lawyer =>
        lawyer.specialization.toLowerCase().includes(specialization.toLowerCase()) ||
        specialization.toLowerCase().includes(lawyer.specialization.toLowerCase())
    );

    // 2. Filter by city (Preferred) - if no matches in city, show others with specialization
    const cityMatches = matches.filter(lawyer => lawyer.city.toLowerCase() === city.toLowerCase());

    if (cityMatches.length > 0) {
        return cityMatches;
    } else {
        // If no direct city match, return top rated from other cities but same specialization
        return matches.sort((a, b) => b.rating - a.rating).slice(0, 3);
    }
};

window.LawyerDatabase = LawyerDatabase;
