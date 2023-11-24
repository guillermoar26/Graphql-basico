import mongoose from "mongoose"

const Schema = mongoose.Schema;

export type Pet = {
    id: string,
    name: string,
    breed: string,
}
const petSchema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
    },
    { timestamps: true }
);

export type PetModelType = mongoose.Document & Omit<Pet, "id">;
export const PetModel = mongoose.model<PetModelType>("Pets", petSchema);

