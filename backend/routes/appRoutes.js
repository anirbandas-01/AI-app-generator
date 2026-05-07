import express from "express";

import { createApp, getApp } from "../controller/appController.js";

const router = express.Router();

router.post("/", createApp);
router.get("/:id", getApp);

export default router;