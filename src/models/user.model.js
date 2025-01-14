// Estamos creando el documento userModel
// 1. Importamos dependencias
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: { type: String, required: false },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  phone: { type: String, required: true },
  isAdult: { type: String, required: true },
  address: { type: String, required: true },
  preferences: {
    type: { type: String, required: false }, // Por ejemplo, "perro"
    size: { type: String, required: false }, // Por ejemplo, "grande"
    age: { type: String, required: false }, // Por ejemplo, "adulto"
  },
});

//3. definir nuestro modelo

export const userModel = mongoose.model("user", userSchema);
