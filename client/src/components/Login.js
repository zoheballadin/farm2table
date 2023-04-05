import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Login = () => {

    let navigate = useNavigate()
    let [user, setUser] = useState({
        email: "",
        password: "",
      });

      const onSubmit = async (e) => {
        try {
          e.preventDefault();
          let { data } = await axios.post("/api/user/login", user);
          console.log(data);
          let tokenData = {
            token: data.token,
            role: data.role,
          };
          localStorage.setItem("token", JSON.stringify(tokenData));
          if (data.role == "buyer") {
            return navigate("/home");
          } else if (data.role == "seller") {
            return navigate("/homeadmin");
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.log(error)
        }
      };

    const onChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-300 to-fuchsia-600 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto md:w-5/12">
        <div className="absolute  inset-0 bg-gradient-to-r from-amber-50 to-amber-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl "></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 ">
          <div className="max-w-md mx-auto ">
            <div>
              <h1 className="text-3xl font-semibold text-center mb-2 -mt-6">Login </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-md sm:leading-7">
                <div className="relative">
                  <input
                  onChange={onChange}
                    value={user.email}
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer rounded-sm text-md  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email"
                  />
                  {/* <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label> */}
                </div>
                <div className="relative">
                  <input
                  value={user.password}
                  onChange={onChange}
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer text-md rounded-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 "
                    placeholder="Password"
                  />
                  {/* <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label> */}
                </div>

                <div className="relative">
                  <button type="submit" onClick={onSubmit} className="bg-fuchsia-600 hover:bg-sky-500 ml-44 mt-3 -mb-28 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
