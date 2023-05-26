import Meuble from "../models/Meuble.js";
import mongoose from "mongoose";

export const getMeubles = async (req, res) => {
  try {
    const meubles = await Meuble.find();
    res.status(200).json(meubles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMeuble = async (req, res) => {
  const { id } = req.params;
  try {
    const meuble = await Meuble.findById(id);
    res.status(200).json(meuble);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMeuble = async (req, res) => {
  const meuble = req.body;

  const newMeuble = new Meuble(meuble);
  try {
    await newMeuble.save();
    res.status(201).json(newMeuble);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMeuble = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Meuble non trouvé: ${id}`);
  const meuble = req.body;
  try {
    await Meuble.findByIdAndUpdate(id, meuble, { new: true });
    res.json(meuble);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMeuble = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Meuble non trouvé: ${id}`);

  try {
    await Meuble.findByIdAndRemove(id);
    res.json({ message: "Meuble supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
