import React, { useState, useEffect } from "react";
import statusIcon from "../../assets/status.png";
import priorityIcon from "../../assets/priority.png";
import deadlineIcon from "../../assets/deadline.png";
import descriptionIcon from "../../assets/description.png";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../redux/reducer/Taskslice";
import validator from "validator";
import { toast } from "react-toastify";
const EditModal = ({ editData, setEdit }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("urgent");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setStatus(editData.status || "todo");
      setPriority(editData.priority || "urgent");
      setDeadline(editData.deadline ? editData.deadline.split("T")[0] : "");
      setDescription(editData.description || "");
    }
  }, [editData]);

  function handleClose() {
    setEdit(false);
  }

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  function handleUpdateTask() {
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
    const updatedTask = {
      title,
      status,
      priority,
      deadline,
      description,
    };
    dispatch(updateTodo({ taskId: editData._id, updates: updatedTask }));
    toast.success("Update was successful");
    handleClose();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center modal-bg">
      <div className="w-[50%] bg-[#fff] px-3 py-5">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5 px-4">
          <div className="flex justify-between">
            <div className="flex w-[30%] justify-between">
              <div>
                <img src={statusIcon} alt="status" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666] text-[1.2rem] font-inter">
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
                <option value="inprogress">In Progress</option>
                <option value="underreview">Under Review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex w-[30%] justify-between">
              <div>
                <img src={priorityIcon} alt="priority" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666] text-[1.2rem] font-inter">
                  Priority
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
            <div className="flex w-[30%] justify-between">
              <div>
                <img src={deadlineIcon} alt="deadline" />
              </div>
              <div className="w-[50%]">
                <span className="text-[#666666] text-[1.2rem] font-inter">
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
            <div className="flex w-[30%] justify-between">
              <div>
                <img src={descriptionIcon} alt="description" />
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
                className="normal-input-css"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div
          className="text-center add-button-css p-2 mt-4 text-[#fff] font-inter cursor-pointer"
          onClick={handleUpdateTask}
        >
          <button className="text-[#fff]">Update Task</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
