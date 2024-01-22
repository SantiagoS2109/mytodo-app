import { useState } from "react";
import Button from "../ui/Button";
import { registerUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  const user = useSelector((state) => state.user.username);

  return (
    <main className="h-dvh">
      <div className="mx-auto max-w-3xl pt-[12rem]">
        <div className="px-4 text-center">
          <h1 className="mb-4 text-7xl font-bold">
            <span className="text-primary">my</span>ToD
            <span className="text-[48px] ">🎯</span>
          </h1>

          {user && (
            <p className="mb-8 mt-8 font-medium">
              Bienvenido de vuelta, {user}
            </p>
          )}

          {!user && (
            <form onSubmit={handleSubmit} className=" items-center">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-8 h-12 w-72 rounded-md bg-grey px-4 py-2 shadow-inner outline-none ring-offset-2 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-opacity-50 md:w-96"
                type="text"
                placeholder="Ingresa tu nombre"
              />

              {username !== "" && (
                <div>
                  <Button className="rounded-xl bg-primary px-6 py-3 text-xl font-medium text-white  hover:bg-primary-darker">
                    Entrar
                  </Button>
                </div>
              )}
            </form>
          )}

          {user && (
            <Button
              className="rounded-xl bg-primary px-6 py-3 text-xl font-medium text-white  hover:bg-primary-darker"
              to={"/app"}
            >
              Entrar
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Homepage;
