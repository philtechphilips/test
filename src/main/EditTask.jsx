import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import axios from "../api/axios";
import Spinner from "../auth/Spinner";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { id } = useParams();
  // console.log(id)

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCompletedChange = (event) => {
    setCompleted(event.target.value === "true");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token; // extract token from localStorage
        const response = await axios.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // set Authorization header with token value
          },
        });
        if (response.status === 200) {
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await axios.patch(
        `/tasks/${id}`,
        { description, completed },
        {
          headers: {
            Authorization: `Bearer ${token}`, // set Authorization header with token value
          },
        }
      );
      if (response.status === 200) {
        setErrors([]);
        setSuccess("Task Updated Sucessfully!");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        // console.log(error.response.data)
        setErrors(error.response.data.errors.description.message);
        setIsSubmitting(false);
        console.log(errors);
      } else if (error.response.status === 422) {
        // console.log(error.response.data)
        setErrors(error.response.data.error);
        setIsSubmitting(false);
        // console.log(errors)
      }
    }
  };
  return (
    <div className="w-full h-full relative">
      <Navbar />
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto mt-32 mb-32 pr-4 pl-4"
        >
          <h1 className="text-center font-bold text-2xl">Edit Task</h1>
          {success && <p className="text-green-600 text-center">{success}</p>}
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
            {errors && <p className="text-red-600">{errors}</p>}
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
            {isSubmitting ? <Spinner /> : "Update Task"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditTask;
