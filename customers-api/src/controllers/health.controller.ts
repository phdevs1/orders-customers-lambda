import { Request, Response } from "express";

export class HealthController {
  healthFunction = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ status: "ok", db: "connected" });
    } catch (err) {
      console.error("Failed to list in-progress customers:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
