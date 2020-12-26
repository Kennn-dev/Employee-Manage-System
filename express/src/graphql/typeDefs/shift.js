import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getAllShifts: [Shift]!
    getShiftById(id: ID!): Shift!
  }

  extend type Mutation {
    addShift(newShift: newShiftInput!): Shift!
    deleteShift(id: ID!): Boolean!
    signUpShift(idShift: ID!, idEmployee: ID!): Shift!
  }

  type Shift {
    id: ID!
    name: String!
    employees: [Employee]! #empty array or fill array can be accepted
    timeStart: String!
    timeEnd: String!
    createdAt: String
    updateAt: String
  }

  type status {
    success: Boolean!
  }

  input newShiftInput {
    name: String!
    timeStart: String!
    timeEnd: String!
  }
`;
