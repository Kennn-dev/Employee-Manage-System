import { gql } from "apollo-server-express";
//remmeber import to root file :D
export default gql`
  extend type Query {
    getAllPayrolls: [Payroll!]!
    getPayrollById (idPayroll : ID!): Payroll!
  }

  extend type Mutation {
    createPayroll(newPayroll: inputPayroll!): Payroll!
    # updatePayroll(idLeave: ID!, newStatus: String!): Leave!
    deletePayroll(id: ID!): Boolean!
  }

  input inputPayroll {
    name: String!
  }

  type Payroll {
    id: ID!
    name: String!
    employees: [Employee]! #empty array or fill array can be accepted
    realWages: Int
    createdAt: String
    updateAt: String
  }
`;
