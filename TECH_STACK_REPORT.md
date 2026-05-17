# ASSka AI - Technical Stack Report

## Project Overview
**Project Name:** ASSka AI (AI Coding Mentor)  
**Type:** Full-Stack AI-Powered Educational Platform  
**Architecture:** MERN Stack with AI Integration  
**Deployment:** Client-Server Architecture

---

## 🎯 Core Technologies

### **Frontend Stack**

#### **Framework & Build Tools**
- **React 19.0.0-rc** - Modern UI library with latest features
- **Vite 5.3.4** - Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ES modules support

#### **Routing & State Management**
- **React Router DOM 6.25.0** - Client-side routing
- **TanStack React Query 5.51.9** - Server state management
  - Data fetching and caching
  - Automatic background refetching
  - Optimistic updates

#### **UI/UX Libraries**
- **React Markdown 9.0.1** - Markdown rendering for AI responses
- **React Syntax Highlighter 16.1.1** - Code syntax highlighting
  - Supports 100+ programming languages
  - VS Code Dark+ theme integration
  - Line numbers and copy functionality
- **React Type Animation 3.2.0** - Typing animation effects

#### **Styling Approach**
- **Custom CSS** with modern features:
  - CSS Variables for theming
  - Flexbox & Grid layouts
  - Glassmorphism effects
  - Gradient backgrounds
  - Custom animations and transitions
  - Responsive design

---

### **Backend Stack**

#### **Runtime & Framework**
- **Node.js** - JavaScript runtime environment
- **Express.js 4.19.2** - Web application framework
  - RESTful API architecture
  - Middleware support
  - Route handling

#### **Database**
- **MongoDB** - NoSQL document database
- **Mongoose 8.5.1** - MongoDB object modeling
  - Schema validation
  - Query building
  - Middleware hooks

#### **Development Tools**
- **Nodemon 3.1.4** - Auto-restart development server
- **CORS 2.8.5** - Cross-Origin Resource Sharing

---

## 🤖 AI & Machine Learning Integration

### **AI Services**

#### **OpenAI Integration**
- **OpenAI SDK 4.104.0**
  - **GPT-4o-mini** - Primary conversational AI model
    - Natural language understanding
    - Code generation and analysis
    - Multi-language support (C++, Java, Python)
    - Streaming responses
  - **DALL-E 3** - Image generation
    - 1024x1024px high-quality images
    - Text-to-image generation

#### **Google AI**
- **Google Generative AI 0.15.0**
  - Gemini model integration
  - Alternative AI capabilities

---

## 🔐 Authentication & Security

### **Authentication Provider**
- **Clerk**
  - **@clerk/clerk-react 5.61.3** (Frontend)
  - **@clerk/clerk-sdk-node 5.0.16** (Backend)
  - Features:
    - User authentication and authorization
    - Session management
    - Protected routes
    - User profile management

### **Security Features**
- JWT-based authentication
- Secure HTTP-only cookies
- CORS configuration
- Environment variable protection
- Request payload limits (50MB for image uploads)

---

## 📦 Media & File Management

### **Image Handling**
- **ImageKit**
  - **imagekit 5.0.1** (Backend SDK)
  - **imagekitio-react 4.1.0** (Frontend SDK)
  - Features:
    - Cloud-based image storage
    - Image optimization
    - CDN delivery
    - Real-time transformations

### **Image Processing**
- Client-side image compression
  - Canvas API for resizing
  - Quality optimization (50%)
  - Max dimensions: 600x600px
  - File size validation (5MB limit)

---

## 🎨 Design System

### **Color Palette**
```css
Primary Background: #0a0a1a, #1a1a2e, #16213e (Dark gradients)
Accent Colors: 
  - Cyan: #00d4ff
  - Purple: #7b2ff7
Text Colors:
  - Primary: #ffffff
  - Secondary: rgba(255, 255, 255, 0.8)
  - Muted: rgba(255, 255, 255, 0.4)
```

### **Design Principles**
- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Gradient Accents** - Cyan to purple gradients
- **Smooth Animations** - 0.3s ease transitions
- **Custom Scrollbars** - Gradient-styled scrollbars
- **Responsive Layout** - Mobile-first approach
- **Dark Theme** - Futuristic dark UI

---

## 📡 API Architecture

### **RESTful Endpoints**

#### **Chat Management**
- `POST /api/chats` - Create new chat
- `GET /api/userchats` - Fetch user's chat history
- `GET /api/chats/:id` - Get specific chat
- `PUT /api/chats/:id` - Update chat with new messages
- `DELETE /api/chats/:id` - Delete chat

#### **AI Services**
- `POST /api/ai` - AI conversation endpoint (streaming)
- `POST /api/generate-image` - DALL-E 3 image generation

#### **Media Upload**
- `GET /api/upload` - ImageKit authentication

### **Data Flow**
1. Client sends request with authentication
2. Clerk middleware validates user
3. Backend processes request
4. MongoDB stores/retrieves data
5. AI services generate responses
6. Streaming response to client

---

## 🗄️ Database Schema

### **Collections**

#### **Chat Collection**
```javascript
{
  userId: String,
  history: [{
    role: String, // "user" or "model"
    parts: [{ text: String }],
    img: String (optional)
  }],
  createdAt: Date
}
```

#### **UserChats Collection**
```javascript
{
  userId: String,
  chats: [{
    _id: ObjectId,
    title: String,
    createdAt: Date
  }]
}
```

---

## 🚀 Development Tools

### **Code Quality**
- **ESLint 8.57.0** - JavaScript linting
  - React plugin
  - React Hooks plugin
  - React Refresh plugin

### **Type Safety**
- **@types/react 18.3.3** - React TypeScript definitions
- **@types/react-dom 18.3.0** - React DOM TypeScript definitions

---

## 🌐 Deployment Configuration

### **Environment Variables**

#### **Frontend (.env)**
```
VITE_API_URL - Backend API URL
VITE_CLERK_PUBLISHABLE_KEY - Clerk public key
VITE_IMAGE_KIT_ENDPOINT - ImageKit endpoint
VITE_IMAGE_KIT_PUBLIC_KEY - ImageKit public key
```

#### **Backend (.env)**
```
CLIENT_URL - Frontend URL
MONGO_URL - MongoDB connection string
CLERK_PUBLISHABLE_KEY - Clerk public key
CLERK_SECRET_KEY - Clerk secret key
OPENAI_API_KEY - OpenAI API key
IMAGE_KIT_ENDPOINT - ImageKit endpoint
IMAGE_KIT_PUBLIC_KEY - ImageKit public key
IMAGE_KIT_PRIVATE_KEY - ImageKit private key
```

### **Build Commands**
```bash
# Frontend
npm run dev      # Development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build

# Backend
npm start        # Start with nodemon
```

---

## 🎯 Key Features Implementation

### **1. AI Coding Mentor**
- Multi-language code generation (C++, Java, Python)
- Code analysis with complexity detection
- Interview preparation mode
- Quiz generation
- Notes generation
- Learning roadmaps
- Debugging assistance

### **2. Image Processing**
- Upload and analyze images
- AI vision capabilities (GPT-4o-mini)
- Image compression and optimization
- Progress indicators

### **3. Image Generation**
- DALL-E 3 integration
- Text-to-image generation
- 1024x1024px output

### **4. Real-time Chat**
- Streaming AI responses
- Message history persistence
- Chat management (create, read, delete)
- Avatar icons for user/AI messages

### **5. Syntax Highlighting**
- 100+ language support
- VS Code Dark+ theme
- Line numbers
- Copy to clipboard functionality
- Language badges

### **6. Modern UI/UX**
- Glassmorphism design
- Smooth animations
- Gradient effects
- Custom scrollbars
- Responsive layout
- Dark futuristic theme

---

## 📊 Performance Optimizations

### **Frontend**
- React Query caching
- Lazy loading components
- Image compression before upload
- Optimized bundle size with Vite
- Code splitting

### **Backend**
- MongoDB indexing
- Streaming responses for AI
- Payload size limits
- Connection pooling
- Error handling middleware

### **Media**
- ImageKit CDN delivery
- Client-side image compression
- Lazy loading images
- Optimized image formats

---

## 🔧 System Requirements

### **Development Environment**
- Node.js 18+ 
- npm or yarn
- MongoDB 6+
- Modern web browser (Chrome, Firefox, Edge)

### **Production Environment**
- Node.js runtime
- MongoDB Atlas or self-hosted MongoDB
- SSL certificate for HTTPS
- CDN for static assets

---

## 📈 Scalability Considerations

### **Current Architecture**
- Stateless backend (horizontal scaling ready)
- MongoDB for flexible data storage
- Cloud-based image storage (ImageKit)
- API-based AI services (OpenAI)

### **Future Enhancements**
- Redis for session caching
- Load balancing
- Microservices architecture
- WebSocket for real-time features
- CDN for frontend assets

---

## 🛠️ Third-Party Services

| Service | Purpose | Pricing Model |
|---------|---------|---------------|
| **Clerk** | Authentication | Free tier + paid plans |
| **OpenAI** | AI Models (GPT-4o-mini, DALL-E 3) | Pay-per-use |
| **ImageKit** | Image storage & CDN | Free tier + paid plans |
| **MongoDB Atlas** | Database hosting | Free tier + paid plans |

---

## 📝 Code Statistics

### **Project Structure**
```
Total Files: 50+
Frontend Components: 15+
Backend Routes: 8
Database Models: 2
CSS Files: 10+
```

### **Lines of Code (Approximate)**
- Frontend: ~3,000 lines
- Backend: ~500 lines
- Styling: ~2,000 lines
- Total: ~5,500 lines

---

## 🎓 Learning Outcomes

### **Technologies Mastered**
1. Full-stack MERN development
2. AI/ML integration (OpenAI APIs)
3. Modern React patterns (Hooks, Context)
4. RESTful API design
5. Authentication & authorization
6. Cloud services integration
7. Modern CSS techniques
8. Real-time data streaming
9. Image processing
10. Database design

---

## 📚 Documentation & Resources

### **Official Documentation Used**
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [ImageKit Documentation](https://docs.imagekit.io)

---

## 🏆 Project Highlights

### **Technical Achievements**
✅ Full-stack AI application from scratch  
✅ Real-time streaming AI responses  
✅ Multi-modal AI (text + vision + image generation)  
✅ Modern glassmorphism UI design  
✅ Secure authentication system  
✅ Cloud-based media management  
✅ Responsive and accessible design  
✅ Code syntax highlighting for 100+ languages  
✅ Multi-language code generation (C++, Java, Python)  
✅ CRUD operations with MongoDB  

### **User Experience Features**
✅ Smooth animations and transitions  
✅ Real-time typing indicators  
✅ Progress indicators for uploads  
✅ Confirmation dialogs for destructive actions  
✅ Error handling and user feedback  
✅ Mobile-responsive design  
✅ Dark theme for reduced eye strain  

---

## 🔮 Future Roadmap

### **Planned Features**
- [ ] Voice input/output
- [ ] Code execution sandbox
- [ ] Collaborative coding sessions
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Multi-language UI support
- [ ] Advanced code refactoring tools
- [ ] Integration with GitHub
- [ ] Custom AI model fine-tuning

---

## 📞 Support & Maintenance

### **Version Control**
- Git for source control
- GitHub for repository hosting
- Semantic versioning

### **Monitoring**
- Error logging
- Performance monitoring
- User analytics (planned)

---

**Report Generated:** May 17, 2026  
**Project Version:** 1.0.0  
**Status:** Production Ready ✅
