import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { PasswordInput, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const nav = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "lalalarry155@gmail.com",
      password: "1234512345",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { email, password };
      const { data } = await login(user);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      console.log(data);
      if (data?.success) nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        // onSubmit={loginHandler}
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            dispatch(addUser({ user: data?.user, token: data?.token }));
            // console.log(data);
            // console.log(values);
            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        action=""
        className=" w-96 flex flex-col gap-3 p-4 rounded-lg shadow-lg"
      >
        <h1 className=" text-2xl font-semibold text-blue-400 text-center">
          Log in
        </h1>
        <TextInput
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...form.getInputProps("email")}
          placeholder="Your email"
          label="Email"
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <PasswordInput
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...form.getInputProps("password")}
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <div className=" flex gap-5">
          <p className=" select-none text-gray-500 font-serif ">
            Don't have Account?
          </p>
          <Link to={"/register"}>
            <p className=" cursor-pointer text-gray-600 font-semibold select-none">
              register
            </p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-500 text-white rounded-lg px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="dark" size="sm" />
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
