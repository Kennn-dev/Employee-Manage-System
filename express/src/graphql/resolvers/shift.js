import { ApolloError, AuthenticationError } from "apollo-server-express";
import dateFormat from "dateformat";
import Shift from "../../models/Shift";
import Employee from "../../models/Employee";

export default {
  Query: {
    getAllShifts: async (_, args, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) {
        throw new AuthenticationError(`U must be login`);
      }
      try {
        let rs = await Shift.find();
        // console.log(rs);
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    // ✅
    getShiftById: async (_, { id }, { req }) => {
      //check req has "Authorize"
      //req.user
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);

      const shift = await Shift.findById(id);
      shift
        ? () => {
            return shift;
          }
        : () => {
            throw new ApolloError(` Cannot find shift `);
          };
    },
    // ✅
  },
  Mutation: {
    addShift: async (_, { newShift }, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      let { name } = newShift;
      let shift = await Shift.findOne({ name });
      if (shift) throw new ApolloError("Name cannot be same !");

      let cloneShift = { ...newShift };
      cloneShift = {
        ...cloneShift,
        employees: [],
        timeStart: dateFormat(cloneShift.timeStart, "isoTime"),
        timeEnd: dateFormat(cloneShift.timeEnd, "isoTime"),
      };

      // console.log(cloneShift.timeStart);

      //1608948913 s
      //1608981313 e
      shift = new Shift(cloneShift);
      try {
        // console.log(shift._doc);
        let rs = await shift.save();
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    // ✅
    deleteShift: async (_, { id }, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        let deleteShift = await Shift.findByIdAndDelete({ _id: id });
        if (!deleteShift) throw new ApolloError(" Cannot delete ");
        return true;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    // ✅
    signUpShift: async (_, { idShift, idEmployee }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);

      let employee = await Employee.findById(idEmployee);
      // console.log(employee);
      if (!employee) throw new ApolloError("Cannot find employee");

      employee._id = employee.id;
      const shift = Shift.findByIdAndUpdate(
        idShift,
        {
          //if not exist
          $addToSet: { employees: employee },
        },
        (err, res) => {
          if (err) throw new ApolloError(err);
          // return shift;
        }
      );
      // console.log(shift);
      return shift;
      // console.log(employee);
      // console.log(shift);
    },
    //✅
  },
};
//remember export to root file
