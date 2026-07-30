import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      console.log("Submitting:", data);

      const res = await api.post("/auth/login", data);

      console.log("Login Response:", res.data);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");

      console.log("Navigating to Dashboard...");

      navigate("/dashboard");

    } catch (error: any) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
      }

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900">

      <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 via-yellow-400 via-green-500 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
        Mini ERP CRM 🚀
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-xl p-8 mt-10 w-[380px]"
      >

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded mb-4"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;