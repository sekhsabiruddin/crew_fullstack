import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../../redux/reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  function handleLogOut() {
    dispatch(logOut());
    navigate("/");
    toast.success("Logout success");
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="fixed min-w-[15%] side-border h-screen p-2">
      <div className="flex items-center justify-center">
        <FaRegUser />
        <h2 className="font-inter  text-[#080808] ml-[5px]">
          {user ? user.user.username : null}
        </h2>
      </div>
      <div className="flex justify-between items-center mt-5 ">
        <div className="flex">
          <IoIosNotificationsOutline size={20} />
          <MdKeyboardDoubleArrowRight size={20} />
        </div>
        <div
          className="bg-[#CECECE] py-1 px-2 log-out-background cursor-pointer"
          onClick={handleLogOut}
        >
          <span className="text-[#797979] font-inter text-[1rem]">Logout</span>
        </div>
      </div>
      <div className="mt-5 bg-[#F4F4F4] py-[0.3rem] home-border  px-[0.3rem] flex items-center">
        <RiHomeLine />
        <span className="text-[#797979] ml-3">Home</span>
      </div>
    </div>
  );
};

export default Sidebar;
