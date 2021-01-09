import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getAllHolidays: [Holiday]!
  }

  extend type Mutation {
    addHoliday(newHoliday: inputHoliday!): Holiday!
    editHoliday(idHoliday: ID!, newHoliday: inputHoliday!): Holiday!
    deleteHoliday(idHoliday: ID!): Boolean!
  }

  input inputHoliday {
    title: String!
    date: String!
  }

  type Holiday {
    id: ID!
    title: String!
    date: String!
    createdAt: String
    updateAt: String
  }
`;
