import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import axios from "../api/axios";
import Spinner from "../auth/Spinner";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCompletedChange = (event) => {
    setCompleted(event.target.value === "true");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const token = JSON.parse(localStorage.getItem("user")).token; // extract token from localStorage
      const response = await axios.post(
        "/tasks",
        { title, description, completed },
        {
          headers: {
            Authorization: `Bearer ${token}`, // set Authorization header with token value
          },
        }
      );
      if (response.status === 201) {
        setErrors([]);
        setSuccess("Task Added Sucessfully!");
        setIsSubmitting(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        // console.log(error.response.data)
        setErrors(error.response.data.errors);
        setIsSubmitting(false);
        // console.log(errors)
      } else if (error.response.status === 422) {
        // console.log(error.response.data)
        setErrors(error.response.data.error);
        setIsSubmitting(false);
        // console.log(errors)
      }
    }

    setTitle("")
    setDescription("");
    setCompleted(false);
  };
  return (
    <div className="w-full h-full relative">
      <Navbar />
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto mt-32 mb-32 pr-4 pl-4"
        >
          <h1 className="text-center font-bold text-2xl">Add New Task</h1>
          {success && <p className="text-green-600 text-center">{success}</p>}
          
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="description"
              value={title}
              onChange={handleTitleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>
          
          
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="completed"
              className="block text-gray-700 font-bold mb-2"
            >
              Completed
            </label>
            <select
              id="completed"
              value={completed ? "true" : "false"}
              onChange={handleCompletedChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? <Spinner /> : "Add Task"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddTask;
