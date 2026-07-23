# Project Descriptions

## 1. FLOW Tool

FLOWTool is a Spring Boot web application that models a manufacturing shop floor end-to-end: areas contain procedures, procedures run on project machines against work orders, and every unit of work is measured against a production standard (seconds-per-unit quota). Employees log daily activity against work orders, and the system automatically computes productive time and company-wide/per-employee efficiency through JPQL aggregation queries.

The application follows a clean layered architecture (controllers → services → repositories → entities), with separate web controllers rendering server-side Thymeleaf views and REST controllers exposing JSON APIs under `/api`. Authentication is handled via Spring Security form login with BCrypt-hashed credentials and role-based access control (admin vs. standard users), while CSRF protection is enabled across the app. Non-conformances can be raised against work orders to track defects, and bulk data operations are supported through Apache POI-driven Excel import and CSV export (with formula-injection sanitization).

The app ships with a dual-profile setup: a Docker Compose stack backed by MySQL for production-like usage, and an in-memory H2 profile for fast local development. It also includes cookie-based internationalization, Spring Cache-backed reads with write-time eviction, and centralized exception handling that returns consistent validation and not-found error responses.

---

## 2. LEARN Platform

Learn Platform is a full-stack training platform connecting students and trainers, built with React 19 and Vite on the frontend and a lightweight Express + JWT API on the backend. Students and trainers go through separate multi-step registration flows with verification and confirmation steps, and once authenticated, can manage their profile (edit details, change password, delete account) or, for trainers, create and manage training sessions.

The frontend is organized around reusable, domain-scoped components (registration flows, account management, training tables, navigation) with state managed through Redux Toolkit and routing handled by React Router v7. Material UI (MUI v9) provides a consistent, responsive interface, and user feedback is delivered through toast notifications. Protected routes gate access to account and training pages, redirecting unauthenticated users.

The backend is intentionally minimal — an Express API that stores data in-memory (no database), designed to demonstrate the authentication and account-management flow without external infrastructure. It supports registration, login (returning a JWT), and JWT-protected profile updates/deletion, all proxied transparently from the Vite dev server.

Quality is enforced through a Jest + React Testing Library suite covering components, pages, services, and Redux store, with minimum coverage thresholds (50% across branches/functions/lines/statements) that fail the build if not met. A Husky pre-push hook runs the full test suite automatically, preventing broken code from being pushed.

---

## 3. GYM App

GYMApp is a microservices-based gym management platform built with Spring Boot and Spring Cloud, covering trainer and trainee account management, training session scheduling, and secure authentication across distributed services. Accounts are created with auto-generated, BCrypt-hashed credentials and assigned roles (`TRAINER`/`TRAINEE`); login issues a JWT with the role embedded as a claim, complemented by a brute-force protector (lockout after repeated failures) and a token blacklist for logout/revocation. Authorization combines role-based access control with method-level ownership checks via `@PreAuthorize`.

The system uses Eureka for service discovery and Resilience4j circuit breakers for resilience, with asynchronous, event-driven communication between services over Spring AMQP (Artemis broker) including a dead-letter queue for invalid messages. Training records support full CRUD with filtering by date range, trainer/trainee name, and training type, and trainer-trainee assignment logic is handled atomically.

Observability is first-class: Spring Actuator and Micrometer feed a Prometheus/Grafana stack, and code quality is enforced through SonarQube static analysis and Spotless formatting. The test suite combines JUnit 5, Mockito, and Cucumber BDD (component and integration suites) with a JaCoCo coverage gate of at least 80%. The entire stack — app, MySQL, Artemis, Prometheus, Grafana, SonarQube — is orchestrated via Docker Compose, with API documentation exposed through Swagger/OpenAPI 3.1.

---

## 4. AI Workflow (Agent Orchestration Pipeline)

This project is a YAML-defined multi-agent workflow built on an agent orchestration platform (an n8n-style alternative for AI-driven pipelines), automating the code review and CI verification process for a software repository. The workflow chains together seven specialized AI agents, each with a narrowly scoped system prompt and tool access, connected through a stateful graph with conditional branching.

The pipeline begins by initializing a structured JSON review report in the workspace, then runs the project's automated test suite via a code-execution tool, capturing exit codes, logs, and a pass/fail summary. A conditional branch routes execution based on the result: failing runs trigger a failure-triage agent that infers root causes, implicated files, and remediation steps; passing runs are recorded by a dedicated agent that documents the successful outcome for auditability. Both paths converge into a review-orchestrator agent that synthesizes five review perspectives — security & compliance, best practices, documentation/deprecations/known bugs, architecture, and readability/maintainability — into a single consolidated findings object.

A report-registrar agent then writes these findings into the canonical Markdown review report (replacing stale sections rather than duplicating them) and produces an executive summary. Finally, a notification agent determines the appropriate channel and recipients and dispatches a message announcing the report is ready. Each state passes strongly-typed JSON between agents via defined output schemas, ensuring the pipeline remains deterministic and auditable end to end.

---

## 5. Store Inventory System

StoreInventorySystem is a straightforward Spring Boot REST API for managing product inventory, built with a clean controller-service-repository layering on top of Spring Data JPA and MySQL. It exposes endpoints to list, create, and update products, with Bean Validation enforcing required fields and non-negative price/quantity, and returns proper HTTP status codes (201 on creation, 404 when a product ID isn't found).

The project emphasizes test coverage and code quality — JUnit 5, Mockito, and MockMvc drive controller and service tests, Testcontainers backs integration testing against a real MySQL instance, and JaCoCo/SpotBugs enforce coverage and static analysis during the Maven build. It was built iteratively with AI assistance, deliberately kept simple after an initial overengineered attempt was discarded in favor of a leaner, incrementally-prompted design.

---

## 6. RIOT API Microservice

A Spring Boot microservice that proxies the Riot Games API to fetch League of Legends summoner and ranked data, wrapping outbound calls in a reactive WebClient and enforcing Riot's rate limits with a Bucket4j token bucket (dual limits — per-second and per-two-minutes). Responses are cached in Redis via Spring Cache/Spring Session to reduce redundant upstream calls, with a configurable TTL, and DTOs (`SummonerDto`, `RankDto`) are documented with OpenAPI schema annotations for Swagger UI.

The service exposes health, metrics, and Prometheus endpoints through Spring Actuator for observability, and reactive error handling logs and propagates upstream failures rather than swallowing them. Testcontainers is wired in for integration testing against real infrastructure, keeping the service consistent with the rest of the portfolio's containerized testing approach.
