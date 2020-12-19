import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee!
  }

  type Mutation {
    createAdmin(username: String!, password: String!): createNoti
    editEmployeeByID(editEmployeeByID: editEmployeeInput!, id: ID!): Employee!
    createNewEmployee(newEmployee: newEmployeeInput!): Employee!
    deleteEmployee(id: ID!): employeeNoti!
  }
  input editEmployeeInput {
    username: String!
    name: String!
    phone: String
    email: String!
    position: String!
    address: String
  }

  type createNoti {
    id: ID!
    username: String!
    position: String!
  }

  type Admin {
    id: ID!
    username: String!
    position: String!
    createdAt: String
    updateAt: String
  }
`;
