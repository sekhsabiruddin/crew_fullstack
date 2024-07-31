import React, { useState } from "react";
import statusIcon from "../../assets/status.png";
import priorityIcon from "../../assets/priority.png";
import deadlineIcon from "../../assets/deadline.png";
import descriptionIcon from "../../assets/description.png";
import { RxCross2 } from "react-icons/rx";
import validator from "validator";
import { useDispatch } from "react-redux";
import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../redux/reducer/Taskslice";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
const Modal = ({ setOpen, status, setStatus }) => {
  const { loading } = useSelector((data) => data.todoTask);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("urgent");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();

  function handleClose() {
    setOpen(false);
  }
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    console.log(e.target.value);
    setDeadline(e.target.value);
  };

  function handleAddTask() {
    if (validator.isEmpty(title)) {
      toast.error("Title is required");
      return;
    }
    if (validator.isEmpty(status)) {
      toast.error("Status is required");
      return;
    }
    if (validator.isEmpty(priority)) {
      toast.error("Priority is required");
      return;
    }
    if (!validator.isDate(deadline)) {
      toast.error("Deadline must be a valid date");
      return;
    }
    if (validator.isEmpty(description)) {
      toast.error("Description is required");
      return;
    }

    const obj = {
      id: Date.now(),
      title,
      status,
      priority,
      deadline,
      description,
    };

    dispatch(createTodo(obj));
    toast.success("Task has been created");

    setOpen(false);
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center modal-bg">
      <div className=" w-[50%] bg-[#fff] p-3">
        <div className="flex justify-end mt-1 ml-3">
          <RxCross2
            size={20}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex justify-between mb-3">
          <h1 className="text-[#CCCCCC] font-barlow text-[3rem]">Title</h1>
          <input
            type="text"
            className="w-[70%] text-base p-2 title-css rounded"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5 px-4">
          <div className="flex justify-between">
            <div className="flex w-[30%]  justify-between">
              <div>
                <img src={statusIcon} alt="" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666]  text-[1.2rem] font-inter">
                  Status
                </span>
              </div>
            </div>
            <div className="select-container">
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
                className="select-css"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progrsss</option>
                <option value="underreview">Under Review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex w-[30%]  justify-between">
              <div>
                <img src={priorityIcon} alt="" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666]  text-[1.2rem] font-inter">
                  Piority
                </span>
              </div>
            </div>
            <div className="select-container">
              <select
                name="priority"
                value={priority}
                onChange={handlePriorityChange}
                className="select-css"
              >
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex w-[30%]  justify-between">
              <div>
                <img src={deadlineIcon} alt="" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666]  text-[1.2rem] font-inter">
                  Deadline
                </span>
              </div>
            </div>
            <div className="w-[50%]">
              <input
                type="date"
                className="normal-input-css"
                value={deadline}
                onChange={handleDeadlineChange}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex w-[30%]  justify-between">
              <div>
                <img src={descriptionIcon} alt="" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666] text-[1.2rem] font-inter">
                  Description
                </span>
              </div>
            </div>
            <div className="w-[50%]">
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="normal-input-css"
              />
            </div>
          </div>
        </div>

        <div
          className="text-center add-button-css p-2 mt-3 text-[#fff] font-inter"
          onClick={handleAddTask}
        >
          <button className="text-[#fff]">Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
