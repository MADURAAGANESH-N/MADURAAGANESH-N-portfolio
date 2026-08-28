# Maduraaganesh N. — AI Engineer Portfolio

A production-ready, full-stack personal portfolio and showcase platform built for **Maduraaganesh N.**, an **AI Engineer at Zoho**, utilizing the **MERN** stack (MongoDB, Express.js, React.js with Vite & Tailwind CSS, Node.js).

---

## 🌟 Key Highlights & Architecture

### 1. Dynamic GitHub Repository Engine (Core Feature)
- **GitHub is the Source of Truth**: The application integrates dynamically with the official GitHub REST API (`https://api.github.com/users/MADURAAGANESH-N/repos`).
- **Zero Manual Recreation**: Whenever a new public repository is created under [MADURAAGANESH-N](https://github.com/MADURAAGANESH-N), the backend automatically discovers and categorizes it without requiring manual entry in MongoDB.
- **Smart Server-Side In-Memory Cache**: Cached for 20 minutes to prevent API rate limits, with an on-demand Admin Cache Refresh trigger.
- **Live Overrides & Filtering**: MongoDB stores only portfolio-specific customizations (e.g. Featured badges, visibility toggles, custom category tags, and display ordering).
- **Zero Fabrication**: Real code, real stars, real forks, real commit timelines, and live demo buttons rendered only when a valid homepage URL exists.

### 2. Modern AI Engineer Aesthetic
- Dark-first theme (`#050816` background, `#0B1120` cards, `#6366F1` indigo, `#06B6D4` cyan, `#8B5CF6` purple).
- Interactive Canvas Neural-Network & Particle visualizer reacting to mouse movement.
- Framer Motion micro-interactions respecting `prefers-reduced-motion`.
- Fully responsive across desktop (3 cols), tablet (2 cols), and mobile (1 col + drawer).

### 3. Verified Persona & Zero Fabrication Standard
- **Name**: Maduraaganesh N.
- **Role**: AI Engineer
- **Company**: Zoho
- **Qualification**: B.Tech – Information Technology
- **Email**: `nmaduraaganesh@gmail.com`
- **GitHub**: [https://github.com/MADURAAGANESH-N](https://github.com/MADURAAGANESH-N)
- **LinkedIn**: `[Add correct public LinkedIn URL]` (Placeholder editable in Admin)
- **Domains**: Artificial Intelligence, Machine Learning, Generative AI, LLM Applications, AI Engineering, Software Engineering.

---

## 🏗️ Architecture & Folder Structure

```
maduraaganesh-portfolio/
│
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS + Framer Motion)
│   ├── public/                 # Static assets, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/         # HeroBackground, Navbar, Footer, ProjectCard, SkillCard, etc.
│   │   ├── context/            # AuthContext (Admin JWT Session state)
│   │   ├── pages/              # Home, About, Skills, Experience, Projects, Education, Contact
│   │   │   └── admin/          # Login, Dashboard, AdminProjects, AdminSkills, AdminMessages, etc.
│   │   ├── services/           # Axios API client, githubService, portfolioService, authService
│   │   ├── index.css           # Tailwind design tokens and glassmorphic utilities
│   │   ├── App.jsx             # React Router v6 navigation structure
│   │   └── main.jsx            # Application entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend (Node.js + Express.js + Mongoose)
│   ├── config/                 # Resilient MongoDB connector
│   ├── controllers/            # auth, github, profile, skills, experience, education, contact
│   ├── middleware/             # JWT auth guard, rate limiters, centralized errorHandler
│   ├── models/                 # User, Profile, Skill, Experience, Education, RepoConfig, ContactMessage
│   ├── routes/                 # Express route definitions
│   ├── services/               # githubService.js (GitHub REST API client + categorizer + caching)
│   ├── utils/                  # Database seeder
│   ├── server.js               # Express application setup with Helmet, CORS, Rate Limiters
│   ├── package.json
│   └── .env.example
│
├── GITHUB_PROFILE_README.md    # Ready-to-use Profile README for MADURAAGANESH-N
├── .gitignore                  # Security-first ignore rules
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **MongoDB**: (Optional) Local MongoDB or MongoDB Atlas connection string. If MongoDB is offline, the server runs with resilient fallback data.

### 1. Clone & Configure Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/maduraaganesh_portfolio
JWT_SECRET=your_super_secure_jwt_secret_key_32_chars_min
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=nmaduraaganesh@gmail.com
ADMIN_PASSWORD=Admin@ZohoAI2026
```

Start the Backend server:
```bash
# Production mode
npm start

# Or development mode with auto-reload
npm run dev
```

### 2. Configure & Run Frontend

```bash
cd ../client
npm install
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## 🔐 Admin Dashboard Access

- Navigate to `/admin/login` or click the Shield icon in the navigation bar.
- **Default Credentials** (Configurable in `.env` / Admin Profile):
  - **Email**: `nmaduraaganesh@gmail.com`
  - **Password**: `Admin@ZohoAI2026`

---

## 📡 REST API Specifications

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status, uptime, and database connection check | No |
| `GET` | `/api/github/repos` | Dynamically discovered public repositories | No |
| `GET` | `/api/github/featured` | Curated featured repositories for hero display | No |
| `GET` | `/api/github/profile` | GitHub profile stats, total stars, forks, languages | No |
| `POST` | `/api/github/refresh` | Invalidate cache & reload fresh GitHub repos | Yes (JWT) |
| `POST` | `/api/github/featured` | Toggle repository featured / hidden / order | Yes (JWT) |
| `GET` | `/api/profile` | Retrieve verified persona information | No |
| `PUT` | `/api/profile` | Update profile information | Yes (JWT) |
| `GET` | `/api/skills` | List categorized skills | No |
| `POST` | `/api/skills` | Add new skill | Yes (JWT) |
| `GET` | `/api/experience` | List career timeline entries | No |
| `GET` | `/api/education` | List academic qualifications | No |
| `POST` | `/api/contact` | Submit contact inquiry (Rate limited) | No |
| `GET` | `/api/contact` | Retrieve inquiries inbox | Yes (JWT) |
| `POST` | `/api/auth/login` | Authenticate administrator and receive JWT | No |

---

## 🛡️ Security Best Practices

- **Zero Secret Exposure**: `.env` and sensitive credentials are never bundled in client builds.
- **Rate Limiting**: `express-rate-limit` prevents brute-force login and spam submissions on `/api/contact`.
- **Helmet**: Secures HTTP headers and enforces strict cross-origin policies.
- **Bcrypt Password Hashing**: Passwords are salted and hashed (10 rounds) before database storage.
- **CORS Whitelisting**: Strict origin controls prevent unauthorized cross-origin requests.

---

## 🚀 Deployment Instructions

### Deploy Frontend (e.g. Vercel, Netlify)
1. Set build command: `npm run build`
2. Set output directory: `dist`
3. Set environment variable: `VITE_API_URL=https://your-backend-domain.com/api`

### Deploy Backend (e.g. Render, Railway, AWS, DigitalOcean)
1. Set start command: `npm start`
2. Set environment variables:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_production_secret`
   - `CLIENT_URL=https://your-frontend-domain.com`

---

## 👤 Author
**Maduraaganesh N.**  
AI Engineer @ Zoho  
- **GitHub**: [https://github.com/MADURAAGANESH-N](https://github.com/MADURAAGANESH-N)  
- **Email**: [nmaduraaganesh@gmail.com](mailto:nmaduraaganesh@gmail.com)
#   M A D U R A A G A N E S H - N - p o r t f o l i o  
 