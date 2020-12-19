import { ApolloError, AuthenticationError } from "apollo-server-express";
import { compare, hash } from "bcrypt";
// import { ApolloError } from "apollo-server-express";
// import { getUser } from "../../functions/index";
import Admin from "../../models/Admin";
import Employee from "../../models/Employee";

import { getTokens } from "../../functions/index";

export default {
  Query: {
    getProfileEmpById: async (_, { id }, { req }) => {
      //check req has "Authorize"
      //req.user
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      const employee = await Employee.findById(id);
      if (employee) {
        return {
          employee,
        };
      } else {
        throw new ApolloError("Cant find employee");
      }
    },
  },
  Mutation: {
    loginUser: async (_, { username, password }, { res }, info) => {
      //check username ,
      let user = await Employee.findOne({ username });
      if (!user) {
        let admin = await Admin.findOne({ username });
        if (!admin)
          throw new AuthenticationError(" Username is not valid ", 402);
        //check password.
        const hash = await compare(password, admin.password);
        if (hash != true) {
          throw new AuthenticationError(" Password doesn't match ! ", 402);
        }
        // send token
        const { accessToken } = getTokens({
          id: admin._id,
          username: admin.username,
          position: admin.position,
        });
        res.cookie("accessToken", accessToken, { expire: 60 * 60 }); //1h
        return {
          id: admin._id,
          position: admin.position,
          username: admin.username,
          token: accessToken,
        };
      }
      //check password.
      const hash = await compare(password, user.password);
      if (hash != true) {
        throw new AuthenticationError(" Password doesn't match ! ", 402);
      }

      // send token
      const { accessToken } = getTokens({
        id: user._doc._id,
        username: user.username,
        position: user.position,
      });
      ////
      console.log("isEmployee");
      res.cookie("accessToken", accessToken, { expire: 60 * 60 }); //1h
      return {
        id: user._id,
        position: user.position,
        username: user.username,
        token: accessToken,
      };
    },
    changePasswordEmp: async (_, { changePassword }, { req }) => {
      //check req has "Authorize"
      //req.user
      if (!req.isAuth) throw new AuthenticationError(`U must be login`);
      if (!req.user)
        throw new AuthenticationError(
          `U dont have permission to do this action`
        );

      const { oldPassword, newPassword, confirmPassword } = changePassword;
      const userData = req.user;
      const id = userData._id;

      //compare 2 newPasswords
      let confirm = newPassword.localeCompare(confirmPassword); // equal = 0
      if (confirm !== 0)
        throw new AuthenticationError(`Password confirm doesn't match`);

      //compare old password with password in userData
      let comparePass = await compare(oldPassword, userData.password);
      if (!comparePass)
        throw new AuthenticationError(`Your old password doesn't match`);
      let hashPass = await hash(newPassword, 12);

      const user = await Employee.findByIdAndUpdate(
        { _id: id },
        {
          password: hashPass,
        }
      );
      if (!user) throw new ApolloError(`Cannot update`);
      return {
        message: "Update succesfully",
        success: true,
      };
    },
    resetTokens: async (_, __, { req }) => {
      if (!req.user) {
        if (!req.admin) {
          return false;
        }
        const admin = await Admin.findById(req.admin);
        // console.log(admin);
        if (!admin) return false;
        admin.count += 1;
        await admin.save();
        res.clearCookie("accessToken");
        return true;
      }
      const user = await Employee.findById(req.user);
      if (!user) {
      }
      user.count += 1;
      await user.save();
      res.clearCookie("accessToken");
      return true;
    },
  },
};

//remember export to root file
