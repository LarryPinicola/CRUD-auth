import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {
  //   const { user } = useSelector((state) => state.authSlice);
  //   const { token } = useSelector((state) => state.authSlice);

  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const nav = useNavigate();

  const logoutHandler = async () => {
    const data = await logout(token);
    dispatch(removeUser());
    if (data?.success) {
      return nav("/login");
    }
    console.log(data);
  };

  return (
    <div className=" flex justify-around p-5 shadow-lg items-center">
      <h1 className=" text-2xl font-semibold text-blue-500">MMSIT</h1>
      <div className=" flex gap-5 items-center">
        <div className="flex flex-col gap-2 font-semibold">
          <p className=" text-gray-700">{user?.name}</p>
          <p className=" text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logoutHandler}
          className=" bg-red-500 text-white px-3 py-1"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
