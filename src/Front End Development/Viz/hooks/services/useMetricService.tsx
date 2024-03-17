import { MetricsType } from "../../contexts/Role2Context";
import { useAlert } from "../useAlert";
import useRole2 from "../useRole2";

const useMetricService = () => {
  const { setAlert } = useAlert();
  const { metrics, setMetrics } = useRole2();

  async function getMetrics() {
    return metrics.sort(
      (metricA, metricB) => metricA.metricId - metricB.metricId
    );
  }

  async function createMetric(metricName: string, metricUnit: string) {
    const metricId = metrics.reduce(
      (accumulator, metric) => Math.max(accumulator, metric.metricId + 1),
      1
    );

    const newMetric: MetricsType = {
      metricId,
      metricName,
      metricUnit,
    };

    setMetrics([...metrics, newMetric]);
    setAlert("New Metric Created", "success");
  }

  return { getMetrics, createMetric };
};

export default useMetricService;
