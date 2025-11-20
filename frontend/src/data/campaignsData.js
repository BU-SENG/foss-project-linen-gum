import cleanWaterImage from '../assets/images/children.png';
import educationImage from '../assets/images/books.png';
import medicalSuppliesImage from '../assets/images/medical.png';
import animalShelterImage from '../assets/images/cat.png';

export const campaignsData = [
  {
    id: 1,
    title: "Emergency Relief for Natural Disaster Victims",
    description:
      "Provide immediate assistance to victims of recent natural disasters. Your donation will help with food, shelter, medical care, and rebuilding efforts.",
    organizer: "Global Relief",
    goal: 100000,
    raised: 87500,
    image: cleanWaterImage,
    category: "Emergency Response",
    donors: 1240,
    daysLeft: 5,
    isApproved: true,
    location: "London",
  },
  {
    id: 2,
    title: "Medical Supplies for Rural Clinics",
    description:
      "Help us provide essential medical supplies to understaffed and under-resourced rural clinics. Your donation will save lives.",
    organizer: "Healthcare for All",
    goal: 30000,
    raised: 12750,
    image: medicalSuppliesImage,
    category: "Healthcare",
    donors: 85,
    daysLeft: 45,
    isApproved: true,
    location: "Nigeria",
  },
  {
    id: 3,
    title: "Education for Underprivileged Children",
    description:
      "Support our mission to provide quality education to underprivileged children. Your donation will fund school supplies, teacher salaries, and infrastructure improvements.",
    organizer: "Education First",
    goal: 75000,
    raised: 45200,
    image: educationImage,
    category: "Education",
    donors: 302,
    daysLeft: 30,
    isApproved: true,
    createdAt: "2025-10-15",
    location: "Global",
  },
  {
    id: 4,
    title: "Animal Shelter Renovation",
    description:
      "Our animal shelter needs urgent repairs and upgrades to continue providing safe housing for abandoned pets. Help us create a better environment for animals awaiting their forever homes.",
    organizer: "Animal Rescue League",
    goal: 25000,
    raised: 8300,
    image: animalShelterImage,
    category: "Animal Welfare",
    donors: 124,
    daysLeft: 60,
    isApproved: true,
    location: "Nigeria",
  },
  {
    id: 5,
    title: "Clean Water for Rural Communities",
    description:
      "Help us provide clean drinking water to rural communities in need. Your donation will fund well construction and water purification systems.",
    organizer: "Water Aid Foundation",
    goal: 50000,
    raised: 32450,
    image: cleanWaterImage,
    category: "Water & Sanitation",
    donors: 215,
    daysLeft: 12,
    isApproved: true,
    location: "America",
  },
];

export const categories = [
  "All Categories",
  "Education",
  "Health",
  "Technology",
  "Environment",
  "Community",
  "Business",
  "Charity",
  "Art",
  "Other",
];
