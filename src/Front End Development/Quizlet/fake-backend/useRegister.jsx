import useLocalStorage from "../../../hooks/useLocalStorage";
import DBError from "../misc/DBError";

const useRegister = () => {
  const [users, setUsers] = useLocalStorage("users", []);

  const register = ({ email, password }) => {
    if (!email || !password) {
      let error = new DBError("Bad Request", {
        status: 400,
        message: "Bad Request",
      });
      throw error;
    }

    const foundUser = users.filter((usr) => usr.email === email);
    if (foundUser.length) {
      let error = new DBError("User with that email already exists!", {
        status: 409,
        message: "User with that email already exists!",
      });
      throw error;
    }

    setUsers([...users, { email, password }]);
    return { status: 201 };
  };

  return register;
};

export default useRegister;
