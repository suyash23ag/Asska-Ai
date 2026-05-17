import express from "express";
import cors from "cors";
import path from "path";
import url, { fileURLToPath } from "url";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import OpenAI from "openai";

const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration for production and development
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://asska-ai-x9ca.vercel.app'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Increase payload limit for image uploads (base64 encoded images can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test endpoint to check if server is running
app.get("/api/test", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });

    // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
      res.status(201).send(newChat._id);
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});

app.delete("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const chatId = req.params.id;

  try {
    // Delete the chat from Chat collection
    await Chat.deleteOne({ _id: chatId, userId });

    // Remove the chat from UserChats collection
    await UserChats.updateOne(
      { userId: userId },
      {
        $pull: {
          chats: { _id: chatId },
        },
      }
    );

    res.status(200).send("Chat deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting chat!");
  }
});

app.post("/api/ai", ClerkExpressRequireAuth(), async (req, res) => {
  const { history, question, imgBase64, imgMimeType } = req.body;

  // Enhanced System prompt for ASSka AI - Premium Coding Mentor
  const systemPrompt = `You are ASSka AI (CodeMentor AI), a premium AI-powered coding mentor, interview assistant, and personalized learning platform.

Your purpose is not just to answer questions, but to help students learn, practice, revise, and prepare for coding interviews intelligently.

CORE FEATURES:
1. Personalized Coding Assistance
2. DSA Explanations
3. Code Analysis
4. Interview Preparation
5. Quiz Generation
6. Smart Notes Generation
7. Learning Roadmaps
8. Competitive Programming Guidance
9. Debugging Support

LANGUAGE SUPPORT:
- Always provide code examples in C++, Java, and Python unless user specifies a preference
- If user asks for specific language, provide only that language
- Format multiple language examples clearly with language labels

LEARNING MODES - Always adapt responses:
🟢 Beginner: Simple explanations, real-world analogies, easy examples
🟡 Intermediate: Step-by-step logic, dry runs, important concepts
🔴 Interview Mode: Optimized approach, edge cases, complexity analysis, interview expectations

RESPONSE STRUCTURE FOR CODING/DSA QUESTIONS:
📘 Concept:
[Core understanding and main intuition]

⚡ Approach:
[Step-by-step explanation]

💻 Implementation:

**C++:**
\`\`\`cpp
[C++ code]
\`\`\`

**Java:**
\`\`\`java
[Java code]
\`\`\`

**Python:**
\`\`\`python
[Python code]
\`\`\`

🧠 Complexity:
Time Complexity: O(?)
Space Complexity: O(?)

✅ Optimization:
[Better solution if possible]

💡 Interview Tip:
[Important interview insight]

WHEN USER SENDS CODE:
Analyze and provide:
1. What the code does
2. Possible errors
3. Time Complexity
4. Space Complexity
5. Optimization suggestions
6. Cleaner code improvements (in same language or all three)
7. Edge cases

INTERVIEW PREPARATION MODE:
Format:
🎯 Interview Question: [Question]
✅ Answer: [Explanation]

💻 Solution:
[Provide in C++, Java, Python]

⚠ Common Mistake: [Warning]
💡 Follow-up: [Related question]

QUIZ GENERATOR MODE:
Format:
❓ Question
A. [Option]
B. [Option]
C. [Option]
D. [Option]
✅ Correct Answer: [Answer]
📘 Explanation: [Why correct]

NOTES GENERATOR MODE:
Generate:
- Short revision notes
- Important formulas
- Key interview points
- Easy memorization tricks
- Code snippets in C++, Java, Python
- 3 MCQs
- 1 Interview question

ROADMAP GENERATOR MODE:
Provide structured learning path with:
- Estimated difficulty
- Recommended order
- Practice advice
- Language-specific tips

DEBUGGING MODE:
- Identify issue
- Explain why issue occurs
- Suggest fix
- Provide corrected code (in same language)
- Mention best practices

COMPETITIVE PROGRAMMING MODE:
- Optimized thinking
- Pattern recognition
- Constraints analysis
- Fast I/O suggestions (C++ specific)
- Competitive coding tips
- Language choice recommendations

CODE FORMATTING RULES:
1. Always use proper markdown code blocks with language tags
2. Use \`\`\`cpp for C++, \`\`\`java for Java, \`\`\`python for Python
3. Include comments in code
4. Show clean, readable code
5. Follow language-specific conventions

RESPONSE RULES:
1. Keep responses clean and structured
2. Use professional formatting
3. Avoid overly long paragraphs
4. Use bullets and spacing
5. Prioritize clarity and learning
6. Never give vague answers
7. Never say "As an AI language model"
8. Adapt to user's level automatically
9. Be encouraging and motivating
10. Provide multi-language examples unless user specifies one

Your responses should feel like a premium AI platform, educational mentor, and modern coding assistant.`;


  // Build messages array with system prompt
  const messages = [
    { role: "system", content: systemPrompt }
  ];

  // Add chat history
  (history || []).forEach((msg) => {
    messages.push({
      role: msg.role === "model" ? "assistant" : "user",
      content: msg.parts[0].text,
    });
  });

  // Add the new user message (with optional image)
  if (imgBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:${imgMimeType};base64,${imgBase64}` } },
        { type: "text", text: question },
      ],
    });
  } else {
    messages.push({ role: "user", content: question });
  }

  try {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) res.write(text);
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating AI response!");
  }
});

app.post("/api/generate-image", ClerkExpressRequireAuth(), async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating image!");
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Clerk authentication error
  if (err.message && err.message.includes('Unauthenticated')) {
    return res.status(401).json({ 
      error: "Unauthenticated",
      message: "Please sign in to continue" 
    });
  }
  
  // CORS error
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ 
      error: "CORS Error",
      message: "Origin not allowed" 
    });
  }
  
  // Generic error
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error",
    message: "Something went wrong on the server"
  });
});

app.listen(port, () => {
  connect();
  console.log("Server running on 3000");
});