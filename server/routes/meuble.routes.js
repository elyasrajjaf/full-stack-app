import express from "express";
import { getMeubles, getMeuble, createMeuble, deleteMeuble, updateMeuble } from "../controllers/meubleController.js";

const router = express.Router();

router.get("/meubles", getMeubles);
router.get("/meubles/:id", getMeuble);
router.post("/meubles", createMeuble);
router.delete("/meubles/:id", deleteMeuble);
router.patch("/meubles/:id", updateMeuble);

export default router;
