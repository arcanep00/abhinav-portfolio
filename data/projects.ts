export type CaseStudySection = {
  id: string;
  title: string;
  content: string | string[];
  code?: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  impact: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  sections: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "healthcare-backend",
    title: "Healthcare Backend API",
    shortTitle: "Healthcare API",
    category: "Django REST Framework",
    tagline: "Enterprise healthcare backend with JWT auth, patient-doctor mapping, and production-grade REST APIs.",
    description:
      "Enterprise Healthcare Backend API built using Django REST Framework with PostgreSQL, JWT authentication, and secure CRUD endpoints for patient and doctor management.",
    impact: "JWT Auth · Patient-Doctor Mapping · CRUD APIs",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JWT Authentication",
      "REST APIs",
      "Git",
      "GitHub"
    ],
    features: [
      "JWT Authentication",
      "Patient Management",
      "Doctor Management",
      "Patient-Doctor Mapping",
      "CRUD APIs",
      "Pagination",
      "Filtering",
      "Validation",
      "Error Handling",
      "Secure Backend Architecture"
    ],
    github: "https://github.com/arcanep00/healthcare-backend",
    demo: "https://healthcare-backend-mbtu.onrender.com",
    sections: [
      {
        id: "overview",
        title: "overview",
        content:
          "A production-oriented healthcare backend API designed to manage patients, doctors, and their relationships through secure REST endpoints. Built with Django REST Framework, the system emphasizes authentication, data integrity, and scalable API design patterns suitable for enterprise healthcare workflows."
      },
      {
        id: "problem",
        title: "Problem Statement",
        content: [
          "Healthcare applications require strict separation of patient and provider data with role-based access.",
          "Manual record management leads to inconsistent data and poor API contract design.",
          "Teams need a backend foundation that supports secure authentication, relational mapping, and predictable error handling."
        ]
      },
      {
        id: "solution",
        title: "Solution",
        content:
          "Implemented a Django REST Framework backend with JWT-based authentication, normalized PostgreSQL schema, and dedicated endpoints for patients, doctors, and patient-doctor assignments. Added pagination, filtering, validation layers, and structured error responses to support frontend and third-party integrations."
      },
      {
        id: "architecture",
        title: "Architecture Diagram",
        content:
          "Architecture placeholder — Client applications communicate with Django REST API layer, which handles JWT validation, serializers, and business logic before persisting data to PostgreSQL.",
        code: `┌─────────────┐     JWT      ┌──────────────────┐     ORM      ┌────────────┐
│   Client    │ ──────────►  │  Django REST API │ ──────────►  │ PostgreSQL │
│  (Web/App)  │ ◄──────────  │  + Auth Layer    │ ◄──────────  │  Database  │
└─────────────┘   JSON/REST  └──────────────────┘              └────────────┘`
      },
      {
        id: "database",
        title: "Database Schema",
        content:
          "Relational schema with User, Patient, Doctor, and PatientDoctorMapping entities. Foreign keys enforce referential integrity; indexes support lookup by patient ID, doctor ID, and assignment status.",
        code: `User (id, email, password_hash, role)
Patient (id, user_id FK, date_of_birth, medical_record_ref)
Doctor (id, user_id FK, specialization, license_number)
PatientDoctorMapping (id, patient_id FK, doctor_id FK, assigned_at, status)`
      },
      {
        id: "auth-flow",
        title: "Authentication Flow",
        content: [
          "User registers or logs in via /api/auth/login with credentials.",
          "Server validates credentials and returns JWT access and refresh tokens.",
          "Protected endpoints require Authorization: Bearer <token> header.",
          "Token refresh endpoint rotates credentials without re-authentication.",
          "Role-based permissions restrict patient vs. doctor vs. admin operations."
        ]
      },
      {
        id: "api-design",
        title: "REST API Design",
        content: [
          "GET /api/patients/ — List patients with pagination and filtering",
          "POST /api/patients/ — Create patient record with validation",
          "GET /api/doctors/ — List doctors by specialization",
          "POST /api/mappings/ — Assign patient to doctor",
          "Consistent JSON error format with HTTP status codes",
          "Serializer-level validation for input sanitization"
        ]
      },
      {
        id: "folder-structure",
        title: "Folder Structure",
        content: "Modular Django app structure separating concerns across authentication, patients, doctors, and core configuration.",
        code: `healthcare_api/
├── config/          # settings, urls, wsgi
├── accounts/        # JWT auth, user models
├── patients/        # patient CRUD, serializers
├── doctors/         # doctor CRUD, serializers
├── mappings/        # patient-doctor relationships
└── requirements.txt`
      },
      {
        id: "key-features",
        title: "Key Features",
        content: [
          "JWT authentication with refresh token rotation",
          "Full CRUD for patients and doctors",
          "Patient-doctor assignment workflow",
          "Query filtering and pagination on list endpoints",
          "Centralized exception handling and validation errors",
          "PostgreSQL-backed relational integrity"
        ]
      },
      {
        id: "challenges",
        title: "Technical Challenges",
        content: [
          "Designing role-aware permissions without over-complicating the auth layer.",
          "Ensuring patient-doctor mapping constraints prevent duplicate assignments.",
          "Balancing serializer validation depth with API response performance.",
          "Structuring error responses for consistent frontend consumption."
        ]
      },
      {
        id: "decisions",
        title: "Engineering Decisions",
        content: [
          "Chose Django REST Framework for mature serializer and viewset patterns.",
          "Selected JWT over session auth for stateless API scalability.",
          "Used PostgreSQL for ACID compliance and complex relational queries.",
          "Separated apps by domain (patients, doctors, mappings) for maintainability."
        ]
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        content:
          "Early investment in API contract design and error response consistency pays off when integrating clients. Normalized schemas and explicit mapping tables simplify reporting and audit requirements in healthcare contexts."
      },
      {
        id: "future",
        title: "Future Improvements",
        content: [
          "Add appointment scheduling and medical history modules",
          "Implement audit logging for HIPAA-aligned traceability",
          "Introduce rate limiting and API versioning",
          "Deploy with Docker and CI/CD pipeline",
          "Add comprehensive pytest coverage for edge cases"
        ]
      }
    ]
  },
  {
    slug: "financial-processing-system",
    title: "AI-Powered Financial Transaction Processing System",
    shortTitle: "Financial Processing",
    category: "FastAPI · Celery · Redis",
    tagline: "Intelligent CSV transaction processing with background workers, anomaly detection, and automated reporting.",
    description:
      "AI-powered backend platform that processes financial transaction CSV files using FastAPI with PostgreSQL, Redis, Celery, Docker, intelligent categorization, anomaly detection, analytics and automated reporting.",
    impact: "CSV Pipeline · Celery Workers · AI Categorization",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "Pandas",
      "REST APIs"
    ],
    features: [
      "CSV Processing",
      "Background Workers",
      "Redis Queue",
      "Celery Tasks",
      "AI Categorization",
      "Anomaly Detection",
      "Automated Reports",
      "Analytics Dashboard",
      "Scalable Architecture"
    ],
    github: "https://github.com/arcanep00/Docker_LLM_Project",
    demo: "#",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content:
          "An enterprise backend platform for ingesting financial transaction CSV files, processing them asynchronously through Celery workers, and delivering categorized analytics with anomaly detection and automated reporting."
      },
      {
        id: "problem",
        title: "Business Problem",
        content: [
          "Finance teams receive large CSV exports that require manual categorization and review.",
          "Synchronous processing blocks API responses and fails under high upload volume.",
          "Anomalies in transaction data are often detected too late without automated screening."
        ]
      },
      {
        id: "solution",
        title: "Solution",
        content:
          "Built a FastAPI ingestion layer that accepts CSV uploads, enqueues processing jobs to Redis, and delegates heavy computation to Celery workers. Pandas handles data transformation; AI-driven categorization and rule-based anomaly detection feed into PostgreSQL storage and reporting endpoints."
      },
      {
        id: "architecture",
        title: "Architecture Diagram",
        content: "Architecture placeholder — decoupled ingestion, queue, worker, and reporting layers for horizontal scalability.",
        code: `┌──────────┐   upload   ┌──────────┐  enqueue  ┌───────┐  consume  ┌─────────────┐
│  Client  │ ──────────► │ FastAPI  │ ────────► │ Redis │ ────────► │ Celery Worker│
└──────────┘             └──────────┘           └───────┘           └──────┬──────┘
                              │                                              │
                              ▼                                              ▼
                        ┌──────────┐                                  ┌──────────┐
                        │PostgreSQL│ ◄────── reports & analytics ──── │ Pandas/AI│
                        └──────────┘                                  └──────────┘`
      },
      {
        id: "pipeline",
        title: "Processing Pipeline",
        content: [
          "CSV upload validated and stored with metadata record",
          "Celery task parses rows with Pandas into normalized transaction objects",
          "AI categorization assigns spending/income categories per transaction",
          "Anomaly detection flags outliers based on amount, frequency, and patterns",
          "Results persisted to PostgreSQL with processing status tracking",
          "Report generation triggered on batch completion"
        ]
      },
      {
        id: "redis",
        title: "Redis Queue",
        content:
          "Redis serves as the Celery broker and result backend. Job queues separate ingestion, categorization, and reporting tasks. Failed jobs retry with exponential backoff; dead-letter handling captures persistent failures for operator review."
      },
      {
        id: "celery",
        title: "Celery Workers",
        content:
          "Dedicated worker processes handle CPU-bound CSV parsing and categorization independently from the FastAPI event loop. Task routing allows scaling workers per queue type. Docker Compose orchestrates API, worker, Redis, and PostgreSQL containers."
      },
      {
        id: "database",
        title: "Database Schema",
        content: "Schema tracks uploads, individual transactions, categories, anomalies, and generated reports.",
        code: `UploadBatch (id, filename, status, uploaded_at, row_count)
Transaction (id, batch_id FK, amount, date, description, category_id FK)
Category (id, name, ai_confidence)
Anomaly (id, transaction_id FK, type, severity, detected_at)
Report (id, batch_id FK, summary_json, generated_at)`
      },
      {
        id: "reporting",
        title: "Reporting Flow",
        content: [
          "On batch completion, aggregation task computes totals by category and time period",
          "Anomaly summary included in report payload",
          "REST endpoint serves report JSON for dashboard consumption",
          "Export formats prepared for PDF/CSV download extensions"
        ]
      },
      {
        id: "challenges",
        title: "Challenges",
        content: [
          "Handling malformed CSV rows without failing entire batches",
          "Tuning Celery concurrency for mixed I/O and CPU workloads",
          "Balancing AI categorization accuracy with processing latency",
          "Designing idempotent tasks for safe retries on worker failures"
        ]
      },
      {
        id: "decisions",
        title: "Engineering Decisions",
        content: [
          "FastAPI chosen for async upload handling and OpenAPI documentation",
          "Celery + Redis for proven background job patterns in Python",
          "Pandas for efficient batch transformation of tabular financial data",
          "Docker Compose for reproducible local and staging environments"
        ]
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        content:
          "Decoupling ingestion from processing is essential for financial data pipelines. Status tracking at the batch and row level enables partial success handling and improves operator visibility into long-running jobs."
      },
      {
        id: "future",
        title: "Future Improvements",
        content: [
          "Real-time WebSocket progress updates for upload batches",
          "ML model retraining pipeline from user category corrections",
          "Multi-tenant isolation for enterprise clients",
          "Kubernetes deployment with autoscaling workers",
          "Scheduled recurring report delivery via email"
        ]
      }
    ]
  },
  {
    slug: "serviq",
    title: "ServiQ",
    shortTitle: "ServiQ",
    category: "Django Marketplace API",
    tagline: "Community-driven local marketplace backend connecting customers with nearby service providers.",
    description:
      "A modern backend marketplace connecting customers with nearby service providers through JWT-secured REST APIs, service listings, booking workflows, and location-aware discovery.",
    impact: "Marketplace API · Booking Workflow · Location Discovery",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "JWT",
      "REST APIs",
      "Git",
      "GitHub"
    ],
    features: [
      "Authentication",
      "Service Listings",
      "Provider Profiles",
      "Customer Requests",
      "Categories",
      "Search",
      "Booking Workflow",
      "JWT Authentication",
      "REST APIs",
      "PostgreSQL",
      "Location Discovery",
      "Notification Ready",
      "Future Payment Integration"
    ],
    github: "#",
    demo: "https://www.serviqapp.com",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content:
          "ServiQ is a community-driven local demand and supply platform backend. It enables customers to discover nearby service providers, browse categorized listings, submit requests, and manage bookings through a secure Django REST API."
      },
      {
        id: "problem",
        title: "Business Problem",
        content: [
          "Local service marketplaces need reliable backend systems for provider discovery and request management.",
          "Customers expect search, categorization, and booking flows without friction.",
          "Platforms must scale provider profiles, listings, and transactional workflows independently."
        ]
      },
      {
        id: "solution",
        title: "Solution",
        content:
          "Designed a Django backend with JWT authentication, provider and customer profiles, categorized service listings, search endpoints, and a booking state machine. PostgreSQL stores relational data with location fields prepared for proximity-based discovery."
      },
      {
        id: "architecture",
        title: "Architecture Diagram",
        content: "Architecture placeholder — API gateway pattern with domain-separated Django apps.",
        code: `┌─────────────┐   JWT/REST   ┌─────────────────────────────────────┐
│ Mobile/Web  │ ───────────► │           Django REST API              │
│   Clients   │ ◄─────────── │  Auth │ Listings │ Bookings │ Search  │
└─────────────┘              └──────────────────┬──────────────────┘
                                                │
                                                ▼
                                         ┌────────────┐
                                         │ PostgreSQL │
                                         └────────────┘`
      },
      {
        id: "database",
        title: "Database Schema",
        content: "Normalized marketplace schema supporting users, providers, services, categories, requests, and bookings.",
        code: `User (id, email, role: customer|provider)
ProviderProfile (id, user_id FK, bio, location, rating)
ServiceListing (id, provider_id FK, category_id FK, title, price)
Category (id, name, slug)
Booking (id, customer_id FK, listing_id FK, status, scheduled_at)
ServiceRequest (id, customer_id FK, category_id FK, description, status)`
      },
      {
        id: "workflow",
        title: "Marketplace Workflow",
        content: [
          "Customer registers and browses categorized service listings",
          "Search filters by category, keyword, and location proximity",
          "Customer submits booking request for selected provider service",
          "Provider receives request and accepts or declines via status update",
          "Booking progresses through confirmed → in-progress → completed states",
          "Notification hooks prepared for email/SMS integration"
        ]
      },
      {
        id: "auth-flow",
        title: "Authentication Flow",
        content: [
          "Registration with role selection (customer or provider)",
          "JWT login returns role-scoped access token",
          "Provider-only endpoints guarded by permission classes",
          "Customer booking endpoints validate ownership of requests"
        ]
      },
      {
        id: "api-design",
        title: "REST API Design",
        content: [
          "GET /api/listings/?category=&search=&location=",
          "POST /api/bookings/ — Create booking request",
          "PATCH /api/bookings/{id}/ — Update booking status",
          "GET /api/providers/{id}/ — Provider profile and listings",
          "Consistent pagination and filtering on list endpoints"
        ]
      },
      {
        id: "folder-structure",
        title: "Folder Structure",
        content: "Domain-driven Django project layout for marketplace entities.",
        code: `serviq/
├── config/
├── accounts/        # JWT auth, user roles
├── providers/       # provider profiles
├── listings/        # services, categories
├── bookings/        # request & booking workflow
└── search/          # query & filter logic`
      },
      {
        id: "scalability",
        title: "Scalability",
        content: [
          "Stateless JWT auth enables horizontal API scaling",
          "Database indexes on category, location, and status fields",
          "Search module isolated for future Elasticsearch integration",
          "Notification and payment modules designed as pluggable services"
        ]
      },
      {
        id: "challenges",
        title: "Challenges",
        content: [
          "Designing booking state transitions without race conditions",
          "Balancing search flexibility with query performance on PostgreSQL",
          "Role-based access control across customer and provider endpoints",
          "Preparing location discovery for future geospatial indexing"
        ]
      },
      {
        id: "decisions",
        title: "Engineering Decisions",
        content: [
          "Django REST Framework for rapid marketplace CRUD development",
          "JWT for mobile-friendly stateless authentication",
          "Explicit booking status enum for predictable workflow transitions",
          "Separate search app to decouple query logic from listing models"
        ]
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        content:
          "Marketplace backends benefit from early workflow modeling. Defining booking states and permission boundaries upfront reduces refactoring when adding payments and notifications."
      },
      {
        id: "future",
        title: "Future Improvements",
        content: [
          "Stripe payment integration for booking checkout",
          "PostGIS for radius-based provider discovery",
          "Push notification service for booking updates",
          "Provider analytics dashboard API",
          "Review and rating system with moderation"
        ]
      }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
