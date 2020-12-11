import Employee from "../../models/Employee";
// import { ApolloError } from "apollo-server-express";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { error } from "consola";
import { totp } from "otplib";

// import { getUser } from "../../functions/index";
import { SECRETKEY } from "../../config/index";
import { ApolloError, AuthenticationError } from "apollo-server-express";

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
    loginEmployee: async (_, { username, password }, { res }, info) => {
      //check username ,
      const user = await Employee.findOne({ username });
      if (!user) {
        throw new AuthenticationError(" Username is not valid ", 402);
      }
      //check password.
      const hash = await compare(password, user.password);
      if (hash != true) {
        throw new AuthenticationError(" Password doesn't match ! ", 402);
      }

      // send token
      const accessToken = sign(
        {
          id: user._doc._id,
          ...user._doc,
        },
        SECRETKEY,
        { expiresIn: 60 * 60 * 24 }
      );

      ////
      res.cookie("accessToken", accessToken, { expiresIn: 60 * 60 * 24 });
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
  },
};

//remember export to root file
