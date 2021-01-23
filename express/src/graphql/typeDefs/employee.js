import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getProfileEmpById(id: ID!): Employee!
    getEmployeeByDate(date: String!): [Employee]!
  }

  extend type Mutation {
    loginUser(username: String!, password: String!): loginResponse!
    changePasswordEmp(changePassword: changePasswordInput!): notiRespone!
    resetTokens: Boolean!
    updateSalary(idEmployee: ID!, idSalary: ID!): Boolean!
    addWorkDay(idEmployee: ID!, workDay: workDayInput!): Employee!
    # editEmployeeByID(editEmployeeByID: newEmployeeInput!, id: ID!): Employee!
  }

  type loginResponse {
    id: ID!
    username: String!
    position: String!
    token: String!
  }

  input workDayInput {
    date: String!
    timeStart: String!
    timeEnd: String!
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

  input newEmployeeInput {
    username: String!
    password: String!
    name: String!
    phone: String
    email: String!
    position: String!
    address: String
  }
  type WorkDay {
    id: ID!
    date: String!
    timeStart: String!
    timeEnd: String!
    totalTime: String!
  }
  type Employee {
    id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    phone: String
    position: String!
    address: String
    remain: Int
    workDays: [WorkDay]!
    salary: Salary
    createdAt: String
    updateAt: String
  }
`;
