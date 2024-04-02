import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./LoginLayout.module.css";

const LoginLayout = () => {
  return (
    <Container className={`overflow-hidden ${styles.h100vh}`}>
      <Row className="pb-2 h-75">
        <Col
          xs={0}
          sm={7}
          className="align-items-center justify-content-center d-flex"
        >
          <h1 className="text-center h-fitcontent">
            This website for learning
            <b className={`d-block text-center ${styles.textMain}`}> JWT</b>
          </h1>
        </Col>
        <Col
          xs={12}
          sm={5}
          className="mt-5 align-items-center justify-content-center d-flex"
        >
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginLayout;
