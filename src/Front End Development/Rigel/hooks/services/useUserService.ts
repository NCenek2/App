import { useNavigate } from "react-router";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useAlert } from "../useAlert";
import { ROUTE_PREFIX } from "../../constants";

type User = {
  user_id: number;
  password: string;
  email: string;
};

const useUserService = () => {
  const [users, setUsers] = useLocalStorage<User[]>("users", []);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const register = async (email: string, password: string) => {
    setTimeout(() => null, 1000);
    if (!email || !password) {
      setAlert("Bad Request");
      return;
    }

    const foundUser = users.filter((usr) => usr.email === email);
    if (foundUser.length) {
      setAlert("User with that email already exists!");
      return;
    }

    const user_id =
      users.reduce(
        (accumulator, usr) => Math.max(usr.user_id, accumulator),
        0
      ) + 1 || 0;

    setUsers([...users, { email, password, user_id }]);
    navigate(`${ROUTE_PREFIX}/login`);
    return;
  };
  return { register };
};

export default useUserService;
