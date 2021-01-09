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

export const GET_ALL_LEAVES = gql`
  query {
    getAllLeaves {
      id
      type
      employee {
        id
        name
      }
      dateStart
      dateEnd
      reason
      status
    }
  }
`;

export const GET_ALL_HOLIDAYS = gql`
  query {
    getAllHolidays {
      id
      title
      date
    }
  }
`;
