import express from "express";

import { saveData, getData } from "../controller/dataController.js";

const router = express.Router();

router.post("/:appId", saveData);
router.get("/:appId", getData);

export default router;