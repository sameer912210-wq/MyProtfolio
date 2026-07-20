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
- Title: Software Quality Engineer | Quality Engineering Analyst | SDET
- Subtitle: Crafting clean, minimalist, and high-performance quality assurance solutions.
- Bio: Software Quality Engineer specializing in modern quality engineering. With deep expertise across Manual Testing, API Testing, Automation Testing, AI integrated Testing and various other testing methodologies, I build and execute test strategies for complex software systems. I focus on providing detailed test results, comprehensive test reports, and actionable insights to help deliver high-quality software.
- Location: Hyderabad, India
- Email: sameer.912210@gmail.com
- GitHub: https://github.com/sameer912210-wq
- LinkedIn: https://www.linkedin.com/in/sameer-mohammad-19743b286/

2. CORE SKILLS
- Test Automation: Playwright, Selenium WebDriver, Automated Testing, Page Object Model (POM), Cross-browser Testing, Visual Regression Testing.
- API Testing: REST API Testing, GraphQL Testing, Postman, Request/Response Validation, Schema Validation, Performance Testing.
- BDD & Test Frameworks: Cucumber, SpecFlow, TestNG, JUnit, Allure Report, Gherkin Syntax.
- Tools & DevOps: Git & GitHub, Jenkins, CI/CD Pipelines, Docker, AWS (S3, EC2), Linux Command Line.
- Programming Languages: TypeScript, C#, Java, Python for test automation scripting.
- Performance & Load Testing: JMeter for load testing, stress testing, and performance analysis.
- Manual Testing: Test Planning, Test Case Design, Risk-Based Testing, Exploratory Testing, Bug Reporting.

3. WORK EXPERIENCE
- Software Quality Engineer at Infosys (June 2022 - Present):
  * Performed comprehensive manual testing on various web applications and mobile applications.
  * Executed API testing on web and mobile applications, validating endpoints and response integrity.
  * Developed automated test scripts using Selenium WebDriver and Playwright for end-to-end testing.
  * Built robust test frameworks following BDD methodologies with Cucumber and SpecFlow.
  * Integrated automated tests into Jenkins CI/CD pipelines for continuous quality assurance.
  * Identified and documented critical defects, working closely with development teams for resolution.
  * Analyzed test results and generated detailed reports to stakeholders.

4. EDUCATION
- Bachelor of Technology (B.Tech) in Civil Engineering:
  * Sri Chundi Ranganayakulu Engineering College, Chilakaluripet, India (2016 - 2020)
  * Grade: 9.1 CGPA
  * Highlights: Specialized in Structural Analysis and Construction Materials; Completed projects on Sustainable Building Design.
- Senior Secondary Education (Class XII) - MPC:
  * Narayana Junior College, Chilakaluripet, India (2013 - 2016)
  * Grade: 90.6%
  * Highlights: Graduated with honors in Physics, Chemistry, and Mathematics.

5. FEATURED TEST AUTOMATION PROJECTS
- ShopFlow QA (E-Commerce Test Automation Suite):
  * Description: A Playwright + TypeScript end-to-end automation framework built on the Page Object Model, covering checkout, cart, and payment flows for an e-commerce platform.
  * Tech Stack: Playwright, TypeScript, Page Object Model, Jenkins, Allure Report, GitHub Actions, Docker
  * GitHub: https://github.com/sameer912210-wq/shopflow-qa
  * Live Demo: https://shopflow-qa-report.vercel.app
- BDD Regression Suite (Selenium & SpecFlow):
  * Description: A behavior-driven regression testing framework using Selenium WebDriver and SpecFlow, translating business requirements directly into executable Gherkin scenarios.
  * Tech Stack: Selenium WebDriver, SpecFlow, C#, NUnit, BDD, CI/CD Integration
  * GitHub: https://github.com/sameer912210-wq/bdd-regression-suite
  * Live Demo: https://bdd-regression-report.vercel.app
- PipelineWatch (CI/CD Test Reporting Dashboard):
  * Description: A centralized test observability dashboard that aggregates Jenkins pipeline results, flaky test trends, and cross-browser pass/fail rates into a single view.
  * Tech Stack: React, TypeScript, Node.js, Jenkins REST API, Real-time Data Visualization, MongoDB
  * GitHub: https://github.com/sameer912210-wq/pipelinewatch
  * Live Demo: https://pipelinewatch-demo.vercel.app
- API Sentinel (REST API Test Framework):
  * Description: A lightweight API test automation framework for validating REST endpoints, schema contracts, and response times as part of the CI pipeline.
  * Tech Stack: Playwright, TypeScript, JSON Schema, Jenkins, Postman, Performance Metrics
  * GitHub: https://github.com/sameer912210-wq/api-sentinel
  * Live Demo: https://api-sentinel-demo.vercel.app

6. CERTIFICATIONS & CREDENTIALS
- Certified Tester Foundation Level (ISTQB , March 2024)
- Certified Tester Advanced Level - Test Automation Engineer (ISTQB, November 2024)
- Certified Tester - AI Testing (ISTQB, August 2025)
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
