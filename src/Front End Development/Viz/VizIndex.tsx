import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import { Route, Routes } from "react-router-dom";
import VizApp from "./VizApp";
import { Role1Provider } from "./contexts/Role1Context";
import { Role2Provider } from "./contexts/Role2Context";
const VizIndex = () => {
  return (
    <AlertProvider>
      <AuthProvider>
        <Role1Provider>
          <Role2Provider>
            <Routes>
              <Route path="/*" element={<VizApp />} />
            </Routes>
          </Role2Provider>
        </Role1Provider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default VizIndex;
