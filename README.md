# Football Ecosystem Platform - Frontend 🏆⚽

Modern, responsive frontend application for the Football Ecosystem Platform - revolutionizing African football management from grassroots to professional level.

## 🌟 About The Project

This is the **frontend application** built with Next.js for the Football Ecosystem Platform. It connects to a separate NestJS backend API to provide a comprehensive solution for managing football competitions, building a national player database, providing live match coverage, and enabling professional monetization of the football ecosystem across Africa.

### Key Features

- **🏆 Competition Management**: Digital organization of leagues, cups, and tournaments
- **📊 National Player Database**: Comprehensive profiles for every player with stats and scouting reports
- **📡 Live Match Coverage**: Real-time scoring with dedicated match operators
- **💰 Professional Monetization**: Prize distribution, player payments, and transfer management
- **🔍 Talent Discovery**: Advanced scouting system and recruitment tools
- **📱 Mobile-First Design**: Optimized for African markets with low-bandwidth support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- **NestJS backend API running** (see backend repository)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/football-ecosystem-frontend.git
cd football-ecosystem-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your backend API:
```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_WS_URL="ws://localhost:4000"
```

4. Make sure the **NestJS backend is running** on port 4000 (or your configured port)

5. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The page auto-updates as you edit files. The application will connect to your NestJS backend API.

## 🔧 Development Workflow

### Running Both Frontend and Backend

For local development, you need both applications running:

**Terminal 1 - Backend (NestJS):**
```bash
cd football-ecosystem-backend
npm run start:dev
# Backend runs on http://localhost:4000
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd football-ecosystem-frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run tests
```

## 📁 Project Structure

```
football-ecosystem-frontend/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Dashboard pages (protected)
│   │   ├── competitions/
│   │   ├── teams/
│   │   ├── players/
│   │   ├── matches/
│   │   └── scouting/
│   ├── (public)/          # Public pages
│   │   ├── competitions/
│   │   └── players/
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page components
│   ├── forms/            # Form components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
│   ├── api.ts            # API client for NestJS backend
│   ├── auth.ts           # Authentication utilities
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useCompetitions.ts
│   └── usePlayers.ts
├── types/                # TypeScript types/interfaces
├── public/               # Static assets
│   ├── images/
│   └── icons/
└── styles/               # Global styles
```

## 🎯 Core Modules

### 1. Competition Management
- Create and manage leagues, cups, and tournaments
- Automated scheduling and fixtures
- Registration and payment processing
- Prize pool management

### 2. Player Database
- Complete player profiles with photos and stats
- Performance tracking across all competitions
- Career history and achievements
- Scouting reports and ratings

### 3. Live Scoring
- Real-time match updates
- Dedicated match operators
- Event timeline (goals, cards, substitutions)
- Live statistics and analytics

### 4. Team Management
- Team profiles and rosters
- Staff management (coaches, analysts)
- Tactics and formations
- Training and meetings

### 5. Scout & Recruitment
- Advanced search and filtering
- Player comparisons
- Scout reports and evaluations
- Transfer market integration

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: Zustand / TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts / Chart.js
- **Icons**: Lucide React
- **Animations**: Framer Motion

### API Integration
- **HTTP Client**: Axios / Fetch API
- **Real-time**: Socket.io Client (for live match updates)
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: JWT tokens from NestJS backend

### Development Tools
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript strict mode
- **Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright (optional)

### Backend (Separate Repository)
- **Framework**: NestJS
- **Database**: MySQL / PostgreSQL with Prisma
- **API Documentation**: Swagger
- **Real-time**: Socket.io Gateway

> **Note**: The backend API repository is separate. Make sure it's running before starting this frontend application.

## 🔌 Backend API Integration

This frontend application communicates with a **NestJS backend API**. 

### API Client Setup

The application uses a centralized API client (`lib/api.ts`):

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Refresh token logic here
    return Promise.reject(error);
  }
);

export default api;
```

### Usage with TanStack Query

```typescript
// hooks/useCompetitions.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const { data } = await api.get('/leagues');
      return data;
    },
  });
};
```

### API Endpoints

The backend provides the following main endpoints:

- **Authentication**: `/api/auth/*` - Login, register, logout
- **Users**: `/api/users/*` - User management
- **Organizations**: `/api/organizations/*` - Organization CRUD
- **Leagues**: `/api/leagues/*` - Competition management
- **Teams**: `/api/teams/*` - Team management
- **Players**: `/api/players/*` - Player profiles and stats
- **Events**: `/api/events/*` - Match/game management
- **Live Scoring**: `/api/matches/live/*` - Real-time match updates
- **Scouting**: `/api/scout-reports/*` - Player evaluations
- **Transfers**: `/api/transfers/*` - Transfer management

### WebSocket Events

Real-time updates via Socket.io:

- `match:update` - Live match score updates
- `match:goal` - Goal scored
- `match:card` - Card shown
- `match:substitution` - Player substitution
- `leaderboard:update` - League standings update

See the backend repository for complete API documentation (Swagger available at `/api/docs`).

## 🔐 Authentication Flow

The application uses **JWT-based authentication** with the NestJS backend:

1. User submits credentials to `/api/auth/login`
2. Backend validates and returns JWT access token + refresh token
3. Frontend stores tokens securely (httpOnly cookies recommended)
4. All API requests include the JWT token in Authorization header
5. Token refresh handled automatically when expired

### User Roles (RBAC)

The platform implements role-based access control:

- **Super Admin**: Full platform management
- **Organization Owner**: Manage their organization and competitions
- **Team Manager**: Manage teams and players
- **Coach**: Team staff access
- **Scout**: Player evaluation and reports
- **Player**: Personal profile management
- **Fan**: View-only access to public content

Access control is enforced on the backend. The frontend shows/hides UI elements based on user role.

## 🌍 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/football-ecosystem)

### Environment Variables

Required environment variables for the frontend:

```env
# Backend API
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_WS_URL="ws://localhost:4000"

# App Configuration
NEXT_PUBLIC_APP_NAME="Football Ecosystem"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_BETTING="false"
NEXT_PUBLIC_ENABLE_PAYMENTS="true"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=""
```

> **Important**: The backend API must be running and accessible at the configured URL.

## 📱 Mobile App

A companion mobile app is planned for:
- iOS (React Native)
- Android (React Native)

## 🗺️ Roadmap

### Phase 1: Pilot (Months 1-6) ✅
- [x] Core platform development
- [x] Competition management
- [x] Player database
- [ ] Live scoring system
- [ ] Beta launch in 2-3 cities

### Phase 2: Regional Expansion (Months 7-18)
- [ ] National federation partnerships
- [ ] Mobile app launch
- [ ] 500+ organizations onboarded
- [ ] 50,000+ player profiles

### Phase 3: Pan-African (Months 19-36)
- [ ] Launch in 5+ African countries
- [ ] Regional offices
- [ ] 100,000+ player database
- [ ] Break even and profitability

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Contact

Project Link: [https://github.com/your-username/football-ecosystem-frontend](https://github.com/your-username/football-ecosystem-frontend)

Backend Repository: [https://github.com/DohouFawase/nest.js_api](https://github.com/your-username/football-ecosystem-backend)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Framework](https://nestjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)
- African Football Community

## 📚 Related Repositoriesgit branch -M main
git remote add origin https://github.com/DohouFawase/football-ecosystem-frontend.git


- **Backend API**: [football-ecosystem-backend](https://github.com/DohouFawase/nest.js_api) (NestJS + Prisma)
- **Mobile App**: Coming soon (React Native)
- **Admin Dashboard**: Integrated in this frontend

---

**Built with ❤️ for African Football**

*Revolutionizing the beautiful game, one match at a time* ⚽🌍