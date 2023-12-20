import useLocalStorage from "../../../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";
import DBError from "../misc/DBError";

const useLogin = () => {
  const [users, setUsers] = useLocalStorage("users", []);
  const { setAuth } = useAuth();

  const login = async ({ email, password }) => {
    setTimeout(() => null, 1000);
    if (!email || !password) {
      let error = new DBError("Bad Request", {
        status: 400,
        message: "Bad Request",
      });
      throw error;
    }

    const foundUser = users.filter((usr) => usr.email === email);

    if (!foundUser.length) {
      let error = new DBError("Unauthorized", {
        status: 401,
        message: "Unauthorized",
      });
      throw error;
    }

    if (foundUser[0].password !== password) {
      let error = new DBError("Unauthorized", {
        status: 401,
        message: "Unauthorized",
      });
      throw error;
    }

    setAuth("TOKEN");
    return { status: 200 };
  };

  return login;
};

export default useLogin;
