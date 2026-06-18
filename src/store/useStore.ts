import { create } from "zustand";

export interface Project {
  id: string;
  coverImage: string;
  title: string;
  clubId: string;
  clubName: string;
  avenueOfService: 
    | "Club Service"
    | "Community Service"
    | "Professional Development"
    | "International Service"
    | "Public Relations"
    | "Public Image"
    | "Next Gen";
  areaOfFocus:
    | "Peacebuilding"
    | "Disease Prevention"
    | "Water & Sanitation"
    | "Maternal & Child Health"
    | "Education & Literacy"
    | "Community Economic Development"
    | "Environmental Support";
  beneficiaries: number;
  volunteerHours: number;
  impactScore: number; // 1-100
  uploadDate: string; // ISO String
  description: string;
  location: string;
  zone: string;
  contributions: number; // in INR
  volunteerCount: number;
}

export interface Club {
  id: string;
  name: string;
  logo: string;
  president: string;
  charterYear: string;
  memberCount: number;
  totalProjects: number;
  totalPoints: number;
  zone: string;
  description: string;
  email: string;
}

interface DistrictStats {
  totalProjects: number;
  totalVolunteers: number;
  totalBeneficiaries: number;
  volunteerHours: number;
  contributions: number; // in INR
  activeClubs: number;
}

interface LeaderboardStats {
  clubRankings: Club[];
  projectRankings: Project[];
}

interface StoreState {
  projects: Project[];
  clubs: Club[];
  stats: DistrictStats;
  
  // Filter states
  projectFilters: {
    search: string;
    club: string;
    avenue: string;
    focus: string;
    zone: string;
    date: string; // "all", "recent", "older"
  };
  
  clubFilters: {
    search: string;
    zone: string;
  };
  
  // Actions
  setProjectFilter: (key: string, value: string) => void;
  resetProjectFilters: () => void;
  setClubFilter: (key: string, value: string) => void;
  resetClubFilters: () => void;
  
  // Selected Project for detail modal
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

// Helper to generate premium nature/ocean visual gradients or placeholders
const oceanImage = (id: number) => {
  const ids = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Sunny beach
    "https://images.unsplash.com/photo-1473116763269-255ea7b2b5f1?auto=format&fit=crop&w=800&q=80", // Island current
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80", // Coral reef deep
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80", // Wave crest
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80", // Deep navy ocean glow
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", // Sunlight refraction underwater
    "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80", // Ocean current ripples
    "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=800&q=80", // Sea surface shine
    "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=80", // Cosmic blue ripple
    "https://images.unsplash.com/photo-1520113805175-e5eb463e7925?auto=format&fit=crop&w=800&q=80"  // Coastal waves
  ];
  return ids[id % ids.length];
};

const mockClubs: Club[] = [
  {
    id: "club-1",
    name: "Rotaract Club of Bengaluru South",
    logo: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Ananya Sharma",
    charterYear: "2012",
    memberCount: 45,
    totalProjects: 32,
    totalPoints: 1250,
    zone: "Zone 1",
    description: "One of the oldest community-based clubs in the district, focused on rural literacy and water conservation.",
    email: "south.rotaract@gmail.com",
  },
  {
    id: "club-2",
    name: "Rotaract Club of RV College of Engineering",
    logo: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Rohan Kamath",
    charterYear: "2015",
    memberCount: 120,
    totalProjects: 45,
    totalPoints: 1580,
    zone: "Zone 1",
    description: "An institution-based powerhouse leveraging technical skills for rural development and smart solutions.",
    email: "rotaract.rvce@rvce.edu.in",
  },
  {
    id: "club-3",
    name: "Rotaract Club of Indira Nagar",
    logo: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Vikram Aditya",
    charterYear: "2018",
    memberCount: 38,
    totalProjects: 28,
    totalPoints: 1420,
    zone: "Zone 2",
    description: "A community-based club bringing together young professionals to solve urban waste and mental health issues.",
    email: "indiranagar.rotaract@gmail.com",
  },
  {
    id: "club-4",
    name: "Rotaract Club of PES University",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Meghna Iyer",
    charterYear: "2019",
    memberCount: 140,
    totalProjects: 39,
    totalPoints: 1100,
    zone: "Zone 2",
    description: "Driving large-scale blood donation drives and stem cell registry programs across campuses.",
    email: "rotaract@pes.edu",
  },
  {
    id: "club-5",
    name: "Rotaract Club of Tumakuru Elite",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Siddarth Gowda",
    charterYear: "2020",
    memberCount: 30,
    totalProjects: 24,
    totalPoints: 980,
    zone: "Zone 3",
    description: "Committed to raising awareness for organic farming and installing solar street lamps in rural Tumakuru.",
    email: "tumakuru.elite@yahoo.com",
  },
  {
    id: "club-6",
    name: "Rotaract Club of Jayanagar",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Kavya Shree",
    charterYear: "2014",
    memberCount: 55,
    totalProjects: 36,
    totalPoints: 1350,
    zone: "Zone 1",
    description: "Active in organizing career development seminars and women empowerment workshops in suburban communities.",
    email: "jayanagar.rotaract@outlook.com",
  },
  {
    id: "club-7",
    name: "Rotaract Club of Kengeri Central",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Harish Kumar",
    charterYear: "2021",
    memberCount: 28,
    totalProjects: 18,
    totalPoints: 720,
    zone: "Zone 3",
    description: "Focuses on afforestation campaigns and creating butterfly corridors along highways.",
    email: "kengeri.central@gmail.com",
  },
  {
    id: "club-8",
    name: "Rotaract Club of Bengaluru West",
    logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80",
    president: "Rtr. Sneha Patel",
    charterYear: "2011",
    memberCount: 50,
    totalProjects: 41,
    totalPoints: 1610,
    zone: "Zone 2",
    description: "Spearheading vocational training and providing digital literacy labs for underprivileged children.",
    email: "west.rotaract@gmail.com",
  }
];

const mockProjects: Project[] = [
  {
    id: "project-1",
    coverImage: oceanImage(0),
    title: "Project Jal Dhara: Water Purification Initiative",
    clubId: "club-1",
    clubName: "Rotaract Club of Bengaluru South",
    avenueOfService: "Community Service",
    areaOfFocus: "Water & Sanitation",
    beneficiaries: 12000,
    volunteerHours: 350,
    impactScore: 98,
    uploadDate: "2026-01-15T08:00:00Z",
    description: "Project Jal Dhara involved installing low-cost, gravity-fed water purifiers in five drought-prone villages around District 3192. These filtration setups provide safe, chemical-free drinking water, resolving long-standing waterborne disease issues. Rotaract volunteers conducted training seminars on hygiene and filter maintenance to ensure long-term community ownership.",
    location: "Kanakapura Rural, Karnataka",
    zone: "Zone 1",
    contributions: 150000,
    volunteerCount: 30,
  },
  {
    id: "project-2",
    coverImage: oceanImage(1),
    title: "Project Shanti: Peer Counselling Network",
    clubId: "club-3",
    clubName: "Rotaract Club of Indira Nagar",
    avenueOfService: "Professional Development",
    areaOfFocus: "Peacebuilding",
    beneficiaries: 3500,
    volunteerHours: 520,
    impactScore: 92,
    uploadDate: "2026-02-10T12:00:00Z",
    description: "Recognizing the post-pandemic mental health crisis among students, Project Shanti established a network of trained peer counselors across 12 colleges. Collaborating with certified psychologists, our volunteers organized offline workshops, interactive listening booths, and launched a 24/7 anonymous support line.",
    location: "Bengaluru Urban, Karnataka",
    zone: "Zone 2",
    contributions: 60000,
    volunteerCount: 45,
  },
  {
    id: "project-3",
    coverImage: oceanImage(2),
    title: "Ripples of Literacy: Rural Smart Labs",
    clubId: "club-2",
    clubName: "Rotaract Club of RV College of Engineering",
    avenueOfService: "Club Service",
    areaOfFocus: "Education & Literacy",
    beneficiaries: 8500,
    volunteerHours: 780,
    impactScore: 96,
    uploadDate: "2026-01-05T09:00:00Z",
    description: "An institution-wide collection drive and technical refurbishment initiative. RVCE Rotaract volunteers collected 60+ decommissioned desktop systems, refurbished them, loaded open-source educational software, and installed fully operational computer labs in three rural government primary schools.",
    location: "Channapatna Taluk, Karnataka",
    zone: "Zone 1",
    contributions: 280000,
    volunteerCount: 80,
  },
  {
    id: "project-4",
    coverImage: oceanImage(3),
    title: "Ocean Blue: Lake Restoration Campaign",
    clubId: "club-7",
    clubName: "Rotaract Club of Kengeri Central",
    avenueOfService: "Community Service",
    areaOfFocus: "Environmental Support",
    beneficiaries: 25000,
    volunteerHours: 900,
    impactScore: 95,
    uploadDate: "2026-03-20T10:00:00Z",
    description: "In response to urban lake degradation, Rotaractors joined hands with local environmentalists to restore an offset channel. The campaign involved floating reed islands (bio-mimicry filtration), waste cleanups, and creating a protective bund lined with indigenous saplings to restore local bird biodiversity.",
    location: "Kengeri Suburban, Karnataka",
    zone: "Zone 3",
    contributions: 350000,
    volunteerCount: 110,
  },
  {
    id: "project-5",
    coverImage: oceanImage(4),
    title: "Project Suraksha: Cervical Cancer Awareness",
    clubId: "club-8",
    clubName: "Rotaract Club of Bengaluru West",
    avenueOfService: "Community Service",
    areaOfFocus: "Disease Prevention",
    beneficiaries: 6000,
    volunteerHours: 400,
    impactScore: 92,
    uploadDate: "2026-02-15T14:30:00Z",
    description: "A comprehensive health drive that distributed informational booklets, conducted 10 rural health camps with certified gynecologists, and sponsored HPV vaccines for 50 young girls from low-income households.",
    location: "Kolar, Karnataka",
    zone: "Zone 2",
    contributions: 200000,
    volunteerCount: 25,
  },
  {
    id: "project-6",
    coverImage: oceanImage(5),
    title: "Project Ignite: Youth Business Incubator",
    clubId: "club-6",
    clubName: "Rotaract Club of Jayanagar",
    avenueOfService: "Professional Development",
    areaOfFocus: "Community Economic Development",
    beneficiaries: 1800,
    volunteerHours: 450,
    impactScore: 89,
    uploadDate: "2026-04-01T11:00:00Z",
    description: "Project Ignite hosted a 3-week startup incubator for aspiring entrepreneurs from municipal colleges. It featured mentorship sessions by venture capitalists, business modeling workshops, and a final pitch day where three teams received seed funding of INR 50,000 each.",
    location: "Jayanagar, Bengaluru",
    zone: "Zone 1",
    contributions: 180000,
    volunteerCount: 18,
  },
  {
    id: "project-7",
    coverImage: oceanImage(6),
    title: "GlobeConnect: Indo-German Youth Exchange",
    clubId: "club-3",
    clubName: "Rotaract Club of Indira Nagar",
    avenueOfService: "International Service",
    areaOfFocus: "Peacebuilding",
    beneficiaries: 500,
    volunteerHours: 250,
    impactScore: 88,
    uploadDate: "2026-04-18T16:00:00Z",
    description: "A digital international collaboration with the Rotaract Club of Munich. The virtual summit focused on UN Sustainable Development Goals, cultural presentations, and joint fund-raising for an environmental project in East Africa.",
    location: "Online / Munich Hub",
    zone: "Zone 2",
    contributions: 50000,
    volunteerCount: 15,
  },
  {
    id: "project-8",
    coverImage: oceanImage(7),
    title: "Project Hope: NICU Equipment Sponsorship",
    clubId: "club-8",
    clubName: "Rotaract Club of Bengaluru West",
    avenueOfService: "Community Service",
    areaOfFocus: "Maternal & Child Health",
    beneficiaries: 4000,
    volunteerHours: 180,
    impactScore: 98,
    uploadDate: "2026-02-01T08:00:00Z", // Equal impactScore as Project 1 (98), uploaded later (Feb 1st vs Jan 15th)
    description: "Fundraising and deployment of state-of-the-art neonatal phototherapy units and incubators for a community healthcare clinic in Ramnagaram, directly assisting critical newborn child recovery.",
    location: "Ramanagara District, Karnataka",
    zone: "Zone 2",
    contributions: 500000,
    volunteerCount: 12,
  },
  {
    id: "project-9",
    coverImage: oceanImage(8),
    title: "Project Swavalamban: Skill Labs for Women",
    clubId: "club-5",
    clubName: "Rotaract Club of Tumakuru Elite",
    avenueOfService: "Next Gen",
    areaOfFocus: "Community Economic Development",
    beneficiaries: 1200,
    volunteerHours: 360,
    impactScore: 90,
    uploadDate: "2026-05-02T13:00:00Z",
    description: "Creating sewing, block printing, and e-commerce listing skill labs for 80 village women in rural Tumakuru to help establish independent micro-entrepreneurship guilds.",
    location: "Tumakuru Rural, Karnataka",
    zone: "Zone 3",
    contributions: 90000,
    volunteerCount: 20,
  },
  {
    id: "project-10",
    coverImage: oceanImage(9),
    title: "Pulse 2026: Mega Blood Donation Drive",
    clubId: "club-4",
    clubName: "Rotaract Club of PES University",
    avenueOfService: "Public Image",
    areaOfFocus: "Disease Prevention",
    beneficiaries: 15000,
    volunteerHours: 680,
    impactScore: 94,
    uploadDate: "2026-03-10T07:30:00Z",
    description: "Organized across three main university campuses, this mega blood drive collected 1,240 units of blood in a single day in partnership with the Red Cross, creating vital resources for three municipal blood banks.",
    location: "PES Campus, Bengaluru",
    zone: "Zone 2",
    contributions: 120000,
    volunteerCount: 95,
  }
];

export const useStore = create<StoreState>((set, get) => ({
  projects: mockProjects,
  clubs: mockClubs,
  stats: {
    totalProjects: 450,
    totalVolunteers: 2500,
    totalBeneficiaries: 120000,
    volunteerHours: 45000,
    contributions: 5200000,
    activeClubs: 42,
  },
  
  projectFilters: {
    search: "",
    club: "",
    avenue: "",
    focus: "",
    zone: "",
    date: "all",
  },
  
  clubFilters: {
    search: "",
    zone: "",
  },
  
  setProjectFilter: (key, value) => {
    set((state) => ({
      projectFilters: {
        ...state.projectFilters,
        [key]: value,
      },
    }));
  },
  
  resetProjectFilters: () => {
    set({
      projectFilters: {
        search: "",
        club: "",
        avenue: "",
        focus: "",
        zone: "",
        date: "all",
      },
    });
  },
  
  setClubFilter: (key, value) => {
    set((state) => ({
      clubFilters: {
        ...state.clubFilters,
        [key]: value,
      },
    }));
  },
  
  resetClubFilters: () => {
    set({
      clubFilters: {
        search: "",
        zone: "",
      },
    });
  },
  
  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
}));

// Selectors for Filtered Data
export const selectFilteredProjects = (state: StoreState) => {
  const { projects, projectFilters } = state;
  const { search, club, avenue, focus, zone, date } = projectFilters;
  
  let result = [...projects];
  
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.clubName.toLowerCase().includes(term)
    );
  }
  
  if (club) {
    result = result.filter((p) => p.clubId === club);
  }
  
  if (avenue) {
    result = result.filter((p) => p.avenueOfService === avenue);
  }
  
  if (focus) {
    result = result.filter((p) => p.areaOfFocus === focus);
  }
  
  if (zone) {
    result = result.filter((p) => p.zone === zone);
  }
  
  if (date && date !== "all") {
    // simple date filter helper
    const now = new Date("2026-05-27T21:45:00+05:30").getTime();
    result = result.filter((p) => {
      const pTime = new Date(p.uploadDate).getTime();
      const diffMs = now - pTime;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (date === "recent") {
        return diffDays <= 60; // past 2 months
      } else if (date === "older") {
        return diffDays > 60;
      }
      return true;
    });
  }
  
  // Sort Logic:
  // Priority 1: Project Score (impactScore, desc)
  // Priority 2: Upload Date (earlier uploaded project ranks higher when scores are equal - asc uploadDate)
  result.sort((a, b) => {
    if (b.impactScore !== a.impactScore) {
      return b.impactScore - a.impactScore;
    }
    return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
  });
  
  return result;
};

export const selectFilteredClubs = (state: StoreState) => {
  const { clubs, clubFilters } = state;
  const { search, zone } = clubFilters;
  
  let result = [...clubs];
  
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.president.toLowerCase().includes(term)
    );
  }
  
  if (zone) {
    result = result.filter((c) => c.zone === zone);
  }
  
  // Leaderboard ranking logic:
  // Total Points (desc), then Total Projects (desc)
  result.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return b.totalProjects - a.totalProjects;
  });
  
  return result;
};
