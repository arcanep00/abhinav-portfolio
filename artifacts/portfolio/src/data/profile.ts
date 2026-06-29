import {
  Briefcase,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Shield,
  Workflow,
  Zap
} from "lucide-react";

export const profile = {
  name: "Abhinav Pandey",
  role: "Python Backend Engineer",
  headline:
    "Building production-grade REST APIs, Django and FastAPI services, PostgreSQL data layers, and Odoo ERP integrations.",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "panabhi8456@gmail.com",
  phone: "+91 89796 10223",
  company: "Etelligense Technology",
  position: "Software Development Intern",
  availability: "Open to Python Backend roles",
  targetRoles: [
    "Python Backend Engineer",
    "Django Developer",
    "FastAPI Developer",
    "REST API Engineer",
    "Odoo ERP Developer",
    "Backend System Engineer"
  ],
  heroRoles: [
    "Python Backend Engineer",
    "Django Developer",
    "FastAPI Developer",
    "REST API Engineer",
    "Odoo ERP Developer",
    "Backend System Engineer"
  ],
  summary:
    "I am a Python backend engineer focused on designing reliable APIs, scalable data models, and maintainable server-side systems. Through my internship at Etelligense Technology, I work across Django, FastAPI, Odoo ERP, PostgreSQL, Redis, and REST API development — translating business requirements into production-ready backend software. I prioritize clean architecture, database design, authentication patterns, and debugging discipline over surface-level feature delivery.",
  aboutParagraphs: [
    "My engineering work centers on the Python ecosystem — Django and Django REST Framework for structured enterprise APIs, FastAPI for high-performance async services, and Odoo ERP for business workflow customization.",
    "I design PostgreSQL schemas with normalization, indexing, and query optimization in mind. Authentication flows, serializer validation, background processing, and caching strategies are core to how I approach backend systems.",
    "Whether building healthcare APIs, financial processing pipelines, or marketplace platforms, I focus on problem decomposition, API contract clarity, and code that teams can extend without rework."
  ],
  recruiterMessage:
    "Hiring for Python backend, Django, FastAPI, REST API, or Odoo ERP roles? I bring hands-on internship experience, three flagship backend projects, and a focus on production engineering practices.",
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
    period: "Jan 2026 — Present",
    summary:
      "Contributing to backend-driven applications and Odoo ERP customization in a production-oriented internship environment.",
    highlights: [
      "Engineered backend features using Python and Django, integrating REST APIs with PostgreSQL-backed data models for enterprise workflows.",
      "Customized Odoo ERP modules, reports, and business processes — bridging Python backend logic with real operational requirements.",
      "Designed and optimized PostgreSQL queries, improving data retrieval patterns for ERP-backed features and API endpoints.",
      "Built and consumed REST APIs with structured validation, error handling, and authentication-aware endpoint design.",
      "Applied Linux environment practices, Git/GitHub workflows, debugging techniques, and testing discipline across feature delivery cycles.",
      "Collaborated on FastAPI-oriented service thinking and background processing patterns for scalable backend architecture."
    ],
    technologies: [
      "Python",
      "Django",
      "FastAPI",
      "Odoo ERP",
      "PostgreSQL",
      "REST APIs",
      "Linux",
      "Git",
      "Testing"
    ]
  }
];

export const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    items: ["Python", "SQL", "JavaScript"]
  },
  {
    title: "Backend",
    icon: ServerCog,
    items: ["Django", "FastAPI", "REST APIs", "Odoo ERP"]
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "Redis"]
  },
  {
    title: "Developer Tools",
    icon: GitBranch,
    items: ["Docker", "Git", "GitHub", "Linux"]
  },
  {
    title: "Core Concepts",
    icon: Zap,
    items: [
      "Authentication",
      "API Design",
      "Database Design",
      "Caching",
      "Background Processing"
    ]
  }
];

export const skillLevels = [
  { name: "Python", level: 90, category: "Language" },
  { name: "Django", level: 85, category: "Backend" },
  { name: "FastAPI", level: 82, category: "Backend" },
  { name: "REST APIs", level: 88, category: "API Design" },
  { name: "PostgreSQL", level: 84, category: "Database" },
  { name: "Odoo ERP", level: 80, category: "ERP" }
];

export const education = {
  degree: "Bachelor of Technology — Computer Science Engineering",
  institute: "ABES Institute of Technology",
  location: "Ghaziabad",
  period: "2023 — 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Software Engineering",
    "Computer Networks"
  ],
  icon: GraduationCap
};

export const odooHighlights = [
  "Customized Odoo ERP modules aligned with enterprise business workflow requirements.",
  "Built Python and SQL-backed report and workflow improvements for operational teams.",
  "Integrated PostgreSQL data models with Odoo ORM patterns for reliable feature delivery.",
  "Applied debugging, testing, and incremental deployment practices within ERP customization cycles."
];

export const odooCapabilities = [
  { label: "Module Customization", icon: Briefcase },
  { label: "Workflow Automation", icon: Workflow },
  { label: "Report Development", icon: Database },
  { label: "PostgreSQL Integration", icon: Shield }
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" }
] as const;

export const siteConfig = {
  name: "Abhinav Pandey",
  url: "https://abhinav-pandey.dev",
  ogImage: "/hero-backend-workspace.png",
  resumePath: "/Abhinav-Pandey-Resume.pdf"
} as const;
