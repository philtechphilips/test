import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Welcome To My Todo</h1>
            <Link to='/tasks' className="mt-2 px-10 py-2 bg-blue-900 text-white hover:bg-slate-800" >Get Started</Link>
    </div>
  )
}

export default MainPage