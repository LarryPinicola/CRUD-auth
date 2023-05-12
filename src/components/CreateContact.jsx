import { TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";

const CreateContact = () => {
  const token = Cookies.get("token");
  const [CreateContact, { isLoading }] = useCreateContactMutation();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      phone: hasLength({ min: 9, max: 11 }),
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data } = await CreateContact({ token, data: values });
          if (data?.success) {
            nav("/");
          }
          console.log(data);
        })}
        action=""
        className=" w-96 flex flex-col gap-3 p-4 rounded-lg shadow-lg"
      >
        <h1 className=" text-2xl font-semibold text-blue-400 text-center">
          Create New One
        </h1>
        <TextInput
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...form.getInputProps("name")}
          placeholder="Your name"
          label="Name"
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <TextInput
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...form.getInputProps("phone")}
          placeholder="phone"
          label="Phone"
          description="Your Phone Number"
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <TextInput
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...form.getInputProps("email")}
          placeholder="email"
          label="Email"
          description="Password must include at least one letter, number and special character"
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <TextInput
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...form.getInputProps("address")}
          placeholder="Your address"
          label="Address"
          description=""
          variant="filled"
          radius="lg"
          withAsterisk
        />
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-500 text-white rounded-lg px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="dark" size="sm" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
