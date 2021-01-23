import { ApolloError, AuthenticationError } from "apollo-server-express";
import Salary from "../../models/Salary";
import Employee from "../../models/Employee";
//remember export to root file

export default {
  Query: {
    getAllSalaries: (_, args, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);

      try {
        let salary = Salary.find();
        return salary;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addNewSalary: (_, { newSalary }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        const rs = {
          name: newSalary.name,
          amount: newSalary.amount,
        };
        let salary = new Salary(rs);
        salary.id = salary._id;
        salary.save();
        return true;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //
    deleteSalary: async (_, { id }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        let salary = await Salary.findByIdAndDelete(id);
        salary
          ? () => {
              return true;
            }
          : () => {
              return false;
            };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    applySalary: async (_, { idSalary, idEmployee }, { req }) => {
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      let salarySchema = await Salary.findById(idSalary);
      if (!salarySchema) throw new ApolloError(`Cannot find salary`);

      try {
        let employee = await Employee.findByIdAndUpdate(idEmployee, {
          salary: salarySchema,
        });
        // console.log(employee);
        return employee;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
