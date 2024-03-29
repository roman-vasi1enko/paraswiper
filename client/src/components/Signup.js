import React, {useState} from 'react'
import axios from 'axios'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';


  function SignUp() {
    const host = process.env.NODE_ENV === 'production' ? 'https://paraswiper.com' : 'http://localhost:5000';

    const navigate = useNavigate();
  
    const [msg, setMsg] = React.useState({
      text: '',
      success: false,
    });
    const [clearMsg, setClearMsg] = React.useState(false);
  
    React.useEffect(() => {
      const clear = setTimeout(() => {
        setMsg({
          text: '',
          success: false,
        });
      }, 4000);
  
      return () => clearTimeout(clear);
    }, [clearMsg]);
  
    const [signUpData, setSignUpData] = React.useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    function handleFormChange(event) {
      const { name, value, type, checked } = event.target;
      setSignUpData(prevSignUpData => ({
        ...prevSignUpData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  
    const handleSubmit = async event => {
      event.preventDefault();
      // console.log(signUpData, 'Sign Up Attempt Sent');
      try {
        const response = await axios({
          method: 'POST',
          data: {
            email: signUpData.email,
            password: signUpData.password,
            confirmPassword: signUpData.confirmPassword,
          },
          url: `${host}/signup`,
          withCredentials: true,
        });
        // console.log('From Server:', response);
        setMsg(
          {
            text: response.data.message.msgBody,
            success: true,
          },
          setClearMsg(!clearMsg)
        );
        navigate('/wizard');
      } catch (err) {
        setMsg(
          {
            text: err.response.data.message.msgBody,
            success: false,
          },
          setClearMsg(!clearMsg)
        );
      }
    };

return (
  <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}> 
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleFormChange}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleFormChange}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleFormChange}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
            
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign up
            </button>
          </div>
        </form>
        <div
					className={
						msg.success ? 'text-success text-center' : 'text-error text-center'
					}
				>
					{msg ? msg.text : ''}
				</div>
      </div>
    </div>
  </>
)
}

export default SignUp