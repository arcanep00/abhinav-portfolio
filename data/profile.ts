import {
  Award,
  Briefcase,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  SquareTerminal
} from "lucide-react";

export const profile = {
  name: "Abhinav Pandey",
  role: "Early-Career Software Engineer",
  headline:
    "Backend-focused developer building Python, Django, Odoo ERP, PostgreSQL, and REST API solutions.",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "panabhi8456@gmail.com",
  phone: "+91 89796 10223",
  targetRoles: [
    "Software Developer",
    "Backend Developer",
    "Django Developer",
    "Python Developer",
    "Odoo Developer"
  ],
  summary:
    "I am an early-career software engineer with real-world internship experience in backend development and ERP customization. My current work at Etelligense Technology gives me hands-on exposure to Odoo, Python, Django, PostgreSQL, REST APIs, Linux, Git, and GitHub. I enjoy designing reliable data models, building API-driven features, debugging production-style workflows, and turning business requirements into maintainable software.",
  contactLinks: [
    {
      label: "Email",
      value: "panabhi8456@gmail.com",
      href: "mailto:panabhi8456@gmail.com",
      icon: Mail
    },
    {
      label: "Phone",
      value: "+91 89796 10223",
      href: "tel:+918979610223",
      icon: Phone
    },
    {
      label: "Location",
      value: "Ghaziabad, India",
      href: "https://maps.google.com/?q=Ghaziabad%2C%20India",
      icon: MapPin
    },
    {
      label: "GitHub",
      value: "github.com/arcanep00",
      href: "https://github.com/arcanep00",
      icon: GitBranch
    }
  ]
};

export const experience = [
  {
    role: "Software Development Intern",
    company: "Etelligense Technology",
    location: "Greater Noida West",
    period: "Jan 2026 - Present",
    highlights: [
      "Developing and maintaining backend-driven web applications using Python, Django, SQL, and Odoo.",
      "Customizing Odoo ERP modules, workflows, reports, and business processes for practical enterprise use cases.",
      "Working with PostgreSQL for database design, data modeling, query writing, and performance-minded improvements.",
      "Building and integrating REST APIs to connect application features with structured backend services.",
      "Collaborating on debugging, testing, feature implementation, and Git/GitHub-based version control."
    ]
  }
];

export const skills = [
  {
    title: "Backend Engineering",
    icon: ServerCog,
    items: ["Python", "Django", "REST APIs", "SQL", "API Development"]
  },
  {
    title: "ERP & Business Apps",
    icon: Briefcase,
    items: ["Odoo ERP", "Module Customization", "Workflows", "Reports"]
  },
  {
    title: "Database",
    icon: Database,
    items: ["PostgreSQL", "Data Modeling", "Query Optimization", "DBMS"]
  },
  {
    title: "Programming",
    icon: Code2,
    items: ["Java", "Python", "JavaScript", "Object-Oriented Programming"]
  },
  {
    title: "Frontend Basics",
    icon: SquareTerminal,
    items: ["HTML5", "CSS3", "JavaScript", "Responsive UI"]
  },
  {
    title: "Tools & Platforms",
    icon: GitBranch,
    items: ["Git", "GitHub", "Linux", "VS Code", "Version Control"]
  }
];

export const skillLevels = [
  { name: "Python", level: 88, category: "Backend" },
  { name: "Django", level: 82, category: "Framework" },
  { name: "Odoo ERP", level: 78, category: "ERP" },
  { name: "PostgreSQL", level: 76, category: "Database" },
  { name: "REST APIs", level: 84, category: "API" },
  { name: "Git/GitHub", level: 80, category: "Tools" }
];

export const projects = [
  {
    title: "Task Management & Resource API",
    category: "Backend API",
    impact: "Auth + relational data",
    description:
      "Backend API for academic task and resource management, designed around structured data, secure access, and clean service boundaries.",
    features: [
      "Relational database architecture for tasks, users, and resources",
      "Authentication and authorization flows",
      "Backend endpoints prepared for practical task/resource workflows"
    ],
    technologies: ["Python", "Django", "REST APIs", "SQL", "Authentication"],
    github: "#",
    demo: "#"
  },
  {
    title: "Intelligent URL Shortener & Analytics",
    category: "Analytics Platform",
    impact: "Tracking + custom slugs",
    description:
      "URL shortening platform with custom slug generation and analytics support for tracking click activity and usage patterns.",
    features: [
      "Custom short-link generation logic",
      "Click activity and usage statistics",
      "Data-backed analytics layer for shortened URLs"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "REST APIs", "Analytics"],
    github: "#",
    demo: "#"
  },
  {
    title: "DevConnect API",
    category: "Developer Platform",
    impact: "Collaboration services",
    description:
      "API services for developer collaboration, focused on backend fundamentals, clean endpoints, and scalable service thinking.",
    features: [
      "Developer collaboration service endpoints",
      "API-first backend structure",
      "Foundation for profiles, connections, and shared developer resources"
    ],
    technologies: ["Python", "Django", "REST APIs", "SQL", "Backend Design"],
    github: "#",
    demo: "#"
  }
];

export const education = {
  degree: "Bachelor of Technology (B.Tech), Computer Science",
  institute: "ABES Institute of Technology (ABESIT)",
  location: "Ghaziabad",
  period: "2023 - 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Web Development"
  ],
  icon: GraduationCap
};

export const achievements = [
  {
    title: "Real-World Software Development Exposure",
    description:
      "Gaining practical engineering experience through an active software development internship involving backend applications, ERP customization, databases, and APIs.",
    icon: Award
  },
  {
    title: "Backend and ERP Specialization",
    description:
      "Built a focused profile around Python, Django, Odoo ERP, PostgreSQL, REST APIs, and enterprise application development."
  },
  {
    title: "Strong Computer Science Foundation",
    description:
      "Developed fundamentals in DSA, OOP, DBMS, operating systems, web development, and version-controlled team workflows."
  }
];

export const odooHighlights = [
  "Odoo ERP module customization aligned with business workflow requirements.",
  "Report and workflow improvements for enterprise-style ERP operations.",
  "Python, SQL, and PostgreSQL usage across ERP-backed feature development.",
  "Debugging, testing, and incremental feature delivery within an internship environment."
];
