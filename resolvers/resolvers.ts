import { GraphQLError } from "graphql";
import { PetModel } from "../db/pet.ts";

export const resolvers = {
    Query: {
        pets: async () => {
            const pets = await PetModel.find();
            if (!pets) {
                throw new GraphQLError(`No pets found`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pets;
        },
        pet: async (_: unknown, args: { id: string }) => {
            const pet = await PetModel.findById({ _id: args.id });
            if (!pet) {
                throw new GraphQLError(`No pet found with id ${args.id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pet;
        },
        petsByBreed: async (_: unknown, args: { breed: string }) => {
            const pets = await PetModel.find({ breed: args.breed });
            if (!pets) {
                throw new GraphQLError(`No pets found with breed ${args.breed}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pets;
        },
    },
    Mutation: {
        addPet: async (_: unknown, args: { name: string; breed: string }) => {
            try {
                const pet = new PetModel({
                    name: args.name,
                    breed: args.breed,
                });

                await pet.save();
                return pet;
            } catch {
                throw new GraphQLError(`Error saving pet`, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            }
        },
        deletePet: async (
            _: unknown,
            args: { id: string }
        ) => {
            const deletedPet = await PetModel.findByIdAndDelete({ _id: args.id });
            if (!deletedPet) {
                throw new GraphQLError(`No pet found with id ${args.id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return deletedPet;
        },
        updatePet: async (
            _: unknown,
            args: { id: string; name: string; breed: string },
        ) => {
            const pet = await PetModel.findByIdAndUpdate({ _id: args.id }, {
                name: args.name || undefined,
                breed: args.breed || undefined,
            }, { new: true });

            if (!pet) {
                throw new GraphQLError(`No pet found with id ${args.id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pet;
        },
    },
};