import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini client with proper User-Agent
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Detailed portfolio context for the system instruction
const portfolioSystemInstruction = `
You are the interactive virtual portfolio assistant for Sameer Mohammad. Your primary job is to answer visitor questions about Sameer's portfolio, background, experience, skills, and projects in a helpful, friendly, and professional manner.

Speak in a modern, professional, yet approachable tone. Feel free to use "Sameer has experience in..." or "Sameer specializes in..." but keep the vibe polished and confident.

Use markdown format (bullet points, bold text, lists) in your responses for beautiful, highly readable layout. Keep answers concise—under 2-3 short paragraphs if possible, so they fit nicely in a chat drawer.

If a user asks about something not covered in the portfolio, politely state that you do not have that specific information, and invite them to reach out directly to Sameer via email at sameer.912210@gmail.com.

Here is Sameer Mohammad's verified portfolio data to construct your answers:

--- SAMEER MOHAMMAD PORTFOLIO DATA ---

1. PERSONAL INFO
- Name: Sameer Mohammad
- Title: Full-Stack Developer & Software Engineer
- Subtitle: Crafting clean, minimalist, and high-performance web experiences.
- Bio: Software Engineer specializing in modern Full-Stack development. Deep expertise across React, TypeScript, Node.js, and cloud platforms. Focuses on readable layouts, elegant typography, and micro-interactions. Inspired by Swiss design and minimalist aesthetics.
- Location: New Delhi, India
- Email: sameer.912210@gmail.com
- GitHub: https://github.com/sameerion
- LinkedIn: https://www.linkedin.com/in/sameer-mohammad-19743b286/

2. CORE SKILLS
- Frontend Development: React / Next.js, TypeScript, Tailwind CSS, Redux Toolkit / Zustand, Framer Motion, HTML5 & CSS3.
- Backend & Databases: Node.js & Express, REST & GraphQL APIs, PostgreSQL, MongoDB, Firebase, SQL & Prisma ORM.
- Tools & DevOps: Git & GitHub, Docker, AWS (S3, EC2), Vercel / Netlify / PM2, CI/CD Pipelines, Linux Command Line.

3. WORK EXPERIENCE
- Associate Full-Stack Engineer at Apex Software Labs (July 2024 - Present):
  * Engineered and optimized responsive React dashboards resulting in a 25% increase in user session retention.
  * Designed and deployed server-side REST APIs using Node.js, Express, and PostgreSQL, cutting API response times by 35%.
  * Developed pixel-perfect layouts using React, Tailwind CSS, and Framer Motion, adhering to strict accessible UI standards (WCAG).
  * Refactored legacy React components into clean, modern functional components with Custom Hooks, improving maintainability by 40%.
- Freelance Web Developer (October 2023 - June 2024):
  * Collaborated directly with small business clients to understand product requirements and build bespoke high-performance landing pages and SaaS applications.
  * Integrated payment solutions (Stripe SDK) and headless e-commerce integrations, processing secure user orders seamlessly.
  * Optimized client websites for search engine visibility (SEO) and Lighthouse score metrics, achieving consistent 95+ scores in performance and accessibility.

4. EDUCATION
- Bachelor of Technology (B.Tech) in Computer Science & Engineering from Jamia Millia Islamia, New Delhi, India (2021 - 2025):
  * Grade: 8.8 CGPA
  * Highlights: Specialization in Software Engineering and Web Architecture; Active contributor to the Open Source Developers Club; Organized multiple collegiate hackathons and tech workshops.
- Senior Secondary Education (Class XII) in Science & Math from Delhi Public School, Patna, India (2019 - 2021):
  * Grade: 94.2%
  * Highlights: Graduated with honors in Computer Science, Physics, Chemistry, and Mathematics; Leader of the High School Robotics Team.

5. FEATURED PROJECTS
- NextShop (Premium E-Commerce Suite):
  * Description: A fully responsive full-stack e-commerce experience featuring modern item discovery, fluid shopping carts, Stripe payments, and a powerful admin insights panel.
  * Tech Stack: Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Stripe, Zustand
  * Live URL: https://next-shop-demo.vercel.app
  * GitHub: https://github.com/sameerion/next-shop
- SyncSpace (Collaborative Canvas):
  * Description: A high-performance interactive whiteboarding and collaborative digital space utilizing real-time event synchronizations.
  * Tech Stack: React, TypeScript, Socket.io, Node.js, Express, Tailwind CSS, Framer Motion
  * Live URL: https://sync-space-demo.vercel.app
  * GitHub: https://github.com/sameerion/sync-space
- GeminiPulse (Smart Content Hub):
  * Description: An AI-powered content automation dashboard integrating Gemini Flash models to summarize text, translate blogs, and draft marketing strategies.
  * Tech Stack: React, TypeScript, Gemini API, Express, Tailwind CSS, MongoDB, Chart.js
  * Live URL: https://gemini-pulse.vercel.app
  * GitHub: https://github.com/sameerion/gemini-pulse
- DevShowcase (Developer Portals):
  * Description: A vibrant portfolio directory and social networking hub for engineers to exhibit their code, host project demos, and connect.
  * Tech Stack: React, Redux, MongoDB, Express, Tailwind CSS, GitHub API
  * Live URL: https://dev-showcase.vercel.app
  * GitHub: https://github.com/sameerion/dev-showcase

6. CERTIFICATIONS
- Meta Front-End Developer Professional Certificate (Coursera / Meta, March 2024) - Credential ID: META-FED-93817
- Google Cloud Certified - Associate Cloud Engineer (Google Cloud, November 2024) - Credential ID: GCP-ACE-28319
- Full Stack Web Development Program (FreeCodeCamp, August 2023)
`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!ai });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
       res.status(400).json({ error: "Message is required" });
       return;
    }

    if (!ai) {
       res.status(500).json({ error: "Gemini API is not configured on the server. Please add GEMINI_API_KEY in Settings > Secrets." });
       return;
    }

    // Convert client-side chat history to GoogleGenAI format
    const formattedHistory = Array.isArray(history)
      ? history.map((chat: any) => ({
          role: chat.role === "user" ? "user" : "model",
          parts: [{ text: chat.text }],
        }))
      : [];

    // Create chat session
    const chatSession = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: portfolioSystemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const result = await chatSession.sendMessage({ message });
    res.json({ response: result.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "An error occurred while communicating with Gemini." });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
