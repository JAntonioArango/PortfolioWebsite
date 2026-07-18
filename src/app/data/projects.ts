export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  year: string;
  client: string;
  role: string;
  description: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "riot-api-microservice",
    slug: "riot-api-microservice",
    title: "Riot API Microservice",
    category: "Microservice",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1080&auto=format&fit=crop",
    year: "2025",
    client: "Personal Project",
    role: "Backend Developer",
    description: "Reactive Spring Boot microservice consuming external APIs with Redis caching to reduce response latency and external API calls. Built with Spring WebFlux, Docker, Swagger/OpenAPI, and Spring Boot Actuator.",
    github: "https://github.com/JAntonioArango/RiotApiService"
  },
  {
    id: "gym-app",
    slug: "gym-app",
    title: "Gym App",
    category: "Microservices Ecosystem",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1080&auto=format&fit=crop",
    year: "2025",
    client: "Personal Project",
    role: "Backend Developer",
    description: "Scalable microservices ecosystem for gym management with JWT stateless authentication and Prometheus/Grafana dashboards for real-time system health. Includes message brokering via Artemis ActiveMQ and code coverage via JaCoCo.",
    github: "https://github.com/JAntonioArango/GymApp"
  },
  {
    id: "learn-app",
    slug: "learn-app",
    title: "Learn App",
    category: "Full-Stack Application",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1080&auto=format&fit=crop",
    year: "2025",
    client: "Personal Project",
    role: "Full-Stack Developer",
    description: "Full-stack React + Express learning platform enabling students and trainers to manage registrations, trainings, and accounts with secure authentication. Built with Redux Toolkit, Vite, Jest, and Husky git hooks.",
    github: "https://github.com/JAntonioArango/LearnApp"
  },
  {
    id: "inventory-management",
    slug: "inventory-management",
    title: "Inventory Management System",
    category: "REST API",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1080&auto=format&fit=crop",
    year: "2024",
    client: "Personal Project",
    role: "Backend Developer",
    description: "Spring Boot REST API inventory management system with full CRUD operations, MySQL persistence, and automated test coverage via JaCoCo.",
    github: "https://github.com/JAntonioArango/StoreInventorySystem"
  },
  {
    id: "cri-app",
    slug: "cri-app",
    title: "CRI App",
    category: "Application",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1080&auto=format&fit=crop",
    year: "2025",
    client: "CRI",
    role: "Developer",
    description: "Project details coming soon."
  },
  {
    id: "n8n-workflow",
    slug: "n8n-workflow",
    title: "N8N WorkFlow",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop",
    year: "2025",
    client: "Personal Project",
    role: "Developer",
    description: "Project details coming soon."
  }
];
