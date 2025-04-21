import { useEffect } from "react";
import { Link } from "react-router-dom"

const Error = () => {

    useEffect (() => {
        document.body.classList.add("errormt");
        return  () => {
          document.body.classList.remove('errormt');
        }
    }, [])
    
   return (
    <div className=" error-mt min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 text-white text-center p-0 m-0">
      <div className="p-0 m-[-4]">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg mb-2">This page doesn’t exist...</p>
        <Link
          to="/"
          className="text-purple-400 underline hover:text-purple-300 transition"
        >
          Jump back to the dashboard
        </Link>
      </div>
    </div>
  );
}

export default Error