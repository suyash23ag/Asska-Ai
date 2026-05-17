# ASSka AI - Your AI Coding Mentor

![ASSka AI](https://img.shields.io/badge/ASSka%20AI-Coding%20Mentor-00d4ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)

## 🚀 Overview

ASSka AI is a premium AI-powered coding mentor and personalized learning platform designed to help students learn, practice, and prepare for coding interviews intelligently.

### ✨ Key Features

- 🤖 **AI Coding Mentor** - Powered by OpenAI GPT-4o-mini
- 💻 **Multi-Language Support** - Code examples in C++, Java, and Python
- 🎨 **Modern UI/UX** - Futuristic glassmorphism design
- 🖼️ **Image Analysis** - Upload and analyze images with AI
- 🎨 **Image Generation** - DALL-E 3 integration for creating images
- 📝 **Syntax Highlighting** - 100+ languages with VS Code Dark+ theme
- 🔐 **Secure Authentication** - Clerk integration
- 💾 **Chat History** - Save and manage conversations
- 📱 **Responsive Design** - Works on all devices
- 🎯 **Interview Preparation** - Specialized interview mode
- 📚 **Learning Modes** - Beginner, Intermediate, and Interview levels

## 🛠️ Tech Stack

### Frontend
- **React 19.0** - UI library
- **Vite 5.3.4** - Build tool
- **React Router 6.25** - Routing
- **TanStack Query 5.51** - Data fetching
- **React Syntax Highlighter** - Code highlighting
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime
- **Express 4.19** - Web framework
- **MongoDB** - Database
- **Mongoose 8.5** - ODM

### AI & Services
- **OpenAI GPT-4o-mini** - Conversational AI
- **DALL-E 3** - Image generation
- **Clerk** - Authentication
- **ImageKit** - Image storage & CDN

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API Key
- Clerk Account
- ImageKit Account

### 1. Clone Repository
```bash
git clone https://github.com/suyash23ag/Asska-Ai.git
cd Asska-Ai
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Environment Variables

**Backend (.env):**
```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URL=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
```

### 4. Run Development Servers

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd client
npm run dev
```

Visit: `http://localhost:5173`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (already done)

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Environment Variables on Vercel:**
   Add all the environment variables from both `.env` files in Vercel dashboard.

### Build Commands

**Frontend Build:**
```bash
cd client && npm install && npm run build
```

**Backend:**
```bash
cd backend && npm install
```

## 📖 Usage

### Chat with AI
1. Sign in with Clerk authentication
2. Start a new chat
3. Ask coding questions, DSA problems, or interview questions
4. Get responses in C++, Java, and Python

### Upload Images
1. Click the attachment icon
2. Upload an image
3. AI will analyze and explain the image

### Generate Images
1. Type: "generate image of [description]"
2. AI will create an image using DALL-E 3

### Learning Modes
- **Beginner**: Simple explanations with examples
- **Intermediate**: Step-by-step logic and dry runs
- **Interview**: Optimized solutions with complexity analysis

## 🎨 Features in Detail

### AI Capabilities
- Code generation in multiple languages
- Code analysis and optimization
- Time/Space complexity detection
- Interview preparation
- Quiz generation
- Notes generation
- Learning roadmaps
- Debugging assistance

### UI/UX Features
- Glassmorphism design
- Gradient accents (Cyan & Purple)
- Smooth animations
- Custom scrollbars
- Collapsible sidebar
- Dark theme
- Responsive layout

## 📁 Project Structure

```
Asska-Ai/
├── backend/
│   ├── models/
│   │   ├── chat.js
│   │   └── userChats.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── main.jsx
│   ├── public/
│   └── package.json
├── vercel.json
├── .gitignore
└── README.md
```

## 🔒 Security

- Environment variables for sensitive data
- Clerk authentication
- CORS configuration
- Input validation
- Secure API endpoints

## 📊 Performance

- Vite for fast builds
- Code splitting
- Image optimization
- Lazy loading
- React Query caching
- MongoDB indexing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Suyash Agrawal**
- GitHub: [@suyash23ag](https://github.com/suyash23ag)

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini and DALL-E 3
- Clerk for authentication
- ImageKit for image storage
- MongoDB Atlas for database hosting

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ by Suyash Agrawal**
