import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from "yup";

const registerShema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
}

const SignUp = () => {
  const [image, setImage] = useState(null);
  const [show, setShow] = useState("password");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
  })
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

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for(let value in values){
       formData.append(value, values[value])
      }
      formData.append("picture", values.picture.name);
      const saveUserResponse = await fetch(
        "http://localhost:4001/auth/register", 
        {
            method: "POST",
            body: formData,

        }
    );
    const saveUser = await saveUserResponse.json();
    onSubmitProps.resetForm();

    if(saveUser){
        navigate("/home")
    }
  
    } catch (error) {
      console.log("Error", error.message)
    }
  }

  return (
    <Formik 
    onSubmit={handleFormSubmit}
    initialValues={initialValueRegister}
    validationSchema={registerShema}
    >
           {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
       }) => (
    <form 
    onSubmit={handleSubmit}
     className='w-[400px] rounded-md mt-8 m-auto bg-gray-100 p-4'>
    <div>
      <label htmlFor='firstName' className='font-bold'>FirstName</label>
      <input type="text" name='firstName'
      onChange={handleChange}
      value={values.firstName}
      onBlur={handleBlur}
      className='w-[100%] h-[40px] outline-none pl-3'
       />
    </div>
    <div>
      <label htmlFor='lastName' className='font-bold'>Last Name</label>
      <input type="text" name='lastName'
      className='w-[100%] h-[40px] outline-none pl-3'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.lastName}
       />
    </div>
    <div>
      <label htmlFor='location' className='font-bold'>Location</label>
      <input type="text" name='location'
       onChange={handleChange}
       onBlur={handleBlur}
       value={values.location}
      className='w-[100%] h-[40px] outline-none pl-3'
       />
    </div>
    <div>
    <Dropzone
             acceptedFiles=".jpg,.jpeg,.png"
             multiple={false}
             onDrop={(acceptedFiles) => 
                setFieldValue("picture", acceptedFiles[0])
            }
             >
            {({ getRootProps, getInputProps}) => (
                <div
                {...getRootProps()}
              className='p-2 mt-2 border border-[#2A69AD] rounded-sm'
                >
              <input {...getInputProps() } />
              {!values.picture ? (
                <p>Add Picture Here</p>
              ): (
                <div className='flex justify-between'>
                    <span>{values.picture.name}</span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
              )}
                </div>
            )}
             </Dropzone>
    </div>
    <div className='mt-2'>
      <label htmlFor='email' className='font-bold'>E-mail</label>
      <input type="email" name='email'
      className='w-[100%] h-[40px] outline-none pl-3'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
       />
    </div>
    <div>
      <label htmlFor='password' className='font-bold'>Password</label>
    <div className='w-[100%] flex items-center bg-white mt-2 h-[40px] pl-3'>
      <input type={show} name='password'
      className='w-[90%] outline-none'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
       />
    {show === "password" ? (<button onClick={handleShow}><i className="fa-solid fa-eye-slash"></i></button>):
    (<button onClick={handleShow}><i className="fa-solid fa-eye"></i></button>)
    }
    </div>
    </div>
    <button 
    className='bg-green-800 mt-3  p-2 w-[150px] rounded-md font-bold text-white'
    type="submit">Sign Up</button>
    <div className='mt-2'>
     <span className='text-gray-400 cursor-pointer'>
      <Link to="/login">you have account?Log in here</Link>
      </span>
    </div>
    </form>
      )}
    </Formik>
  )
}

export default SignUp