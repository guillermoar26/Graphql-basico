export const typeDefs = `#graphql
  type Pet {
    id: ID
    name: String!
    breed: String! 
  }
  type Query {
    pets: [Pet!]!
    pet(id: ID!): Pet!
    petsByBreed(breed: String!): [Pet!]!
  }
  type Mutation {
    addPet(name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String, breed: String): Pet!
  }
`;

