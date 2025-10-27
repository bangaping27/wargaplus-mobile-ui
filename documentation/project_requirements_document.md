# Project Requirements Document (PRD)

## 1. Project Overview

Warga+ is a community-focused mobile application that helps residents manage their neighborhood activities—from viewing announcements and schedules to tracking payment history (iuran) and personal profile details. To power the React Native frontend, we will build a headless backend API based on a robust full-stack starter template (`codeguide-starter-fullstack`) using Next.js. This backend will centralize all server-side concerns (authentication, data storage, business logic) so the mobile team can focus purely on UI/UX.

By decoupling the backend from the frontend, we aim to accelerate development, enforce end-to-end type safety with TypeScript and Drizzle ORM, and ensure a secure, scalable deployment on platforms like Vercel and Docker. Key success criteria include: secure token-based authentication (JWT), complete set of protected REST endpoints (dashboard, payments, feed, profile), type-safe database interactions, clear API documentation, and automated tests ensuring reliability.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (MVP Version)
- User authentication endpoints: sign-up, sign-in, sign-out with JWT tokens.  
- Protected REST API routes under `/api/`:  
  - **/api/dashboard**: user status, announcements, schedule.  
  - **/api/payments**: fetch payment history, submit new payment.  
  - **/api/feed**: paginated list of community posts.  
  - **/api/profile**: get/update user profile and address.  
- PostgreSQL database schema for users, sessions, payments (iuran), announcements, feed items, schedules.  
- Drizzle ORM models and migration scripts via `drizzle-kit`.  
- Error handling with consistent HTTP status codes & JSON error messages.  
- Basic integration tests (Jest + Supertest) for each endpoint.  
- OpenAPI (Swagger) documentation for all routes.  
- Containerization: Dockerfile and `docker-compose.yaml`.  
- Environment variable management (.env) for secrets.

### Out-of-Scope (Later Phases)
- Web-based admin dashboard or UI components.  
- Social login (OAuth with Google/Facebook).  
- Push notifications or real-time features (WebSockets).  
- Advanced analytics or reporting endpoints.  
- Offline data synchronization support.  
- Multi-tenancy or role-based access beyond basic user/auth scope.  

## 3. User Flow

When a new user opens the Warga+ mobile app, they land on the **Login Screen**. They enter their email and password, and the app sends a `POST` request to `/api/auth/sign-in`. Upon successful login, the API returns a JWT token. The app stores this token securely (e.g., SecureStore/Keychain) and redirects the user to the **Dashboard Screen**.

On the **Dashboard Screen**, the mobile app makes a `GET` request to `/api/dashboard` with the JWT in the `Authorization` header. The response includes the users current payment status, a list of community announcements, and upcoming schedule items, which the app then displays via `StatusCard`, `AnnouncementList`, and `ScheduleList` components. From here, the user can navigate via a bottom tab bar to the **Payments**, **Feed**, and **Profile** screens. Each screen similarly calls its respective endpoint (`/api/payments`, `/api/feed`, `/api/profile`), handles JSON responses, and renders the data. The user can log out at any time, triggering a call to `/api/auth/sign-out` and returning to the login screen.

## 4. Core Features

- **Authentication & Authorization**  
  - JWT-based sign-up, sign-in, sign-out endpoints.  
  - Middleware to protect all `/api/*` routes and validate tokens.  
- **Dashboard Endpoint** (`/api/dashboard`)  
  - Fetch user payment status, announcements, and schedule in one JSON payload.  
- **Payments Endpoint** (`/api/payments`)  
  - Retrieve paginated payment history.  
  - Submit new payment records with idempotency support.  
- **Feed Endpoint** (`/api/feed`)  
  - Return paginated list of community posts (`InfoCard` data).  
- **Profile Endpoint** (`/api/profile`)  
  - Get and update user profile, address, and house details.  
- **Database Layer**  
  - Drizzle ORM schemas: users, sessions, payments, announcements, feed items, schedules.  
  - Migration scripts managed by `drizzle-kit`.  
- **Error Handling**  
  - Consistent JSON error format, clear HTTP status codes (400, 401, 404, 500).  
- **Testing & Documentation**  
  - Integration tests with Jest and Supertest.  
  - OpenAPI specification for all endpoints.  
- **Deployment & Environment**  
  - Dockerfile and `docker-compose.yaml` for local dev environment.  
  - Vercel configuration for production deployment.  

## 5. Tech Stack & Tools

- **Backend Framework**: Next.js API Routes (TypeScript)
- **Authentication Library**: `better-auth` configured for JWT in `lib/auth.ts`
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM + `drizzle-kit` for migrations
- **API Testing**: Jest + Supertest
- **API Documentation**: OpenAPI (Swagger)
- **Containerization**: Docker & `docker-compose`
- **Deployment**: Vercel
- **Request Validation**: Zod (optional for body/schema validation)
- **Client Integration**: React Native app will use `axios` or `fetch` with stored JWT tokens

## 6. Non-Functional Requirements

- **Performance**: API response time ≤ 200ms average under normal load; 95th percentile ≤ 500ms.  
- **Scalability**: Stateless API suitable for horizontal scaling on Vercel.  
- **Security**:  
  - Enforce HTTPS for all endpoints.  
  - Use JWT tokens stored securely on the client.  
  - Protect against OWASP Top Ten risks (e.g., injection, CSRF not applicable for mobile).  
- **Usability**: Clear and consistent error messages; intuitive JSON response structures.  
- **Reliability**: 99.9% uptime SLA for the API.  
- **Compliance**: Secure handling of user data; environment secrets never committed to source control.

## 7. Constraints & Assumptions

- The React Native frontend will handle token storage and refresh logic; backend only issues and verifies JWT.  
- Next.js version ≥ 13.4 with App Router is available on Vercel.  
- PostgreSQL instance provisioned locally (via Docker) and in production.  
- `drizzle-kit` must support the chosen database version for migrations.  
- No external AI models or machine learning components are required at this stage.

## 8. Known Issues & Potential Pitfalls

- **Session vs. Token Authentication**: The current `better-auth` setup is cookie-based by default. We must refactor it to JWT for mobile compatibility.  
- **Rate Limits & Throttling**: Vercel’s serverless functions may hit cold starts or concurrency limits. Mitigation: implement simple rate limiting or caching for frequently accessed endpoints (dashboard).  
- **Payment Idempotency**: Without unique idempotency keys, duplicate payment submissions can occur. Mitigation: require a client-generated idempotency key in the request body and enforce uniqueness in the database.  
- **Database Schema Evolution**: Adding new tables or columns without proper migration can cause runtime errors. Mitigation: require all schema changes to go through `drizzle-kit` migration scripts and CI validation.  
- **Testing Coverage Gaps**: Without end-to-end tests, subtle bugs may slip through. Mitigation: enforce a minimum test coverage threshold in CI.

---

This PRD serves as the definitive guide for building and extending the Warga+ backend API. It contains all necessary details—scope, user flow, features, tech stack, and constraints—to generate further technical documents (Tech Stack Doc, Frontend Guidelines, Backend Structure) without ambiguity.