import express from "express";

import { saveData, getData, bulkInsertData } from "../controller/dataController.js";

const router = express.Router();

router.post("/:appId", saveData);
router.get("/:appId", getData);
router.post("/bulk/:appId", bulkInsertData);

export default router;