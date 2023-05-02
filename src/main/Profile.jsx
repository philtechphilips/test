import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import axios from "../api/axios";
import Spinner from "../auth/Spinner";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorsEmail, setErrorsEmail] = useState([]);
  const [success, setSuccess] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

 

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token; // extract token from localStorage
        const response = await axios.get("users/me", {
          headers: {
            Authorization: `Bearer ${token}`, // set Authorization header with token value
          },
        });
        // console.log(response.data._id)
        if (response.status === 200) {
          setName(response.data.name)
          setEmail(response.data.email)
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
      const response = await axios.patch("user/me", { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // set Authorization header with token value
          },
        }
      );
      //console.log(response)
      if (response.status === 200) {
        setErrors([]);
        setErrorsEmail([]);
        setSuccess("Profile Updated Sucessfully!");
        setIsSubmitting(false);
      }
    } catch (error) {
    //   console.log(error);
      if (error.response.status === 400) {
        // console.log(error.response.data)
        setErrorsEmail([])
        setErrors(error.response.data.errors)
        setIsSubmitting(false);
    }else if (error.response.status === 422) {
        // console.log(error.response.data)
        setErrors([])
        setErrorsEmail(error.response.data.error)
        setIsSubmitting(false);
    }
    }
  };


  return (
    <div className="w-full h-full relative">
      <Navbar />
      <div className="w-full flex flex-wrap justify-around">
        <form
          onSubmit={handleSubmit}
          className="w-96 mt-20 mb-20 pr-4 pl-4"
        >
          <h1 className="text-center font-bold text-2xl">Edit Profile</h1>
          {success && <p className="text-green-600 text-center">{success}</p>}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
            <p className="text-red-600">{errors.name.properties.message}</p>
          )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
            <p className="text-red-600">{errors.email.properties.message}</p>
          )}
          {errorsEmail && <p className="text-red-600">{errorsEmail}</p>}
          </div>

          
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? <Spinner /> : "Update Profile"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
