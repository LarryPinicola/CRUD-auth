import React, { useEffect } from "react";
import { Button, Input, Loader, Menu, Table, rem } from "@mantine/core";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchTerms } from "../redux/services/contactSlice";
import Swal from "sweetalert2";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerms = useSelector((state) => state.contactSlice.searchTerms);
  const dispatch = useDispatch();
  // console.log(data);

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const data = await deleteContact({ id, token });
        console.log(data);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="red" />
      </div>
    );
  }

  const rows = contacts
    ?.filter((item) => {
      if (searchTerms === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerms.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    ?.map((contact) => (
      <tr key={contact?.id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email === null ? "example@gmail.com" : contact.email}</td>
        <td>{contact.address === null ? "unknown" : contact.address}</td>
        <td>
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button variant="outline">more</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component="a" href="">
                <p
                  onClick={() => deleteHandler(contact?.id)}
                  className=" text-red-500 cursor-pointer"
                >
                  Delete
                </p>
              </Menu.Item>

              <Menu.Item component="a" href="" target="_blank">
                <Link to={`/guest/${contact?.id}`}>
                  <p className="">Guest info</p>
                </Link>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <h1 className=" font-bold">is Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className=" flex items-center gap-5 mt-5">
        <Link to={"/create"}>
          <button className=" bg-blue-700 text-white px-4 py-1 shadow-lg">
            Create New Contact
          </button>
        </Link>
        <Input
          variant="filled"
          placeholder="search"
          style={{ width: 200 }}
          value={searchTerms}
          onChange={(e) => dispatch(setSearchTerms(e.target.value))}
        />
      </div>
      <div className=" mt-20">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactTable;
