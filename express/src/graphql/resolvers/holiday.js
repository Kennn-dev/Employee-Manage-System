import { ApolloError, AuthenticationError } from "apollo-server-express";
// import dateFormat from "dateformat";

import Holiday from "../../models/Holiday";

//remember export to root file

export default {
  Query: {
    getAllHolidays: async (_, args, { req }) => {
      //check req has "Authorize"
      //req.admin
      if (!req.isAuth) {
        throw new AuthenticationError(`U must be login`);
      }
      try {
        let rs = await Holiday.find().sort("date");
        // console.log(rs);
        return rs;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //✅
  },
  Mutation: {
    addHoliday: async (_, { newHoliday }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );
      try {
        let holiday = new Holiday(newHoliday);
        holiday._id = holiday.id;

        holiday.save();
        // console.log(leave);
        return holiday;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //
    editHoliday: async (_, { idHoliday, newHoliday }, { req }) => {
      //check req has "Authorize"
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );

      try {
        let holiday = await Holiday.findByIdAndUpdate(idHoliday, {
          title: newHoliday.title,
          date: newHoliday.date,
        });
        return holiday;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //
    deleteHoliday: async (_, { idHoliday }, { req }) => {
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.admin)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );

      try {
        let result = await Holiday.findByIdAndDelete(idHoliday);
        if (!result) return false;
        return true;
      } catch (error) {
        throw new ApolloError(error);
      }
    }, //
  },
};
