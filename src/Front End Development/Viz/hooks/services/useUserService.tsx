import { useNavigate } from "react-router-dom";
import { useAlert } from "../useAlert";
import { FormData } from "../../components/Register";
import { ROUTE_PREFIX } from "../../constants/constants";
import useRole2 from "../useRole2";
import { ResetInfo } from "../../components/ResetPassword";
import { UsersType } from "../../contexts/Role2Context";
import { User } from "../../contexts/AuthContext";

const useUserService = () => {
  const navigate = useNavigate();
  const { setAlert, hideAlert } = useAlert();
  const { users, setUsers } = useRole2();

  async function getUsers(): Promise<UsersType[]> {
    return users.sort((userA, userB) => userA.userId - userB.userId);
  }

  const register = async (data: FormData) => {
    hideAlert();
    setTimeout(() => {}, 1000);
    const { email, password, username } = data;

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setAlert("User with that email already exists");
      return;
    }

    const userId = users.reduce(
      (accumulator, user) => Math.max(accumulator, user.userId + 1),
      1
    );
    const newUser: User = {
      email,
      password,
      username,
      userId,
      role: 1,
    };
    if (users.length === 0) newUser.role = 2;
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    setAlert("Account Created", "success");
    navigate(`${ROUTE_PREFIX}/login`);
  };

  async function changeAccess(isAdmin: boolean, userId: number, email: string) {
    const role = isAdmin ? 2 : 1;
    hideAlert();

    const newUsers = users.map((usr) => {
      if (usr.userId === userId) {
        return { ...usr, role };
      }
      return usr;
    });

    setUsers(newUsers);
    if (isAdmin === true) {
      setAlert(`Admin permissions given to ${email}`, "success");
    } else {
      setAlert(`Removed permissions from ${email}`, "success");
    }
  }

  async function resetPassword(resetInfo: ResetInfo) {
    hideAlert();
    const { email, username, password } = resetInfo;
    const user = users.find((usr) => usr.email === email);
    if (!user) return setAlert("Account doesn't exist");

    if (user.username !== username) return setAlert("Account doesn't exist");

    const updatedUsers = users.map((usr) => {
      if (usr.username === username) {
        return { ...usr, password };
      }
      return usr;
    });
    setUsers(updatedUsers);
    setAlert("Password Changed", "success");
    navigate(`${ROUTE_PREFIX}/login`);
  }

  return { getUsers, register, changeAccess, resetPassword };
};

export default useUserService;
