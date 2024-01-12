import { useState } from "react";
import Button from "../ui/Button";
import { registerUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(registerUser(username));
    navigate("/app");
  }

  return (
    <main className="h-dvh">
      {/* <div className="flex flex-col gap-6 p-4 h-full justify-center items-center"> */}
      <div className="mx-auto pt-[12rem] max-w-3xl">
        <div className="px-4 text-center">
          <h1 className="text-7xl font-bold mb-4">
            <span className="text-primary">my</span>ToD
            <span className="text-[48px] ">🎯</span>
          </h1>

          <form onSubmit={handleSubmit} className=" items-center">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-72 mb-8 py-2 px-4 h-12 rounded-md bg-grey shadow-inner outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ring-offset-2 md:w-96"
              type="text"
              placeholder="Ingresa tu nombre"
            />

            {username !== "" && (
              <div>
                <Button style="bg-primary text-white font-medium text-xl px-6 py-3 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ring-offset-2 rounded-xl hover:bg-primary-darker">
                  Entrar
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
