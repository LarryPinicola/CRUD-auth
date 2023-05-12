import Cookies from "js-cookie";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSingleContactQuery } from "../redux/api/contactApi";

const GuestInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data } = useSingleContactQuery({ id, token });
  console.log(data);

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" flex flex-col gap-5 p-7 shadow-lg">
        <p className="">{data?.contact?.name}</p>
        <p className="">{data?.contact?.email}</p>
        <p className="">{data?.contact?.phone}</p>
        <p className="">{data?.contact?.address}</p>
        <Link to={"/"}> 
          <button className=" bg-teal-500 text-white p-2">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default GuestInfo;
