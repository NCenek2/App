import { ReactNode, createContext } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { User } from "./AuthContext";
import { UserReportType } from "../components/authenticated/role2/UserReports/UserReport";

export type UsersType = User;

export type MetricsType = {
  metricId: number;
  metricName: string;
  metricUnit: string;
};

export type UserMetricType = {
  userMetricId: number;
  value: number;
  metricId: number;
  userId: number;
  cycleId: number;
  metricCriterionId: number;
};

export type MetricCriterionType = {
  metricCriterionId: number;
  weight: number;
  threshold: number;
};

const useRole2Context = () => {
  const [users, setUsers] = useLocalStorage<User[]>("viz-users", []);
  const [metrics, setMetrics] = useLocalStorage<MetricsType[]>(
    "viz-metrics",
    []
  );

  const [userMetrics, setUserMetrics] = useLocalStorage<UserMetricType[]>(
    "viz-user-metrics",
    []
  );
  const [metricCriteria, setMetricCriteria] = useLocalStorage<
    MetricCriterionType[]
  >("viz-metric-criteria", []);
  const [reports, setReports] = useLocalStorage<UserReportType[]>(
    "viz-reports",
    []
  );

  async function refreshRole2() {}

  return {
    users,
    setUsers,
    metrics,
    setMetrics,
    refreshRole2,
    userMetrics,
    setUserMetrics,
    metricCriteria,
    setMetricCriteria,
    reports,
    setReports,
  };
};

export type UseRole2ContextType = ReturnType<typeof useRole2Context>;

const initialRole2ContextType: UseRole2ContextType = {
  users: [],
  setUsers: () => {},
  metrics: [],
  setMetrics: () => {},
  refreshRole2: async () => {},
  userMetrics: [],
  setUserMetrics: () => {},
  metricCriteria: [],
  setMetricCriteria: () => {},
  reports: [],
  setReports: () => {},
};

export const Role2Context = createContext<UseRole2ContextType>(
  initialRole2ContextType
);

type ChildrenType = {
  children?: ReactNode | ReactNode[];
};

export const Role2Provider = ({ children }: ChildrenType) => {
  return (
    <Role2Context.Provider value={useRole2Context()}>
      {children}
    </Role2Context.Provider>
  );
};
