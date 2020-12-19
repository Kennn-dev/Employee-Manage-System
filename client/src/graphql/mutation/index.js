import { gql } from "@apollo/client";
export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      position
      token
    }
  }
`;

export const CREATE_NEW_EMPLOYEE = gql`
  mutation createNewEmployee(
    # Variables here
    $username: String!
    $password: String!
    $name: String!
    $phone: String
    $email: String!
    $position: String!
    $address: String
  ) {
    # Copy in Graph Playground
    createNewEmployee(
      newEmployee: {
        username: $username
        password: $password
        name: $name
        phone: $phone
        email: $email
        position: $position
        address: $address
      }
    ) {
      id
    }
  }
`;

export const EDIT_EMPLOYEE_BY_ID = gql`
  mutation editEmployeeByID(
    # Variables here
    $username: String!
    $name: String!
    $phone: String
    $email: String!
    $position: String!
    $address: String
    $id: ID!
  ) {
    # Copy in Graph Playground
    editEmployeeByID(
      editEmployeeByID: {
        username: $username
        name: $name
        phone: $phone
        email: $email
        position: $position
        address: $address
      }
      id: $id
    ) {
      id
    }
  }
`;

export const DELETE_EMPLOYEE_BY_ID = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      success
    }
  }
`;
