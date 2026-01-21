// server.js
require("dotenv").config();
const app = require("./app"); // Import your Express app with CORS already configured
const connectDB = require("./config/db");

console.log("🔧 Starting server initialization...");

// Connect to DB FIRST, then start server
async function startServer() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await connectDB();
    
    console.log("✅ MongoDB connected successfully");
    
    // Now load routes AFTER DB is connected
    console.log("📂 Loading routes...");
    // Add this in server.js after CORS middleware but before other routes
app.get("/cors-test", (req, res) => {
  res.json({
    message: "CORS test endpoint",
    origin: req.headers.origin,
    corsEnabled: true,
    timestamp: new Date().toISOString()
  });
});
    
    // Auth routes
    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);
    console.log("✅ Auth routes loaded");
    
    // Queue routes
    const queueRoutes = require("./routes/queue");
    app.use("/api/queues", queueRoutes);
    console.log("✅ Queue routes loaded");
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Test: http://localhost:${PORT}/test`);
      console.log(`🌐 Home: http://localhost:${PORT}/`);
      console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
      console.log(`🌐 Network: http://10.51.4.119:${PORT}`);
      console.log(`🌐 Expo Web: http://localhost:19006`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();