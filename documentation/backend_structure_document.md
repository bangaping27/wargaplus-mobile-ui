# Backend Structure Document for Warga+ Mobile App

## 1. Backend Architecture

**Overview**
The Warga+ backend is built as a headless API using Next.js API Routes and TypeScript. It follows a modular design that separates routing, business logic, and data access, making it easy to add features and maintain the code over time.

**Key Patterns & Frameworks**
- Next.js API Routes: Organize RESTful endpoints under `app/api/`.
- TypeScript: Enforces type safety across the entire stack.
- Drizzle ORM: Provides a type-safe layer on top of PostgreSQL.
- better-auth: Handles user authentication and session management.
- Service Layer Pattern: Business logic lives outside route handlers (e.g., `paymentService.ts`).

**Scalability, Maintainability & Performance**
- Modular code folders (`app/api/`, `db/`, `lib/`) let teams work on features independently.
- Type safety reduces runtime errors and speeds up development.
- Stateless, token-based auth (JWT) supports horizontal scaling—any instance can service any request.
- Dockerization ensures consistent environments from development to production.

## 2. Database Management

**Technology**
- PostgreSQL (relational SQL database) for structured data.
- Drizzle ORM for type-safe database queries and migrations.

**Data Organization & Practices**
- Data is normalized into dedicated tables (users, sessions, payments, announcements, feed items, schedules).
- Migrations managed by `drizzle-kit` ensure schema changes are tracked and applied consistently.
- Environment variables store database credentials securely.
- Regular backups and versioned migration scripts guard against data loss or schema drift.

## 3. Database Schema

**Human-Readable Description**

1. **Users**: Holds account info (email, password hash, name, address, house details, timestamps).
2. **Sessions**: Tracks active login tokens, expiration, and links to users.
3. **Payments (iuran)**: Records payment amount, date, status, and associated user.
4. **Announcements**: Stores community announcements with title, message, and publish date.
5. **Feed Items**: Contains information cards for the app feed (title, summary, image link, publish timestamp).
6. **Schedules**: Event schedules with date, time, title, and description.

**PostgreSQL Schema (SQL)**
```sql
-- Users table
auto create extension if not exists "uuid-ossp";
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  house_number VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feed items table
CREATE TABLE feed_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  summary TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. API Design and Endpoints

**Approach**
- RESTful design using Next.js API Routes under `app/api/`.
- JSON over HTTP with clear status codes (200, 201, 400, 401, 404, 500).
- Token passed in `Authorization: Bearer <token>` header for protected routes.

**Key Endpoints**

1. **Authentication** (`/api/auth`)
   - POST `/sign-in`: Accepts email and password. Returns JWT token.
   - POST `/sign-up`: Accepts user details. Creates account and returns token.
   - POST `/sign-out`: Invalidates the session token.

2. **Dashboard Data** (`/api/dashboard`)
   - GET `/api/dashboard`: Returns user’s payment status, latest announcements, and upcoming schedules.
   - Protected: Requires valid JWT.

3. **Payments** (`/api/payments`)
   - GET `/api/payments`: Lists user’s payment history (with pagination).
   - POST `/api/payments`: Records a new payment.
   - Protected: Requires valid JWT.

4. **Feed** (`/api/feed`)
   - GET `/api/feed`: Returns paginated list of feed items.
   - Protected: Requires valid JWT.

5. **Profile** (`/api/profile`)
   - GET `/api/profile`: Fetches user profile data.
   - PUT `/api/profile`: Updates user information (address, house number).
   - Protected: Requires valid JWT.

## 5. Hosting Solutions

**Environment**
- Docker & Docker Compose: Local development with consistent infrastructure (Next.js server + PostgreSQL).
- Vercel: Production hosting for Next.js API Routes.

**Benefits**
- Docker: Developers can spin up the exact stack locally, reducing "works on my machine" issues.
- Vercel: Automatic scaling, global edge network, built-in SSL, and a generous free tier.
- Environment variables in Vercel keep secrets out of source control.

## 6. Infrastructure Components

- **Load Balancer & Auto-Scaling**: Managed by Vercel—automatically distributes traffic across instances and scales on demand.
- **Caching**: Vercel’s edge network caches static responses at the CDN layer. For dynamic data, a Redis instance (optional) can cache frequent queries (e.g., announcements).
- **Content Delivery Network (CDN)**: Vercel provides a global CDN, speeding up asset delivery.
- **Container Registry**: Docker images can be stored in Docker Hub or a private container registry for CI/CD pipelines.

## 7. Security Measures

- **Authentication & Authorization**
  - JWT tokens for stateless session management.
  - Protected routes verify token signature and expiry.
- **Data Encryption**
  - TLS/HTTPS encrypts data in transit by default on Vercel.
  - Postgres credentials stored securely in environment variables.
- **Input Validation**
  - Use Zod (or a similar library) in route handlers to validate request bodies.
- **Database Security**
  - Least-privilege database user with only needed permissions.
  - Regular backups and encrypted snapshots.
- **Other Practices**
  - Enable CORS with strict origin checks.
  - Sanitize all inputs to prevent SQL injection or XSS.

## 8. Monitoring and Maintenance

- **Logging & Error Tracking**
  - Vercel server logs.
  - Integrate Sentry or LogRocket for real-time error alerts.
- **Performance Monitoring**
  - Vercel Analytics for request latency.
  - Database monitoring via tools like pgAdmin or a managed Postgres monitoring service.
- **Testing**
  - Jest & Supertest for integration tests against API endpoints.
  - CI/CD pipelines (GitHub Actions) run tests on every push.
- **Maintenance**
  - Scheduled database vacuum and index maintenance.
  - Versioned database migrations via `drizzle-kit`.
  - Regular dependency updates with tools like Dependabot.

## 9. Conclusion and Overall Backend Summary

The Warga+ backend leverages Next.js API Routes, TypeScript, Drizzle ORM, and better-auth to deliver a secure, scalable, and maintainable API for the React Native mobile app. Docker and Vercel streamline development and production environments, while the modular folder structure and service-layer pattern ensure clarity and extensibility. Comprehensive security measures, monitoring tools, and a clear migration strategy protect data integrity and uptime. This architecture aligns directly with Warga+’s goals: fast delivery of reliable user and community data to the mobile client, with room to grow as new features emerge.