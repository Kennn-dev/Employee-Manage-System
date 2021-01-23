import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getAllSalaries: [Salary!]!
  }

  extend type Mutation {
    addNewSalary(newSalary: inputSalary!): Boolean!
    deleteSalary(id: ID!): Boolean!
    applySalary(idSalary: ID!, idEmployee: ID!): Employee!
  }

  type Salary {
    id: ID!
    name: String!
    amount: Int!
  }

  input inputSalary {
    name: String!
    amount: Int!
  }
`;
