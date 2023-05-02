import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import Login from "./auth/Login"
import Register from "./auth/Register"
import AuthLayout from "./layout/AuthLayout"
import GuestLayout from "./layout/GuestLayout"
import AddTask from "./main/AddTask"
import EditTask from "./main/EditTask"
import Profile from "./main/Profile"
import MainPage from "./MainPage"

function App() {

  return (
    <>
      <div className="w-screen h-screen">
      <Routes>
        <Route path='/' element={<MainPage />} ></Route>
      <Route element={<AuthLayout />}>
            <Route exact path="/tasks" element={<LandingPage />}></Route>
            <Route path="/add-task" element={<AddTask />}></Route>
            <Route path="/edit-task/:id" element={<EditTask />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create-account" element={<Register />}></Route>
            </Route>
        </Routes>
       </div>
    </>
  )
}

export default App
