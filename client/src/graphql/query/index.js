import { gql } from "@apollo/client";
export const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      name
      username
      email
      phone
      position
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query getEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      name
      username
      email
      phone
      position
      address
    }
  }
`;
