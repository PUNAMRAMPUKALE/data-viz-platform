import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Handles the Google sign-in process using Firebase Auth
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Launch Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // On success, log user info and navigate to dashboard
      console.log("Login success:", result.user);
      navigate("/dashboard");
    } catch (error) {
      // Log any authentication errors
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-2xl px-10 py-12 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-lime-400">Welcome Back</h1>
        <p className="mb-8 text-gray-400 text-sm">
          Sign in to access your dashboard and continue where you left off.
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-[#C9FF3B] text-black font-semibold px-6 py-3 rounded-md shadow-[0_0_6px_#C9FF3B] hover:brightness-105 transition duration-200"
        >
          <img
            src="/assets/google-icon.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
