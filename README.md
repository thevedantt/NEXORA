# Nexora Marketplace Operations Platform

Nexora is a next-generation marketplace management dashboard built for performance, scalability, and AI-driven insights. It serves both Administrators and Vendors with dedicated, role-protected interfaces.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI (Shadcn)
- **Database**: PostgreSQL (via [Neon Serverless](https://neon.tech))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Clerk](https://clerk.com)
- **AI**: Google Gemini (via AI SDK)

## 🛠️ Features

- **Role-Based Access Control**: Strict separation between Admin and Vendor portals.
- **Real-time Analytics**: Dashboard with KPIs, charts, and activity feeds.
- **Order Management**: Comprehensive order tracking and status updates.
- **AI Assistant**: Context-aware AI companion (`NexoAI`) for operational queries.
- **Vendor Portal**: Dedicated tools for vendors to manage inventory and fulfillment.

## 📦 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file with the following keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   DATABASE_URL=postgres://...
   GEMINI_API_KEY=...
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Database Migration**:
   ```bash
   npx drizzle-kit push
   ```

## 🔒 Security

- **Authentication**: Powered by Clerk with middleware usage for route protection.
- **API Protection**: API routes verify user roles (Admin/Vendor).
- **Environment**: No hardcoded secrets.

## 📄 License

Proprietary - Nexora Inc.