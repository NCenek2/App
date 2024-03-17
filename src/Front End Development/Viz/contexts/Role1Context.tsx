import { ReactNode, createContext } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ReportType } from "../hooks/services/useReportService";

export type CurrentCycleType = {
  cycleId: number;
  startDate: string;
};

export type CycleType = {
  cycleId: number;
  startDate: string;
};

type Role1State = {
  cycles: CycleType[];
  currentCycle: CurrentCycleType;
  reports: ReportType[];
};

const initialRole1State: Role1State = {
  cycles: [],
  currentCycle: { cycleId: 0, startDate: "" },
  reports: [],
};

const useRole1Context = () => {
  const [cycles, setCycles] = useLocalStorage<CycleType[]>("viz-cycles", []);
  const [currentCycle, setCurrentCycle] = useLocalStorage<CurrentCycleType>(
    "viz-current-cycle",
    { cycleId: 0, startDate: "" }
  );
  const [reports, setReports] = useLocalStorage<ReportType[]>(
    "viz-reports",
    []
  );

  async function refreshRole1() {}

  return {
    cycles,
    setCycles,
    currentCycle,
    setCurrentCycle,
    refreshRole1,
    reports,
    setReports,
  };
};

export type UseRole1ContextType = ReturnType<typeof useRole1Context>;

const initialRole1ContextType: UseRole1ContextType = {
  cycles: initialRole1State.cycles,
  setCycles: () => {},
  currentCycle: initialRole1State.currentCycle,
  setCurrentCycle: () => {},
  refreshRole1: async () => {},
  reports: [],
  setReports: () => {},
};

export const Role1Context = createContext<UseRole1ContextType>(
  initialRole1ContextType
);

type ChildrenType = {
  children?: ReactNode | ReactNode[];
};

export const Role1Provider = ({ children }: ChildrenType) => {
  return (
    <Role1Context.Provider value={useRole1Context()}>
      {children}
    </Role1Context.Provider>
  );
};
