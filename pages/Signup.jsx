import React,{useState} from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { createAccount } from '../Redux/Slices/AuthSlice';
import {useDispatch} from 'react-redux'
import {useNavigate,Link} from "react-router-dom"
export default function Signup() {
    const [previewImage,setPreviewImage] = useState("")
  const [signupData,setSignupData] = useState({
    profilePic:'',
    userName:'',
    email:'',
    password:''
  })
const dispatch = useDispatch();
const navigate = useNavigate()
function handleInput(e){
 const {name,value} = e.target;
 setSignupData({
  ...signupData,
  [name]:value
 })
}
    function getImage(event){
        event.preventDefault()
        const uploadImage = event.target.files[0]
      
        if(uploadImage){
          setSignupData({
            ...signupData,
            profilePic:uploadImage

          })
const fileReader = new FileReader()
fileReader.readAsDataURL(uploadImage)
fileReader.addEventListener("load",function(){
    setPreviewImage(this.result)
})
        }
    }

    async function createNewAccount(event){
      event.preventDefault()

      const formData = new FormData();
      formData.append("profilePic",signupData.profilePic);
      formData.append("userName",signupData.userName);
      formData.append("password",signupData.password)
      formData.append("email",signupData.email)

      const response = await dispatch(createAccount(formData))
      if(response?.payload?.success){
        navigate("/")
        
      }
    }
  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src=""
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Signup  to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={createNewAccount} className="space-y-6">
            <div>
                <label htmlFor="profilePic" className='cursor-pointer'>
                   {previewImage?(<img src={previewImage} className='rounded-full m-auto w-24 h-24'/>): <BsPersonCircle className='w-24 h-24 m-auto'/>}
                </label>
            </div>
            <div>
                <input type="file" id="profilePic" name="profilePic" className='hidden' onChange={getImage}  />
            </div>
            <div>
              <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={handleInput}
                  value={signupData.userName}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleInput}
                  value={signupData.email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                 onChange={handleInput}
                 value={signupData.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a  member?{' '}
            <Link to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
