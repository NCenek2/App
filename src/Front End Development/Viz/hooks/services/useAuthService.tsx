import { LoginInfo } from "../../components/Login";
import { useAlert } from "../useAlert";
import { useLocation, useNavigate } from "react-router";
import { ROUTE_PREFIX } from "../../constants/constants";
import { AuthState } from "../../contexts/AuthContext";
import useAuth from "../useAuth";
import useRole2 from "../useRole2";

const useAuthService = () => {
  const { users } = useRole2();
  const { setAlert, hideAlert } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const from = location?.state?.from?.pathname || `${ROUTE_PREFIX}/rankings`;

  const login = async (loginInfo: LoginInfo) => {
    hideAlert();
    setTimeout(() => {}, 1000);
    const { email, password } = loginInfo;
    const user = users.find((usr) => usr.email === email);
    if (!user) return setAlert("Unauthorized");

    if (user.password !== password) return setAlert("Unauthorized");
    const authState: AuthState = {
      userInfo: { ...user },
      accessToken: "TOKEN",
    };
    setAuth(authState);
    navigate(from, { replace: true });
  };

  return { login };
};

export default useAuthService;
