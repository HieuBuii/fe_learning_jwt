import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  IRegisterData,
  IUpdateUserData,
  RegisterSchema,
  UpdateUserSchema,
} from "../../utils/schemas";
import Input from "../../components/Input";
import styles from "../../pages/Register/Register.module.css";
import { useEffect, useState } from "react";
import { IGroup } from "../../types/group.type";
import { getAllGroups } from "../../apis/group.api";
import { IUserData } from "../../types/user.type";

interface IProps {
  formId: string;
  onSubmitForm: (data: IRegisterData | IUpdateUserData) => Promise<boolean>;
  initData: IUserData | null;
}

const FormCUUser = (props: IProps) => {
  const { formId, onSubmitForm, initData } = props;
  const [groupOptions, setGroupOptions] = useState<IGroup[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(initData ? UpdateUserSchema : RegisterSchema),
    defaultValues: {
      sex: "1",
    },
  });

  useEffect(() => {
    initData && reset({ ...initData, sex: initData.sex.toString() });
  }, [initData, reset, groupOptions]);

  useEffect(() => {
    const handleGetAllsGroup = async () => {
      try {
        const res = await getAllGroups();
        const { code, data } = res.data;
        if (code === 200) setGroupOptions(data);
        if (data.length) {
          setValue("groupId", data[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetAllsGroup();
  }, [setValue]);

  const onSubmit = async (data: IRegisterData | IUpdateUserData) => {
    const isSuccess = await onSubmitForm(data);
    if (isSuccess) reset();
  };

  return (
    <Form
      id={formId}
      className={styles.formContainer}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mx-0">
        <Col xs={12} sm={6}>
          <Input
            type="text"
            register={register("userName")}
            isValid={!errors.userName}
            errorMessage={errors.userName?.message}
            label="User name"
            disabled={!!initData}
          />
        </Col>

        <Col xs={12} sm={6}>
          <Input
            type="email"
            register={register("email")}
            isValid={!errors.email}
            errorMessage={errors.email?.message}
            label="Email"
            disabled={!!initData}
          />
        </Col>

        {!initData && (
          <>
            <Col xs={12} sm={6}>
              <Input
                type="password"
                register={register("password")}
                isValid={!errors.password}
                errorMessage={errors.password?.message}
                label="Password"
              />
            </Col>

            <Col xs={12} sm={6}>
              <Input
                type="password"
                register={register("confirmPassword")}
                isValid={!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                label="Confirm password"
              />
            </Col>
          </>
        )}

        <Col xs={12} sm={6}>
          <Input
            type="text"
            register={register("firstName")}
            isValid={!errors.firstName}
            errorMessage={errors.firstName?.message}
            label="First name"
          />
        </Col>

        <Col xs={12} sm={6}>
          <Input
            type="text"
            register={register("lastName")}
            isValid={!errors.lastName}
            errorMessage={errors.lastName?.message}
            label="Last name"
          />
        </Col>

        <Col xs={12}>
          <Input
            type="text"
            register={register("address")}
            isValid={!errors.address}
            errorMessage={errors.address?.message}
            label="Address"
          />
        </Col>

        <Col xs={12}>
          <Form.Label>Group </Form.Label>
          <Form.Select aria-label="Select group" {...register("groupId")}>
            {groupOptions.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} className="mb-2 mt-3 d-flex  gap-2">
          <Form.Label>Sex: </Form.Label>
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
      </Row>
    </Form>
  );
};

export default FormCUUser;
