import { CycleType } from "../../contexts/Role1Context";
import { useCreateCycle } from "../useCreateCycle";
import useRole1 from "../useRole1";
import useRole2 from "../useRole2";

const useCycleService = () => {
  const { state } = useCreateCycle();
  const { cycles, setCycles, setCurrentCycle } = useRole1();
  const { userMetrics } = useRole2();

  async function getCycles() {
    let cyclesData: CycleType[] = cycles.sort((cycleA, cycleB) => {
      return (
        new Date(cycleB.startDate).getTime() -
        new Date(cycleA.startDate).getTime()
      );
    });

    cyclesData = cyclesData.map((cycle) => {
      return {
        ...cycle,
        startDate: new Date(cycle.startDate).toDateString(),
      };
    });
    return cyclesData;
  }

  async function createCycle(): Promise<CycleType> {
    const { startDate } = state;
    const cycle = cycles.find((cycle) => cycle.startDate === startDate);

    if (!cycle) {
      const cycleId = cycles.reduce(
        (accumulator, cycle) => Math.max(accumulator, cycle.cycleId + 1),
        1
      );
      const newCycle = { startDate, cycleId };
      setCycles([...cycles, newCycle]);

      if (!cycles.length) {
        setCurrentCycle(newCycle);
      }

      return newCycle;
    }

    const usrMetric = userMetrics.find(
      (usrMetric) => usrMetric.cycleId === cycle.cycleId
    );
    
    if (usrMetric) {
      return { cycleId: 0, startDate: "" };
    }

    return cycle;
  }

  return { getCycles, createCycle };
};

export default useCycleService;
