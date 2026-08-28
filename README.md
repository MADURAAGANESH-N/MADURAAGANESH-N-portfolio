# Maduraaganesh N. — AI Engineer Portfolio

A production-ready, full-stack personal portfolio and showcase platform built for **Maduraaganesh N.**, an **AI Engineer at Zoho**.

The platform is designed to present professional experience, technical skills, education, projects, and GitHub activity through a modern AI-engineering-focused interface.

Built using the **MERN stack**, with a dynamic GitHub integration that keeps public repositories synchronized automatically.

---

## 🚀 Overview

This portfolio combines a modern responsive frontend with a secure backend and dynamic GitHub integration.

Instead of manually maintaining project information, the platform treats **GitHub as the primary source of truth** for public repositories.

When a new public repository is created under the author's GitHub account, the portfolio can automatically discover and display it without requiring manual project creation in MongoDB.

### Core Capabilities

* 🔗 Dynamic GitHub repository discovery
* ⭐ Live GitHub stars, forks, languages, and repository information
* 🏷️ Custom project categorization and featured status
* ⚡ Server-side GitHub API caching
* 🎨 Modern dark-first AI Engineer interface
* ✨ Interactive particle and neural-network background
* 📱 Fully responsive design
* 🔐 JWT-protected administration dashboard
* 🛡️ Security-focused backend architecture
* 📬 Contact form with rate limiting
* 🗄️ MongoDB-backed portfolio customization
* 🚀 Production-ready deployment architecture

---

# ✨ Key Features

## 1. Dynamic GitHub Repository Engine

GitHub acts as the **source of truth for public repositories**.

The backend integrates with the official GitHub REST API to dynamically retrieve repositories from:

**GitHub:** `MADURAAGANESH-N`

### How it works

```text
GitHub Account
      │
      ▼
GitHub REST API
      │
      ▼
GitHub Repository Service
      │
      ├── Repository Discovery
      ├── Categorization
      ├── Statistics
      └── 20-Minute Cache
      │
      ▼
MongoDB Overrides
      │
      ├── Featured
      ├── Hidden
      ├── Custom Category
      └── Display Order
      │
      ▼
React Portfolio
```

### Design Principles

**GitHub is the source of truth**

Repository information such as names, descriptions, stars, forks, languages, and repository URLs is retrieved directly from GitHub.

**Zero manual recreation**

New public repositories can automatically appear in the portfolio without manually creating a project entry in MongoDB.

**MongoDB stores only overrides**

MongoDB is used for portfolio-specific customization rather than duplicating GitHub repository data.

Examples include:

* Featured status
* Visibility
* Custom categories
* Display order
* Portfolio-specific metadata

**Smart caching**

GitHub responses are cached server-side for approximately **20 minutes** to reduce unnecessary API requests and help prevent rate-limit issues.

**Manual refresh**

An authenticated administrator can invalidate the cache and request fresh GitHub repository data.

**Zero fabrication**

The portfolio displays repository information based on real GitHub data.

Demo buttons are displayed only when a valid repository homepage URL is available.

---

# 🎨 2. Modern AI Engineer Design

The interface follows a dark-first visual system designed around an AI/software-engineering aesthetic.

### Design System

| Element          | Value     |
| ---------------- | --------- |
| Background       | `#050816` |
| Card Background  | `#0B1120` |
| Primary Accent   | `#6366F1` |
| Secondary Accent | `#06B6D4` |
| Gradient Accent  | `#8B5CF6` |

### Visual Features

* Interactive particle background
* Neural-network visualization
* Mouse-responsive canvas effects
* Glassmorphism-inspired cards
* Framer Motion animations
* Smooth page transitions
* Micro-interactions
* Responsive navigation
* Reduced-motion accessibility support

### Responsive Layout

```text
Desktop  → 3-column layout
Tablet   → 2-column layout
Mobile   → 1-column layout + navigation drawer
```

---

# 👤 3. Professional Profile

The portfolio represents the following professional profile:

| Field             | Information                                                 |
| ----------------- | ----------------------------------------------------------- |
| **Name**          | Maduraaganesh N.                                            |
| **Role**          | AI Engineer                                                 |
| **Company**       | Zoho                                                        |
| **Qualification** | B.Tech – Information Technology                             |
| **Email**         | [nmaduraaganesh@gmail.com](mailto:nmaduraaganesh@gmail.com) |
| **GitHub**        | MADURAAGANESH-N                                             |
| **LinkedIn**      | Configurable through Admin Dashboard                        |

### Areas of Expertise

* Artificial Intelligence
* Machine Learning
* Generative AI
* Large Language Model Applications
* AI Engineering
* Software Engineering

---

# 🏗️ Architecture

The application follows a full-stack MERN architecture.

```text
┌───────────────────────────────────────────────┐
│                  FRONTEND                     │
│                                               │
│ React + Vite + Tailwind CSS + Framer Motion  │
│                                               │
│ Home │ About │ Skills │ Experience │ Projects │
│ Education │ Contact │ Admin                  │
└──────────────────────┬────────────────────────┘
                       │
                       │ REST API
                       ▼
┌───────────────────────────────────────────────┐
│                  BACKEND                      │
│                                               │
│ Node.js + Express.js + Mongoose              │
│                                               │
│ Auth │ GitHub │ Profile │ Skills │ Projects  │
│ Experience │ Education │ Contact             │
└───────────────┬──────────────────┬────────────┘
                │                  │
                ▼                  ▼
       ┌────────────────┐   ┌─────────────────┐
       │    MongoDB     │   │   GitHub API    │
       │                │   │                 │
       │ Portfolio      │   │ Public Repos    │
       │ Overrides      │   │ Repository Data │
       └────────────────┘   └─────────────────┘
```

---

# 📁 Project Structure

```text
maduraaganesh-portfolio/
│
├── client/
│   │
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroBackground
│   │   │   ├── Navbar
│   │   │   ├── Footer
│   │   │   ├── ProjectCard
│   │   │   ├── SkillCard
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext
│   │   │
│   │   ├── pages/
│   │   │   ├── Home
│   │   │   ├── About
│   │   │   ├── Skills
│   │   │   ├── Experience
│   │   │   ├── Projects
│   │   │   ├── Education
│   │   │   ├── Contact
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── Login
│   │   │       ├── Dashboard
│   │   │       ├── AdminProjects
│   │   │       ├── AdminSkills
│   │   │       ├── AdminMessages
│   │   │       └── ...
│   │   │
│   │   ├── services/
│   │   │   ├── api
│   │   │   ├── githubService
│   │   │   ├── portfolioService
│   │   │   └── authService
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   │   └── database configuration
│   │
│   ├── controllers/
│   │   ├── auth
│   │   ├── github
│   │   ├── profile
│   │   ├── skills
│   │   ├── experience
│   │   ├── education
│   │   └── contact
│   │
│   ├── middleware/
│   │   ├── JWT authentication
│   │   ├── rate limiting
│   │   └── error handling
│   │
│   ├── models/
│   │   ├── User
│   │   ├── Profile
│   │   ├── Skill
│   │   ├── Experience
│   │   ├── Education
│   │   ├── RepoConfig
│   │   └── ContactMessage
│   │
│   ├── routes/
│   ├── services/
│   │   └── githubService.js
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── GITHUB_PROFILE_README.md
├── .gitignore
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* Framer Motion
* React Router
* Axios
* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js
* Mongoose
* JWT
* Bcrypt
* Helmet
* Express Rate Limit
* CORS

## Database

* MongoDB
* MongoDB Atlas

## External Integration

* GitHub REST API

## Development & Deployment

* Git
* GitHub
* GitHub Actions
* Vercel / Netlify
* Render / Railway / AWS / DigitalOcean

---

# 📡 REST API

| Method | Endpoint               | Description                         | Authentication |
| ------ | ---------------------- | ----------------------------------- | -------------- |
| `GET`  | `/api/health`          | Backend health and database status  | Public         |
| `GET`  | `/api/github/repos`    | Retrieve public GitHub repositories | Public         |
| `GET`  | `/api/github/featured` | Retrieve featured repositories      | Public         |
| `GET`  | `/api/github/profile`  | Retrieve GitHub profile statistics  | Public         |
| `POST` | `/api/github/refresh`  | Refresh GitHub repository cache     | JWT            |
| `POST` | `/api/github/featured` | Update repository configuration     | JWT            |
| `GET`  | `/api/profile`         | Retrieve profile information        | Public         |
| `PUT`  | `/api/profile`         | Update profile information          | JWT            |
| `GET`  | `/api/skills`          | Retrieve skills                     | Public         |
| `POST` | `/api/skills`          | Add a skill                         | JWT            |
| `GET`  | `/api/experience`      | Retrieve experience                 | Public         |
| `GET`  | `/api/education`       | Retrieve education                  | Public         |
| `POST` | `/api/contact`         | Submit contact message              | Public         |
| `GET`  | `/api/contact`         | Retrieve contact messages           | JWT            |
| `POST` | `/api/auth/login`      | Authenticate administrator          | Public         |

---

# 🔐 Security

Security is treated as a core part of the application architecture.

### Authentication

Administrative functionality is protected using **JWT-based authentication**.

### Password Security

Administrator passwords are hashed using **Bcrypt** before being stored.

### Rate Limiting

API rate limiting helps protect:

* Authentication endpoints
* Contact submissions
* Public API endpoints

### HTTP Security

**Helmet** is used to improve HTTP security headers.

### CORS

The backend uses controlled CORS configuration to restrict unauthorized frontend origins.

### Environment Variables

Sensitive values are stored in environment variables and are never committed to the repository.

```text
.env
```

should always remain excluded through `.gitignore`.

> **Never commit production credentials, JWT secrets, database passwords, API keys, or administrator passwords to GitHub.**

---

# ⚙️ Local Development

## Prerequisites

Install the following:

* Node.js `18+`
* npm `9+`
* MongoDB or MongoDB Atlas

---

## 1. Clone the Repository

```bash
git clone https://github.com/MADURAAGANESH-N/maduraaganesh-portfolio.git

cd maduraaganesh-portfolio
```

---

## 2. Configure the Backend

```bash
cd server
npm install
```

Create:

```text
.env
```

using:

```text
.env.example
```

Example configuration:

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/maduraaganesh_portfolio

JWT_SECRET=your_secure_production_secret

CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_admin_password
```

> Replace all example values with your own secure credentials.

---

## 3. Start the Backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

## 4. Configure the Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create the frontend environment file if required:

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔑 Admin Dashboard

The administration interface is available at:

```text
/admin/login
```

The dashboard allows authorized administrators to manage portfolio-specific information such as:

* Profile information
* Skills
* Experience
* Education
* Featured repositories
* Repository visibility
* Repository categories
* Repository ordering
* Contact messages
* GitHub cache refresh

### Security Note

Administrator credentials should be configured through environment variables.

**Do not publish administrator passwords in this README or repository.**

---

# 🚀 Deployment

The application uses a separate deployment strategy for the frontend and backend.

```text
                    GitHub
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     Frontend                   Backend
     React/Vite                 Node/Express
          │                         │
          ▼                         ▼
   Vercel / Netlify         Render / Railway
                                    │
                                    ▼
                              MongoDB Atlas
                                    │
                                    ▼
                              GitHub REST API
```

## Frontend Deployment

Recommended platforms:

* Vercel
* Netlify

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

Environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Backend Deployment

Recommended platforms:

* Render
* Railway
* AWS
* DigitalOcean

Start command:

```text
npm start
```

Required environment variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_production_jwt_secret

CLIENT_URL=https://your-frontend-domain.com

ADMIN_EMAIL=your_admin_email

ADMIN_PASSWORD=your_secure_admin_password
```

---

# 🌐 Custom Domain

A custom domain can be connected after deploying the frontend.

Example:

```text
https://maduraaganesh.dev
```

The exact configuration depends on the hosting provider and domain registrar.

---

# 🔄 Continuous Deployment

The project can use **GitHub Actions** to automate deployment.

```text
Developer changes code
        │
        ▼
Push changes to GitHub
        │
        ▼
GitHub Actions
        │
        ├── Install dependencies
        ├── Run build
        ├── Validate application
        └── Deploy
        │
        ▼
Production Website
```

This means future updates can be deployed automatically whenever changes are pushed to the configured production branch.

---

# 📊 GitHub Integration Flow

```text
User visits Projects
        │
        ▼
React requests /api/github/repos
        │
        ▼
Express GitHub Controller
        │
        ▼
GitHub Service
        │
        ├── Check 20-minute cache
        │
        ├── Cache available?
        │       │
        │       ├── Yes → Return cached data
        │       │
        │       └── No → Request GitHub API
        │
        ▼
Repository Categorization
        │
        ▼
Apply MongoDB Overrides
        │
        ▼
Return Repository Data
        │
        ▼
Project Cards
```

---

# 🧠 Repository Categorization

Repositories can be categorized based on available GitHub metadata.

Possible categories include:

* Artificial Intelligence
* Machine Learning
* Generative AI
* Web Development
* Backend Development
* Data Science
* Automation
* Other

Portfolio-specific category overrides can be managed through the administration dashboard.

---

# 📈 Scalability Considerations

The architecture is designed to support future growth.

Potential improvements include:

* Redis-based distributed caching
* Background GitHub synchronization
* GitHub webhooks
* CDN-based static asset delivery
* Database indexing
* API versioning
* Automated testing
* CI/CD quality gates
* Centralized application logging
* Error monitoring
* Containerized deployment

---

# ♿ Accessibility

The interface aims to provide an accessible user experience through:

* Responsive layouts
* Keyboard-friendly navigation
* Semantic HTML
* Appropriate contrast
* Reduced-motion support
* Responsive typography
* Mobile-first layouts

Animations respect the user's:

```text
prefers-reduced-motion
```

setting where applicable.

---

# 🧪 Testing Checklist

Before production deployment, verify:

* [ ] Frontend builds successfully
* [ ] Backend starts successfully
* [ ] MongoDB connection works
* [ ] GitHub API integration works
* [ ] GitHub repository caching works
* [ ] Admin authentication works
* [ ] Protected routes reject unauthorized requests
* [ ] Contact form works
* [ ] Rate limiting works
* [ ] CORS configuration is correct
* [ ] Production environment variables are configured
* [ ] No secrets are committed to Git
* [ ] Mobile layout works correctly
* [ ] Reduced-motion behavior works
* [ ] Production API URL is configured correctly

---

# 📌 Project Status

**Status:** Production-ready portfolio platform

### Current Capabilities

* [x] Responsive portfolio
* [x] Dynamic GitHub repository discovery
* [x] GitHub statistics
* [x] Repository categorization
* [x] Featured project management
* [x] MongoDB integration
* [x] JWT authentication
* [x] Admin dashboard
* [x] Contact management
* [x] API rate limiting
* [x] Security middleware
* [x] Responsive design
* [x] Animation system
* [ ] Automated testing suite
* [ ] Advanced CI/CD pipeline
* [ ] GitHub webhook synchronization

---

# 👨‍💻 Author

## Maduraaganesh N.

**AI Engineer @ Zoho**

B.Tech — Information Technology

### Areas of Interest

Artificial Intelligence · Machine Learning · Generative AI · LLM Applications · AI Engineering · Software Engineering

### Connect

* **GitHub:** `MADURAAGANESH-N`
* **LinkedIn:** Add your verified public LinkedIn profile
* **Email:** `nmaduraaganesh@gmail.com`

---

# 📄 License

This project is intended as a personal portfolio and showcase platform.

If you plan to reuse, redistribute, or modify the project, please review the applicable licensing requirements and third-party dependencies.

---

## ⭐ Acknowledgements

Built with modern open-source technologies and APIs, including:

* React
* Vite
* Tailwind CSS
* Framer Motion
* Node.js
* Express.js
* MongoDB
* GitHub REST API

---

**Built with curiosity, engineering discipline, and a focus on practical AI.**
