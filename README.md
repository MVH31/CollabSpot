# CollabSpot

A modern web platform for university students to upload, share, and find collaborators for academic projects with built-in plagiarism detection.

## 🚀 Features

- **Project Upload & Management**: Upload academic projects with titles, abstracts, and files (PDF, DOCX, PPTX)
- **Domain-based Categorization**: Organize projects by academic domains (Machine Learning, Web Development, etc.)
- **Plagiarism Detection**: Built-in PlagScan tool to check project similarity against existing submissions
- **Collaboration Discovery**: Find similar projects and potential collaborators
- **File Processing**: Support for multiple document formats with content extraction

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database with Prisma ORM
- **Multer** for file uploads
- **Document parsers** for PDF, DOCX, and PPTX files

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation

## 📁 Project Structure

```
CollabSpot/
├── Backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema and migrations
│   └── uploads/             # File storage
├── Frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the Backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/collabspot"
   PORT=5000
   ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📖 Usage

### For Students

1. **Upload Your Project**
   - Visit the upload page
   - Fill in project details (title, abstract, author information)
   - Select the appropriate domain
   - Upload your project file (PDF, DOCX, or PPTX)

2. **Check for Similarity**
   - Use the PlagScan tool to check your project against existing submissions
   - Review similarity scores for titles, abstracts, and content

3. **Explore Projects**
   - Browse projects by domain
   - Find similar projects and potential collaborators
   - Connect with other students working on related topics

### API Endpoints

- `GET /api/domains` - Get all project domains
- `GET /api/projects` - Get all projects
- `GET /api/projects/:domainId` - Get projects by domain
- `POST /api/projects` - Upload a new project
- `POST /api/plagscan` - Check project similarity

### Database Schema

The application uses PostgreSQL with the following main models:
- **Domain**: Project categories (Machine Learning, Web Development, etc.)
- **Project**: Student project submissions with metadata
- **Similarity**: Plagiarism detection results between projects

## 👥 About

CollabSpot is designed to foster collaboration among university students while maintaining academic integrity through plagiarism detection. It helps students find like-minded peers working on similar projects and encourages knowledge sharing and teamwork.

---