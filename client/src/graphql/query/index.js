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
      workDays {
        timeStart
        timeEnd
        date
      }
      salary {
        name
        amount
      }
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

export const GET_ALL_SHIFTS = gql`
  query {
    getAllShifts {
      id
      name
      timeStart
      timeEnd
    }
  }
`;

export const GET_ALL_PAYROLLS = gql`
  query {
    getAllPayrolls {
      id
      name
    }
  }
`;

export const GET_PAYROLLS_BY_ID = gql`
  query getPayrollById($idPayroll: ID!) {
    getPayrollById(idPayroll: $idPayroll) {
      id
      name
      employees {
        name
        username
        email
        position
        workDays {
          date
          timeEnd
          timeStart
          totalTime
        }
        salary {
          name
          amount
        }
      }
    }
  }
`;

export const GET_EMPLOYEES_BY_DATE = gql`
  query getEmployeeByDate($date: String!) {
    getEmployeeByDate(date: $date) {
      id
      name
      position
      workDays {
        timeStart
        timeEnd
        date
      }
    }
  }
`;
