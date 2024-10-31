import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mx-8">
      <div className="flex flex-row justify-center gap-4 mb-4">
        <img
          src="https://pbs.twimg.com/media/EVBaafBWkAEQ3AS?format=jpg&name=4096x4096"
          alt="Login Banner"
          className="w-1/3 h-auto animate-fadeInScale"
        />
        <img
          src="https://www.daelken.de/fileadmin/_processed_/d/d/csm_EP02967_004_website_1_89f481c16a.jpg"
          alt="Additional Image 1"
          className="w-1/3 h-auto animate-fadeInScale"
        />
        <img
          src="https://i.pcmag.com/imagery/articles/00z6fkQp8OxqLl2AaKK7Pvn-5.fit_lim.size_1200x630.v1578534168.jpg"
          alt="Additional Image 2"
          className="w-1/3 h-auto animate-fadeInScale"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2 text-blue-500 font-playfair text-center animate__animated animate__fadeInDown hover:animate-pop hover:text-pink-500 transition-all duration-300">
        Welcome to SEBN Sumitomo Electric Bordnetze
      </h1>
      <p className="text-lg text-purple-600 mb-4 text-center max-w-xl animate__animated animate__fadeInUp hover:animate-pop hover:text-pink-500 transition-all duration-300">
        We are thrilled to have you join us at SEBN Sumitomo Brodnetze Electric, where innovation meets excellence in the electrical industry. Our commitment to quality and sustainability drives us to deliver cutting-edge solutions that empower businesses and communities alike.
      </p>
      <section className="flex flex-col items-center">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Let's Get You Signed In!</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-pink-450">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease forwards;
        }

        @keyframes pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .hover\\:animate-pop:hover {
          animation: pop 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Login;