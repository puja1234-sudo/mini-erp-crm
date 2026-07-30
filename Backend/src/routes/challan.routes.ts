import { Router } from "express";

import {
  createChallan,
  getChallans,
  confirmChallan,
} from "../controllers/challan.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createChallan);
router.get("/", authenticate, getChallans);
router.patch("/:id/confirm", authenticate, confirmChallan);

export default router;