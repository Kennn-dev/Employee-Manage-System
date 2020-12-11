import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getProfileEmpById(id: ID!): Employee!
  }

  extend type Mutation {
    loginEmployee(username: String!, password: String!): loginResponse!
    changePasswordEmp(changePassword: changePasswordInput!): notiRespone!
    # editEmployeeByID(editEmployeeByID: newEmployeeInput!, id: ID!): Employee!
  }

  input changePasswordInput {
    oldPassword: String!
    newPassword: String!
    confirmPassword: String!
  }

  type employeeNoti {
    id: ID!
    message: String!
    success: Boolean!
  }

  type notiRespone {
    message: String!
    success: Boolean!
  }

  input editProfileEmpInput {
    username: String!
    name: String!
    phone: String!
    email: String!
    address: String
  }

  input newEmployeeInput {
    username: String!
    password: String!
    name: String!
    phone: String
    email: String!
    position: String!
    address: String
  }

  type Employee {
    id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    phone: String!
    position: String!
    address: String
    createdAt: String
    updateAt: String
  }
`;
