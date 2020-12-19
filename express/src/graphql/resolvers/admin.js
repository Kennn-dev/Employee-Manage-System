import Employee from "../../models/Employee";
import Admin from "../../models/Admin";

import { ApolloError, AuthenticationError } from "apollo-server-express";
import { sign, verify } from "jsonwebtoken";
import { error } from "consola";
import { compare, hash } from "bcrypt";

export default {
  Query: {
    getAllEmployees: async (_, args, { req }, info) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      let result = await Employee.find();
      return result;
    },
    getEmployeeById: async (_, { id }, { req }, info) => {
      //check req has "authorization"
      //req.admin
      //req.user
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      let result = await Employee.findById(id);
      if (!result) throw new ApolloError("Cannot get");
      return result;
    },
  },

  Mutation: {
    createAdmin: async (_, { username, password }, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      let newAdmin = {
        username,
        password,
        position: "Admin",
      };
      let admin = await Admin.findOne({ username });
      if (admin) throw new ApolloError("Username has taken");

      admin = new Admin(newAdmin);
      admin.password = await hash(newAdmin.password, 12);

      let result = await admin.save();

      if (result) {
        return {
          id: result._id,
          username: result.username,
          position: result.position,
        };
      }
    },
    createNewEmployee: async (_, { newEmployee }, { req }, info) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      //check the username has taken
      console.log(newEmployee);
      let { username, email, password } = newEmployee;
      let employee = await Employee.findOne({ username });
      if (employee) {
        throw new ApolloError(" Username has taken ");
      }
      employee = await Employee.findOne({ email });
      if (employee) {
        throw new ApolloError(" Email has taken ");
      }

      employee = new Employee(newEmployee);
      employee.password = await hash(password, 12);

      const result = await employee.save();
      return result;
    },
    editEmployeeByID: async (_, { editEmployeeByID, id }, { req }, info) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      let editData = await Employee.findByIdAndUpdate(
        { _id: id },
        { ...editEmployeeByID },
        // { new: true }
      );
      return editData;
    },
    deleteEmployee: async (_, { id }, { req }, info) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      let deleteEmployee = await Employee.findByIdAndDelete({ _id: id });
      if (deleteEmployee) {
        return {
          id,
          message: " Delete successfully !",
          success: true,
        };
      } else {
        throw new ApolloError("Delete failed ");
      }
    },
  },
};
