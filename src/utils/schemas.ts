import * as yup from "yup";

export const LoginSchema = yup
  .object({
    userName: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const RegisterSchema = LoginSchema.shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .required()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
  sex: yup.string().required(),
  address: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .test(
      "confirmPassword",
      "Confirm password does not match",
      function (confirmPassword) {
        if (this.parent.password) {
          return confirmPassword === this.parent.password;
        }
        return true;
      }
    ),
  groupId: yup.number().nullable(),
});

export const UpdateUserSchema = RegisterSchema.shape({
  confirmPassword: yup.string().nullable(),
  password: yup.string().nullable(),
});

export type ILoginData = yup.InferType<typeof LoginSchema>;
export type IRegisterData = yup.InferType<typeof RegisterSchema>;
export type IUpdateUserData = yup.InferType<typeof UpdateUserSchema>;
export type IUser = Omit<IRegisterData, "confirmPassword">;
