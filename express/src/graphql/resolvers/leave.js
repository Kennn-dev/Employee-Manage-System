import { ApolloError, AuthenticationError } from "apollo-server-express";
// import dateFormat from "dateformat";
import Leave from "../../models/Leave";
import Employee from "../../models/Employee";

//remember export to root file

export default {
  Query: {
    getAllLeaves: async (_, args, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) {
        throw new AuthenticationError(`U must be login`);
      }
      try {
        let rs = await Leave.find().sort({ createdAt: -1 });
        // console.log(rs);
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
  },
  Mutation: {
    signUpLeave: async (_, { newLeave }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.user)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        let employee = await Employee.findById(req.user);
        // console.log(employee);
        if (!employee) throw new ApolloError("Cannot find employee");
        const rm = employee.remain - 1;
        employee.remain = rm;
        employee.save();

        let leave = new Leave(newLeave);
        leave.employee = employee;
        leave._id = leave.id;
        leave.save();
        // console.log(leave);
        return leave;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
    approvedLeave: async (_, { idLeave, newStatus }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );

      try {
        let leave = await Leave.findByIdAndUpdate(idLeave, {
          status: newStatus,
        });
        return leave;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, // ✅
    deleteLeave: async (_, { idLeave }, { req }) => {
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);

      try {
        let result = await Leave.findByIdAndDelete(idLeave);
        if (!result) return false;
        return true;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, // ✅
  },
};
