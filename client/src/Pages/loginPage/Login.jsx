import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux"
import { setLogIn } from "../../state/index"
import HomePage from '../homepage';

const LogIn = () => {
  const [show, setShow] = useState("password");
  const [Auth, setAuth] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = (e) => {
     e.preventDefault();
     if(show === "password"){
      setShow("text")
     }else {
      setShow("password")
     }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


 const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.post('http://localhost:4001/auth/login',data)
      .then(function (response) {
        console.log(response.data.token)
      dispatch(
        setLogIn({
          user: response.data.user,
          token: response.data.token,
      })
    )
    console.log(response)
    // setAuth(response.data)
     
      })
      .catch(function (error) {
        console.log(error);
      })
    } catch (error) {
      console.log(error.message)
    }
 }

 return (
  <>
   {Auth === null ? (
      <form  onSubmit={handleSubmit}
      className='w-[400px] rounded-md mt-8 m-auto bg-gray-100 p-4'>
      <div className='mt-2'>
      <label htmlFor='email' className='font-bold'>E-mail</label>
      <input type="email" name='email'
      className='w-[100%] h-[40px] outline-none pl-3'
      onChange={handleChange}
       />
    </div>
    <div>
      <label htmlFor='password' className='font-bold'>Password</label>
    <div className='w-[100%] flex items-center bg-white mt-2 h-[40px] pl-3'>
      <input type={show} name='password'
      className='w-[90%] outline-none'
      onChange={handleChange}
       />
    {show === "password" ? (<button onClick={handleShow}><i className="fa-solid fa-eye-slash"></i></button>):
    (<button onClick={handleShow}><i className="fa-solid fa-eye"></i></button>)
    }
    </div>
    </div>
    <button 
    className='bg-green-800 mt-3  p-2 w-[150px] rounded-md font-bold text-white'
    type="submit">LogIn</button>
        <div className='mt-2'>
       <span className='text-gray-400 cursor-pointer'>
        <Link to="/signup">you don't have account?Sign Up here</Link>
        </span>
      </div>
    </form>
   ) : (<div>
       <HomePage user={Auth.user}  />
   </div>)}
  </>
   )
  }
  
export default LogIn