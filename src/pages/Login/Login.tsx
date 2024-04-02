import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ILoginData, LoginSchema } from "../../utils/schemas";
import Input from "../../components/Input";
import { login } from "../../apis/user.api";
import styles from "../Register/Register.module.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { signIn } from "../../auth/authActions";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: ILoginData) => {
    try {
      const res = await login(data);
      const { code, message } = res.data;
      if (code === 200) {
        reset();
        navigate("/");
        localStorage.setItem("ACCESS_TOKEN", "fake token");
        dispatch(signIn({ user: res.data.data }));
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something error");
    }
  };

  return (
    <Row className={styles.container100vh}>
      <Col>
        <h2 className="text-center">Login</h2>
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
          placeholder="Enter email or user name to login"
        />

        <Input
          type="password"
          register={register("password")}
          isValid={!errors.password}
          errorMessage={errors.password?.message}
          label="Password"
          placeholder="Enter password"
        />
      </Form>
      <Col xs={12}>
        <span>You already have a account? </span>
        <b>
          <Link style={{ textDecoration: "none" }} to="/register">
            Register
          </Link>
        </b>
      </Col>
      <Col xs={12}>
        <Button form="register" type="submit" className="w-100 mt-3">
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
