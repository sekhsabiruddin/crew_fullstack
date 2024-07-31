import React, { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import EditModal from "../EditModal/EditModal";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  fetchTodos,
} from "../../redux/reducer/Taskslice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const { todoData, loading } = useSelector((data) => data.todoTask);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  function handleAdd(value) {
    setOpen(true);
    setStatus(value);
  }
  //edit function start here
  function handleEdit(value) {
    setEdit(true);
    setEditData(value);
  }
  //efit function end here
  //delete function start here
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id)).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
            confirmButtonColor: "#28a745",
          });
        });
      }
    });
  };

  //delete function end here
  const getButtonClass = (priority) => {
    let baseClass = "px-3 p-1 text-[#fff] rounded-md text-[13px] ";
    switch (priority) {
      case "urgent":
        return baseClass + "bg-[#FF6B6B]";
      case "medium":
        return baseClass + "bg-[#FFA500]";
      case "low":
        return baseClass + "bg-[#0ECC5A]";
      default:
        return baseClass + "bg-[#D3D3D3]";
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="ml-[17%]  w-[100%]">
      <div className="flex justify-center ">
        <div className="w-[90%]">
          <div className="flex justify-between ">
            {/* //First column start here  */}
            <div className="flex flex-col w-[22%] ">
              <span className="text-[20px]  text-[#555555]">To Do</span>
              {/* //first div start here  */}

              {todoData &&
                todoData.map(
                  (value, i) =>
                    value.status === "todo" && (
                      <div key={i} className="bg-[#f9f9f9] mt-3   boxBorder">
                        <h3 className="text-[#606060] font-medium font-inter text-[16px]">
                          {value.title}
                        </h3>
                        <div>
                          <span className="text-[14px] font-inter mt-2 text-[#797979]">
                            {value.description}
                          </span>
                        </div>
                        <div className="my-2">
                          <button className={getButtonClass(value.priority)}>
                            {value.priority}
                          </button>
                        </div>
                        <div className="flex items-center my-2">
                          <IoMdTime size={20} className="text-[#606060]" />
                          <span className="ml-2 font-inter text-[#606060]">
                            {value.deadline
                              ? value.deadline.split("T")[0]
                              : null}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#797979] font-inter">
                            1 hr ago
                          </span>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex items-center">
                            <div className="cursor-pointer">
                              <MdModeEdit
                                size={20}
                                color="green"
                                onClick={() => handleEdit(value)}
                              />
                            </div>
                            <div className="ml-4 cursor-pointer">
                              <AiOutlineDelete
                                size={20}
                                color="red"
                                onClick={() => handleDelete(value._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}

              <div
                className="add-button-css mt-6 flex items-center justify-between p-2 rounded-sm cursor-pointer w-[100%]"
                onClick={() => handleAdd("todo")}
              >
                <button className="text-[#fff]">Add new</button>
                <GoPlus color="#fff" />
              </div>
              {/* //first div start here  */}
            </div>
            {/* //First column end here  */}
            {/* //Second column start here  */}
            <div className="flex flex-col w-[22%] ">
              <span className="text-[20px] text-[#555555]">In Progress</span>
              {/* //first div start here  */}
              {todoData &&
                todoData.map(
                  (value, i) =>
                    value.status === "inprogress" && (
                      <div key={i} className="bg-[#f9f9f9] mt-3 p-2 boxBorder">
                        <h3 className="text-[#606060] font-medium font-inter text-[16px]">
                          {value.title}
                        </h3>
                        <div>
                          <span className="text-[14px] font-inter mt-2 text-[#797979]">
                            {value.description}
                          </span>
                        </div>
                        <div className="my-2">
                          <button className={getButtonClass(value.priority)}>
                            {value.priority}
                          </button>
                        </div>
                        <div className="flex items-center my-2">
                          <IoMdTime size={20} className="text-[#606060]" />
                          <span className="ml-2 font-inter text-[#606060]">
                            28-08-24
                          </span>
                        </div>
                        <div>
                          <span className="text-[#797979] font-inter">
                            1 hr ago
                          </span>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex items-center">
                            <div className="cursor-pointer">
                              <MdModeEdit
                                size={20}
                                color="green"
                                onClick={() => handleEdit(value)}
                              />
                            </div>
                            <div className="ml-4 cursor-pointer">
                              <AiOutlineDelete
                                size={20}
                                color="red"
                                onClick={() => handleDelete(value._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              <div
                className="add-button-css mt-6 flex items-center justify-between p-2 rounded-sm cursor-pointer w-[100%]"
                onClick={() => handleAdd("inprogress")}
              >
                <button className="text-[#fff]">Add new</button>
                <GoPlus color="#fff" />
              </div>
              {/* //first div start here  */}
            </div>
            {/* //Second column end here  */}
            {/* //Third column start here  */}
            <div className="flex flex-col w-[22%] ">
              <span className="text-[20px] text-[#555555]">Under Review</span>
              {/* //first div start here  */}
              {todoData &&
                todoData.map(
                  (value, i) =>
                    value.status === "underreview" && (
                      <div key={i} className="bg-[#f9f9f9] mt-3 p-2 boxBorder">
                        <h3 className="text-[#606060] font-medium font-inter text-[16px]">
                          {value.title}
                        </h3>
                        <div>
                          <span className="text-[14px] font-inter mt-2 text-[#797979]">
                            {value.description}
                          </span>
                        </div>
                        <div className="my-2">
                          <button className={getButtonClass(value.priority)}>
                            {value.priority}
                          </button>
                        </div>
                        <div className="flex items-center my-2">
                          <IoMdTime size={20} className="text-[#606060]" />
                          <span className="ml-2 font-inter text-[#606060]">
                            28-08-24
                          </span>
                        </div>
                        <div>
                          <span className="text-[#797979] font-inter">
                            1 hr ago
                          </span>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex items-center">
                            <div className="cursor-pointer">
                              <MdModeEdit
                                size={20}
                                color="green"
                                onClick={() => handleEdit(value)}
                              />
                            </div>
                            <div className="ml-4 cursor-pointer">
                              <AiOutlineDelete
                                size={20}
                                color="red"
                                onClick={() => handleDelete(value._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              <div
                className="add-button-css mt-6 flex items-center justify-between p-2 rounded-sm cursor-pointer w-[100%]"
                onClick={() => handleAdd("underreview")}
              >
                <button className="text-[#fff]">Add new</button>
                <GoPlus color="#fff" />
              </div>
              {/* //first div start here  */}
            </div>
            {/* //Third column end here  */}
            {/* //fouth column start here  */}
            <div className="flex flex-col w-[22%]">
              <span className=" text-[20px] text-[#555555]">Finished</span>
              {/* //first div start here  */}
              {todoData &&
                todoData.map(
                  (value, i) =>
                    value.status === "finished" && (
                      <div key={i} className="bg-[#f9f9f9] mt-3 p-2 boxBorder">
                        <h3 className="text-[#606060] semi-bold font-inter text-[16px]">
                          {value.title}
                        </h3>
                        <div>
                          <span className="text-[14px] font-inter mt-2 text-[#797979]">
                            {value.description}
                          </span>
                        </div>
                        <div className="my-2">
                          <button className={getButtonClass(value.priority)}>
                            {value.priority}
                          </button>
                        </div>
                        <div className="flex items-center my-2">
                          <IoMdTime size={20} className="text-[#606060]" />
                          <span className="ml-2 font-inter text-[#606060]">
                            28-08-24
                          </span>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex items-center">
                            <div className="cursor-pointer">
                              <MdModeEdit
                                size={20}
                                color="green"
                                onClick={() => handleEdit(value)}
                              />
                            </div>
                            <div className="ml-4 cursor-pointer">
                              <AiOutlineDelete
                                size={20}
                                color="red"
                                onClick={() => handleDelete(value._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              <div
                className="add-button-css mt-6 flex items-center justify-between p-2 rounded-sm cursor-pointer w-[100%]"
                onClick={() => handleAdd("finished")}
              >
                <button className="text-[#fff]">Add new</button>
                <GoPlus color="#fff" />
              </div>
              {/* //first div start here  */}
            </div>
            {/* //fouth column end here  */}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal setOpen={setOpen} status={status} setStatus={setStatus} />
      )}
      {isEdit && <EditModal editData={editData} setEdit={setEdit} />}
    </div>
  );
};

export default Home;
