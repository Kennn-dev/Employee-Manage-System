import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee!
  }

  type Mutation {
    createAdmin(username: String!, password: String!): createNoti
    editEmployeeByID(editEmployeeByID: newEmployeeInput!, id: ID!): Employee!
    createNewEmployee(newEmployee: newEmployeeInput!): Employee!
    deleteEmployee(id: ID!): employeeNoti!
    loginAdmin(username: String!, password: String!): loginResponse!
  }

  type createNoti {
    id: ID!
    username: String!
    position: String!
  }

  type loginResponse {
    id: ID!
    username: String!
    position: String!
    token: String!
  }

  type Admin {
    id: ID!
    username: String!
    position: String!
    createdAt: String
    updateAt: String
  }
`;
