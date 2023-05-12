import { PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password_confirmation, setPasswordConfirmation] = useState("");

  const [register, { isLoading, isFetching }] = useRegisterMutation();
  // lalalarry155@gmail.com
  const nav = useNavigate();

  // useForm from @mantine
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  // const registerHandler = async (e) => {
  //   // error handling
  //   try {
  //     e.preventDefault();
  //     const user = { name, email, password, password_confirmation };
  //     const { data } = await register(user);
  //     if (data?.success === true) {
  //       nav("/login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (isLoading) {
    return (
      <div className=" flex justify-center h-screen items-center">
        <h1 className=" text-black">Loading...</h1>
      </div>
    );
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        // onSubmit={registerHandler}
        // values come from the useForm 'mantine'
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(data);
            console.log(values);
            if (data?.success) {
              nav("/login");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        action=""
        className=" w-96 flex flex-col gap-3 p-4 rounded-lg shadow-lg"
      >
        <h1 className=" text-2xl font-semibold text-red-400 text-center">
          Register
        </h1>
        <TextInput
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          {...form.getInputProps("name")}
          placeholder="Your name"
          label="Full name"
          variant="filled"
          radius="lg"
          withAsterisk
        />
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
        <PasswordInput
          // value={password_confirmation}
          // onChange={(e) => setPasswordConfirmation(e.target.value)}
          {...form.getInputProps("password_confirmation")}
          placeholder="Confirm Password"
          label="Confirm Password"
          variant="filled"
          withAsterisk
          radius="lg"
        />
        <div className=" flex gap-5">
          <p className=" select-none text-gray-500 font-serif ">
            Already have an account?
          </p>
          <Link to={"/login"}>
            <p className=" cursor-pointer text-gray-600 font-semibold select-none">
              Log in
            </p>
          </Link>
        </div>
        <button
          disabled={isFetching && true}
          type="submit"
          className=" bg-red-500 text-white rounded-lg px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" size="sm" variant="dots" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
