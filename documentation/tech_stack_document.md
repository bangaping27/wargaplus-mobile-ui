# Tech Stack Document for Warga+ Mobile App

This document explains in simple terms all the technologies used to build the Warga+ mobile application and its backend API. It covers how each part fits together, why we chose it, and how it helps deliver a secure, reliable, and user-friendly experience.

## 1. Frontend Technologies

The Warga+ mobile app is built with React Native, a framework for building native apps using JavaScript and TypeScript. Here’s what we’re using:

• **React Native**: Lets us write one codebase for both iOS and Android, speeding up development and ensuring consistent user experience.  
• **TypeScript**: Adds type safety on top of JavaScript. This means we catch errors early during development instead of at runtime, resulting in a more stable app.  
• **styled-components**: A styling library that allows us to write CSS directly in our components. It keeps styles scoped to each component, making design updates easier and more predictable.  
• **react-navigation** (BottomTabNavigator): Provides smooth, familiar navigation patterns (tabs, stacks) that users expect on mobile devices.  
• **Networking (fetch or axios)**: We use the built-in `fetch` API or the popular `axios` library to call our backend endpoints, handle responses, and manage authentication tokens.

These choices give us a fast, polished user interface and allow our developers to work efficiently.

## 2. Backend Technologies

The backend is a headless API built using Next.js. It handles all server-side logic, user authentication, and data storage.

• **Next.js API Routes**: Provides a straightforward way to define RESTful endpoints in the same project. Each URL under `/app/api/` corresponds to a function that runs on the server.  
• **better-auth**: A library managing sign-up, sign-in, and sign-out flows. We configure it for token-based authentication (JWT), which is ideal for mobile clients.  
• **PostgreSQL**: Our choice of relational database for storing user accounts, payment records, announcements, and more. It’s a proven, reliable database engine.  
• **Drizzle ORM**: A modern library that gives us type-safe database queries. Because it integrates with TypeScript, we know our database interactions match our data models exactly.  
• **Zod** (recommended): A toolkit for validating incoming data. It ensures that any data the mobile app sends us meets our expectations before we use it.  
• **Jest & Supertest** (recommended): Testing tools for writing automated tests. They help verify authentication flows, API logic, and database interactions, so we catch bugs early.

Together, these tools create a robust, maintainable backend that securely serves data to the mobile app.

## 3. Infrastructure and Deployment

To keep our backend reliable, scalable, and easy to update, we’ve chosen the following infrastructure setup:

• **Docker & docker-compose**: Containerization ensures everyone on the team runs the same environment locally, including a PostgreSQL database.  
• **Environment Variables (`.env` files)**: Securely store sensitive data like database credentials and authentication secrets outside of source code.  
• **Vercel**: A cloud platform tailored for Next.js applications. It automatically deploys our API whenever we push changes, handling server scaling and HTTPS setup.  
• **Version Control (Git + GitHub)**: Tracks all code changes, enables collaboration, and serves as the source of truth for both frontend and backend code.  
• **(Optional) CI/CD with GitHub Actions**: Automates testing and deployment steps on every commit or pull request, ensuring that only high-quality code reaches production.

This setup makes it simple to deploy updates safely and roll back if needed.

## 4. Third-Party Integrations

While most of our core logic lives in our own code, we rely on a few key libraries and services:

• **better-auth**: Manages user sessions and tokens so we don’t have to build authentication from scratch.  
• **Drizzle ORM** & **drizzle-kit**: Handles database migrations and schema definitions.  
• **Vercel**: Hosts our backend and handles server scaling, SSL certificates, and global distribution.  
• **react-navigation**: Provides navigation flows on the mobile side without us having to reinvent the wheel.

These integrations save development time while providing battle-tested solutions.

## 5. Security and Performance Considerations

Security and smooth performance are top priorities for Warga+:

• **Token-Based Authentication (JWT)**: We issue signed tokens on login, which the mobile app stores securely and sends with each request. This prevents unauthorized access.  
• **HTTPS Everywhere**: Vercel automatically provides SSL, so all data in transit is encrypted.  
• **Input Validation (Zod)**: All incoming requests are checked for correct structure and types to prevent malformed data or injection attacks.  
• **Error Handling**: Our API routes return clear HTTP status codes (400, 401, 404, 500) and JSON error messages so the app can show meaningful feedback to users.  
• **Pagination**: Endpoints that return lists (feed items, payment history) use limit/offset parameters to avoid overloading the server or client with too much data at once.  
• **Type Safety**: Using TypeScript and Drizzle ORM together reduces runtime errors and improves overall reliability.

These practices keep user data safe and ensure a responsive app experience.

## 6. Conclusion and Overall Tech Stack Summary

By combining React Native, Next.js, PostgreSQL, and a suite of modern libraries, we’ve built a secure, scalable foundation for the Warga+ mobile app. Our choices align with the project goals:

• Delivering a **consistent, native-feeling UI** across devices  
• Ensuring **data integrity** through type-safe database interactions  
• Protecting user data with **token-based authentication** and **secure deployments**  
• Facilitating **rapid development** and **easy maintenance** through containerization, automated testing, and clear project structure

Unique strengths of this stack include end-to-end type safety (TypeScript + Drizzle), effortless deployment with Vercel, and a ready-made authentication flow via better-auth. Together, these elements make Warga+ robust and ready to grow as we add new features and scale to more users.