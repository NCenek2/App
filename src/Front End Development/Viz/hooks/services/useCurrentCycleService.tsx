import { useAlert } from "../useAlert";
import useDashboard from "../useDashboard";
import useRole1 from "../useRole1";

const useCurrentCycleService = () => {
  const { setAlert } = useAlert();
  const { refreshRole1 } = useRole1();
  const { selectedCycle } = useDashboard();
  const { currentCycle, setCurrentCycle, cycles } = useRole1();
  async function getCurrentCycle() {
    const { cycleId } = currentCycle;
    if (cycleId === 0) return { cycleId: 0, startDate: "" };
    return { currentCycle };
  }

  async function changeCurrentCycle() {
    const cycleId = selectedCycle;
    if (!cycleId || cycleId == 0 || cycleId == currentCycle.cycleId) return;

    const newCycle = cycles.find((cycle) => cycleId === cycle.cycleId);
    if (!newCycle) {
      return setAlert("Cycle with that id does not exist");
    }
    setCurrentCycle(newCycle);
    setAlert("Current Cycle Updated", "success");
    await refreshRole1();
  }

  return { getCurrentCycle, changeCurrentCycle };
};

export default useCurrentCycleService;
