import { useNavigate } from "react-router";
import { useAlert } from "./useAlert";
import { useCreateCycle } from "./useCreateCycle";
import { CycleType } from "../contexts/Role1Context";
import useCycleService from "./services/useCycleService";
import useMetricCriterionService from "./services/useMetricCriterionService";
import useUserMetricService from "./services/useUserMetricService";
import { ROUTE_PREFIX } from "../constants/constants";

const useCreateCycleMetrics = () => {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { dispatch, CREATE_CYCLE_ACTIONS } = useCreateCycle();

  const { createCycle } = useCycleService();
  const { getCycleCriteria } = useMetricCriterionService();
  const { createUserCycleMetrics } = useUserMetricService();

  const createCycleData = async () => {
    const newCycleData: CycleType = await createCycle();
    if (newCycleData.cycleId === 0) {
      setAlert(`Cycle with current date already exists`);
      return;
    }

    const criteriaData: number[] = await getCycleCriteria();
    await createUserCycleMetrics(criteriaData, newCycleData);

    dispatch({ type: CREATE_CYCLE_ACTIONS.CREATE });
    setAlert("Cycle Created", "success");
    navigate(`${ROUTE_PREFIX}/rankings`);
  };

  return createCycleData;
};

export default useCreateCycleMetrics;
