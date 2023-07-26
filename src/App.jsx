import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import "./assets/style.scss"
import SignUp from "./Components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './Components/Login';
import ChatBox from './Components/ChatBox';
import { auth } from "./firebase";
// import { Navigate } from './firebase';
import { getRedirectResult } from 'firebase/auth';
function App() {
  // const Navigate = useNavigate()
  // getRedirectResult(auth).then(async (result) => {
  //   Navigate ("/Chat", {
  //     state: {
  //       UserName: result?.user?.displayName
  //     }
  //   })
  // }).catch((err) => {
  //   console.log(err);
  // })
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />
    }, {
      path: "/Login",
      element: <Login />
    }, {
      path: "/Chat",
      element: <ChatBox />
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
