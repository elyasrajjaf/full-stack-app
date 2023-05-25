import express from "express";
import { getMeubles, getMeuble, createMeuble } from "../controllers/meubleController.js";

const router = express.Router();

router.get("/meubles", getMeubles);
router.get("/meubles/:id", getMeuble);
router.post("/meubles", createMeuble);

export default router;
