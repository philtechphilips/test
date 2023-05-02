import "./styles/table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./constant/data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "./api/axios";
import Footer from "./main/Footer";
const LandingPage = () => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(response.data);
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  

 

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const token = JSON.parse(localStorage.getItem('user')).token; // extract token from localStorage
      const response = await axios.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // set Authorization header with token value
        }
      });
      if(response.status === 200){
        setSuccess('Task Deleted Successfully!')
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/edit-task/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit Task</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete Task
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full h-full relative">
    <Navbar />
    <div className='flex justify-center pt-20 md:mt-0 bg-white'>
      <div className="datatable pb-10 mb-10">
      <div className="datatableTitle">
        <p className="text-lg text-gray-900">Your Tasks</p>
        <Link to="/add-task" className="link">
          Add New
        </Link>
      </div>
      {success && (
            <p className="text-green-600 text-center">{success}</p>
          )}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id} 
      />
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default LandingPage;
