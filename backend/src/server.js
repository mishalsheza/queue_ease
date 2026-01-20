require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

console.log("🔧 Starting server initialization...");

const app = express();
app.use(express.json());

// Connect to DB FIRST, then start server
async function startServer() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await connectDB();
    
    console.log("✅ MongoDB connected successfully");
    
    // Now load routes AFTER DB is connected
    console.log("📂 Loading routes...");
    
    // Auth routes
    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);
    console.log("✅ Auth routes loaded");
    
    // Queue routes
    const queueRoutes = require("./routes/queue");
    app.use("/api/queues", queueRoutes);
    console.log("✅ Queue routes loaded");
    
    // Test routes
    app.get("/test", (req, res) => {
      res.json({ message: "Server test route works", time: new Date() });
    });
    
    app.get("/", (req, res) => {
      res.send("QueueEase API running");
    });
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Test: http://localhost:${PORT}/test`);
      console.log(`🌐 Home: http://localhost:${PORT}/`);
      console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();