import useAuth from "../useAuth";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import { ROUTE_PREFIX } from "../../constants";

type User = {
  user_id: number;
  password: string;
  email: string;
};

type LoginType = {
  email: string;
  password: string;
};

const useAuthService = () => {
  const [users, _] = useLocalStorage<User[]>("users", []);
  const { setAuth } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const login = async ({ email, password }: LoginType) => {
    setTimeout(() => null, 1000);

    if (!email || !password) {
      setAlert("Bad Request");
      return;
    }

    const foundUser = users.filter((usr) => usr.email === email);

    if (!foundUser.length) {
      setAlert("Unauthorized");
      return;
    }

    if (foundUser[0].password !== password) {
      setAlert("Unauthorized");
      return;
    }

    setAuth("TOKEN");
    navigate(`${ROUTE_PREFIX}/main`);
    return;
  };

  const bypassLogin = async () => {
    setTimeout(() => null, 1000);
    navigate(`${ROUTE_PREFIX}/main`);
    setAuth("TOKEN");
    return;
  };

  return { login, bypassLogin };
};

export default useAuthService;
