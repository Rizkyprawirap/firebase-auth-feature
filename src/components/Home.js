import { useState } from "react";
import { useAuth } from "../context/authContext"
import Alert from "./Alert";

export default function Home() {

  const {user, logout, loading} = useAuth();
  const [error, setError] = useState("");

  // console.log(user)

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  }

  if(loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
    {error && <Alert  message={error}/>}
      <div className="w-full max-w-xs m-auto text-black">
        <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl mb-4">Welcome {user.displayName || user.email}</h1>
          <button
            onClick={handleLogout}
            className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black'>
            logout
          </button>
        </div>
      </div>

    </>
  );
}
