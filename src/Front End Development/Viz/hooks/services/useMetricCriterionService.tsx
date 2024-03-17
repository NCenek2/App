import { MetricCriterionType } from "../../contexts/Role2Context";
import { useCreateCycle } from "../useCreateCycle";
import useRole2 from "../useRole2";

const useMetricCriterionService = () => {
  const { state } = useCreateCycle();
  const { metricCriteria, setMetricCriteria } = useRole2();

  async function getCycleCriteria(): Promise<number[]> {
    const { criteria } = state;

    let cycleCriteriaIds = [];
    let newMetricsCriteria = [...metricCriteria];
    for (let criterion of criteria) {
      const metricCriterion = newMetricsCriteria.find(
        (metCrit) =>
          metCrit.weight === criterion.weight &&
          metCrit.threshold === criterion.threshold
      );

      if (!metricCriterion) {
        const metricCriterionId = newMetricsCriteria.reduce(
          (accumulator, mc) => Math.max(accumulator, mc.metricCriterionId + 1),
          1
        );
        const newMetricCriterion: MetricCriterionType = {
          metricCriterionId,
          threshold: criterion.threshold,
          weight: criterion.weight,
        };
        newMetricsCriteria.push(newMetricCriterion);
        cycleCriteriaIds.push(metricCriterionId);
      } else {
        cycleCriteriaIds.push(metricCriterion.metricCriterionId);
      }
    }
    setMetricCriteria(newMetricsCriteria);
    return cycleCriteriaIds;
  }
  return { getCycleCriteria };
};

export default useMetricCriterionService;
