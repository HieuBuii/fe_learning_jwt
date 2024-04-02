import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IRegisterData, RegisterSchema } from "../../utils/schemas";
import Input from "../../components/Input";
import { register as registerApi } from "../../apis/user.api";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      sex: "1",
    },
  });

  const onSubmit = async (data: IRegisterData) => {
    try {
      const res = await registerApi(data);
      const { code, message } = res.data;
      if (code === 201) {
        reset();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className={styles.container100vh}>
      <Col>
        <h2 className="text-center">Regiter</h2>
      </Col>
      <Form
        id="register"
        className={styles.formContainer}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          register={register("userName")}
          isValid={!errors.userName}
          errorMessage={errors.userName?.message}
          label="User name"
        />

        <Input
          type="password"
          register={register("password")}
          isValid={!errors.password}
          errorMessage={errors.password?.message}
          label="Password"
        />

        <Input
          type="password"
          register={register("confirmPassword")}
          isValid={!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          label="Confirm password"
        />

        <Input
          type="text"
          register={register("firstName")}
          isValid={!errors.firstName}
          errorMessage={errors.firstName?.message}
          label="First name"
        />

        <Input
          type="text"
          register={register("lastName")}
          isValid={!errors.lastName}
          errorMessage={errors.lastName?.message}
          label="Last name"
        />

        <Input
          type="email"
          register={register("email")}
          isValid={!errors.email}
          errorMessage={errors.email?.message}
          label="Email"
        />

        <Input
          type="text"
          register={register("address")}
          isValid={!errors.address}
          errorMessage={errors.address?.message}
          label="Address"
        />

        <Col className="mb-2 mt-1 d-flex align-items-center gap-2">
          <Form.Check
            inline
            label="Male"
            type="radio"
            {...register("sex")}
            value={1}
            id="1"
          />

          <Form.Check
            inline
            type="radio"
            label="Female"
            {...register("sex")}
            value={0}
            id="0"
          />

          <Form.Check
            inline
            label="Other"
            type="radio"
            {...register("sex")}
            value={2}
            id="2"
          />
        </Col>
      </Form>
      <Col xs={12}>
        <span>You already have a account? </span>
        <b>
          <Link style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
        </b>
      </Col>
      <Col xs={12}>
        <Button form="register" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Col>
    </Row>
  );
};

export default Register;
