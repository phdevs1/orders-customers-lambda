import app from "./app";
import { AppDataSource } from "./db/conexion";
import http from "http";

const PORT = process.env.PORT || 3001;

const httpServer = http.createServer(app);

const startServer = () => {
  httpServer.listen(PORT, () => {
    console.log(`order-service running on port: ${PORT}`);
  });
};

const initializeApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log("order-service: Database initialized successfully.");
    startServer();
  } catch (error) {
    console.error(
      "Failed to initialize database:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
};

initializeApp();
