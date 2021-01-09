import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getAllLeaves: [Leave]!
  }

  extend type Mutation {
    signUpLeave(newLeave: inputLeave!): Leave!
    approvedLeave(idLeave: ID!, newStatus: String!): Leave!
    deleteLeave(idLeave: ID!): Boolean!
  }

  input inputLeave {
    type: String!
    dateStart: String!
    dateEnd: String!
    reason: String!
  }

  type Leave {
    id: ID!
    type: String!
    employee: Employee! #empty array or fill array can be accepted
    dateStart: String!
    dateEnd: String!
    reason: String!
    status: String!
    createdAt: String
    updateAt: String
  }
`;
