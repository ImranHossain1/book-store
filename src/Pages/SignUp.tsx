import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    dispatch(createUser({ email: email, password: password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user.email, isLoading]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content md:w-8/12">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:p-4">
          <div className="card-body">
            <h1 className="font-bold text-center uppercase text-2xl text-red-600">
              Sign up
            </h1>
            <form onSubmit={handleCreateUser}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email" // Corrected from "name=email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password" // Corrected from "name=paasword"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  {/* Add error message logic here */}
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-red-500 hover:bg-red-600 text-white font-semibold">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
