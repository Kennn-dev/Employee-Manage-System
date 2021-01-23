import { ApolloError, AuthenticationError } from "apollo-server-express";
// import dateFormat from "dateformat";
import Payroll from "../../models/Payroll";
import Employee from "../../models/Employee";

//remember export to root file

export default {
  Query: {
    getAllPayrolls: async (_, args, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) {
        throw new AuthenticationError(`U must be login`);
      }
      try {
        let rs = await Payroll.find().sort({ createdAt: -1 });
        // console.log(rs);
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
    getPayrollById: async (_, { idPayroll }, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) {
        throw new AuthenticationError(`U must be login`);
      }
      try {
        let rs = await Payroll.findById(idPayroll);
        // console.log(rs);
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
  },
  Mutation: {
    createPayroll: async (_, { newPayroll }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        let employees = await Employee.find();
        // console.log(employee);
        if (!employees) throw new ApolloError("Cannot find employee");

        let payroll = new Payroll();
        payroll.name = newPayroll.name
        payroll.employees = employees;
        payroll._id = payroll.id;
        payroll.save();
        // console.log(payroll);
        return payroll;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
    deletePayroll: async (_, { id }, { req }) => {
        if (!req.isAuth) throw new AuthenticationError(`U must be login`);
        if (!req.admin)
            throw new AuthenticationError(
                `U dont have permission to do this action`
        );
        try {
            let payroll = await Payroll.findByIdAndDelete(id);
            if (!payroll) return false;
            return true;
        } catch (error) {
            throw new ApolloError(error);
        }
    }, // ✅
  },
};
