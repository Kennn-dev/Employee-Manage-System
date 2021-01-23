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

//HOLIDAY
export const ADD_HOLIDAY = gql`
  mutation addHoliday($title: String!, $date: String!) {
    addHoliday(newHoliday: { title: $title, date: $date }) {
      id
      title
      date
    }
  }
`;

export const DELETE_HOLIDAY = gql`
  mutation deleteHoliday($id: ID!) {
    deleteHoliday(idHoliday: $id)
  }
`;

//LEAVE
export const SIGN_UP_LEAVE = gql`
  mutation signUpLeave(
    $type: String!
    $dateStart: String!
    $dateEnd: String!
    $reason: String!
  ) {
    signUpLeave(
      newLeave: {
        type: $type
        dateStart: $dateStart
        dateEnd: $dateEnd
        reason: $reason
      }
    ) {
      id
      type
      employee {
        id
        name
        remain
      }
      dateStart
      dateEnd
      reason
      status
    }
  }
`;

export const DELETE_LEAVE = gql`
  mutation deleteLeave($id: ID!) {
    deleteHoliday(idLeave: $id)
  }
`;

export const APPROVE_LEAVE = gql`
  mutation approvedLeave($idLeave: ID!, $newStatus: String!) {
    approvedLeave(idLeave: $idLeave, newStatus: $newStatus) {
      id
      type
      employee {
        id
        name
        remain
      }
      dateStart
      dateEnd
      reason
      status
    }
  }
`;

export const ADD_SHIFT = gql`
  mutation addShift($name: String!, $timeStart: String!, $timeEnd: String!) {
    addShift(
      newShift: { name: $name, timeStart: $timeStart, timeEnd: $timeEnd }
    ) {
      id
      name
      timeStart
      timeEnd
    }
  }
`;

export const ADD_WORK_DAY = gql`
  mutation addWorkDay(
    $idEmployee: ID!
    $date: String!
    $timeStart: String!
    $timeEnd: String!
  ) {
    addWorkDay(
      idEmployee: $idEmployee
      workDay: { date: $date, timeStart: $timeStart, timeEnd: $timeEnd }
    ) {
      id
      name
      position
    }
  }
`;
