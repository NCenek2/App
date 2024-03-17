import { FilteredUser } from "../../components/authenticated/role2/Dashboard/Dashboard";
import { DashboardResultsType } from "../../contexts/DashboardResultsContext";
import { CycleType } from "../../contexts/Role1Context";
import { UserMetricType } from "../../contexts/Role2Context";
import { useAlert } from "../useAlert";
import { useCreateCycle } from "../useCreateCycle";
import useDashboardResults from "../useDashboardResults";
import useRole1 from "../useRole1";
import useRole2 from "../useRole2";

type RankingData = {
  email: string;
  startDate: string;
  value: number;
  weight: number;
  threshold: number;
};

type RankingObj = {
  [key: string]: Ranking;
};

export type Ranking = {
  email: string;
  score: number;
};

type UseUpdateDashboardResults = {
  updated: DashboardResultsType[];
};

const useUserMetricService = () => {
  const { users, metricCriteria, userMetrics, setUserMetrics, metrics } =
    useRole2();
  const { cycles, currentCycle } = useRole1();
  const { state } = useCreateCycle();
  const { setAlert, hideAlert } = useAlert();
  const { refreshDashboard } = useDashboardResults();

  async function getCycleUsers(cycleId: number): Promise<FilteredUser[]> {
    const userIdSet = userMetrics.reduce((acc: Set<number>, userMetric) => {
      if (userMetric.cycleId === cycleId) {
        acc.add(userMetric.userId);
      }

      return acc;
    }, new Set<number>());

    const cycleUsers: FilteredUser[] = users
      .filter((user) => userIdSet.has(user.userId))
      .map((user) => {
        const { userId, email } = user;
        return { userId, email };
      });

    if (!cycleUsers.length) {
      setAlert("Cycle doesn't have any users", "warning");
      return [];
    }
    cycleUsers.sort((userA, userB) => userA.userId - userB.userId);
    return cycleUsers;
  }

  async function getUserCycles(userId: number): Promise<CycleType[]> {
    if (!userId) return [];

    const cycleIdSet = userMetrics.reduce((acc: Set<number>, userMetric) => {
      if (userMetric.userId === userId) {
        acc.add(userMetric.cycleId);
      }

      return acc;
    }, new Set<number>());

    let userCycles: CycleType[] = cycles.filter((cycle) =>
      cycleIdSet.has(cycle.cycleId)
    );

    if (!userCycles.length) {
      setAlert("User is not in any cycles", "warning");
      return [];
    }

    userCycles.sort((cycleA, cycleB) => {
      return (
        new Date(cycleB.startDate).getTime() -
        new Date(cycleA.startDate).getTime()
      );
    });

    userCycles = userCycles.map((cycle) => {
      return {
        ...cycle,
        startDate: new Date(cycle.startDate).toDateString(),
      };
    });

    return userCycles;
  }

  async function getCycleUserMetrics(
    userId: number,
    cycleId: number
  ): Promise<DashboardResultsType[]> {
    if (cycleId === 0) {
      if (currentCycle?.cycleId) {
        cycleId = currentCycle.cycleId ?? cycleId;
      }
    }

    if (cycleId === 0) return [];

    const dashboardMetrics: UserMetricType[] = userMetrics.reduce(
      (acc: UserMetricType[], userMetric) => {
        if (userMetric.userId === userId && userMetric.cycleId === cycleId) {
          acc.push(userMetric);
        }
        return acc;
      },
      []
    );

    const userCycleMetricsData: DashboardResultsType[] =
      dashboardMetrics.reduce(
        (acc: DashboardResultsType[], dashboardMetric) => {
          const { cycleId, metricId, metricCriterionId, value, userMetricId } =
            dashboardMetric;

          const cycle = cycles.find((cyc) => cyc.cycleId === cycleId);
          const met = metrics.find((metric) => metric.metricId === metricId);
          const metCrit = metricCriteria.find(
            (meCr) => meCr.metricCriterionId === metricCriterionId
          );

          if (cycle && met && metCrit) {
            const { metricName, metricUnit } = met;
            const { startDate } = cycle;
            const { threshold, weight } = metCrit;

            acc.push({
              userMetricId,
              userMetricValue: value,
              metricId,
              metricName,
              metricUnit,
              startDate,
              weight,
              threshold,
            });
          }

          return acc;
        },
        []
      );
    userCycleMetricsData.sort(
      (metricA, metricsB) => metricA.metricId - metricsB.metricId
    );

    if (!userCycleMetricsData.length) {
      setAlert("Could not get user metrics");
      return [];
    }

    return userCycleMetricsData;
  }

  async function getRankings(): Promise<Ranking[]> {
    const { cycleId } = currentCycle;
    let currentCycleId: number = cycleId;

    if (currentCycle.cycleId === 0) return [];

    const currentCycleMetrics = userMetrics.filter(
      (usrMetric) => usrMetric.cycleId === currentCycleId
    );

    const rankingData: RankingData[] = currentCycleMetrics.reduce(
      (acc: RankingData[], usrMetric: UserMetricType) => {
        const user = users.find((usr) => usr.userId === usrMetric.userId);
        const metricCriterion = metricCriteria.find(
          (criterion) =>
            criterion.metricCriterionId === usrMetric.metricCriterionId
        );
        const cycle = cycles.find((cyc) => cyc.cycleId === usrMetric.cycleId);

        if (user && metricCriterion && cycle) {
          const { value } = usrMetric;
          const { email } = user;
          const { threshold, weight } = metricCriterion;
          const { startDate } = cycle;

          const newMetricData = { value, startDate, weight, threshold, email };

          acc.push(newMetricData);
        }

        return acc;
      },
      []
    );

    let rankingObj: RankingObj = {};
    for (let data of rankingData) {
      const { email, value, weight, threshold } = data;

      if (!(email in rankingObj)) {
        rankingObj[email] = {
          email,
          score: 0,
        };
      }
      let currentSum = (value / threshold) * weight;
      rankingObj[email].score += currentSum;
    }

    const sortedRanks = Object.values(rankingObj).sort(
      (rankingA, rankingB) => rankingB.score - rankingA.score
    );

    console.log(sortedRanks);

    return sortedRanks;
  }

  async function createUserCycleMetrics(
    criteriaData: number[],
    cycle: CycleType
  ) {
    const { users: userIdSet, criteria } = state;

    const metricItems = criteria.map((criterion, index) => {
      const { metricId } = criterion;
      const metricCriterionId = criteriaData[index];
      return { metricId, metricCriterionId };
    });

    const cycleUsers = users.filter((usr) => userIdSet.has(usr.userId));
    const { cycleId } = cycle;

    const newUserMetrics: UserMetricType[] = [...userMetrics];
    for (let user of cycleUsers) {
      const { userId } = user;

      for (let metricItem of metricItems) {
        const { metricCriterionId, metricId } = metricItem;
        const userMetricId = newUserMetrics.reduce(
          (accumulator, usrMetric) =>
            Math.max(accumulator, usrMetric.userMetricId + 1),
          1
        );
        const newUserMetric: UserMetricType = {
          userMetricId,
          metricCriterionId,
          metricId,
          cycleId,
          userId,
          value: 0,
        };
        newUserMetrics.push(newUserMetric);
      }
    }

    setUserMetrics(newUserMetrics);
  }

  async function updateDashboardUserMetrics({
    updated,
  }: UseUpdateDashboardResults) {
    hideAlert();

    if (updated.length > 0) {
      const newUserMetrics = userMetrics.map((userMetric) => {
        const updatedMetric = updated.find(
          (upd) => upd.userMetricId === userMetric.userMetricId
        );
        if (updatedMetric) {
          return { ...userMetric, value: updatedMetric.userMetricValue };
        }
        return userMetric;
      });
      setUserMetrics(newUserMetrics);
      setAlert("Metrics Updated", "success");
      refreshDashboard();
    }
  }

  return {
    getRankings,
    getCycleUsers,
    getUserCycles,
    getCycleUserMetrics,
    createUserCycleMetrics,
    updateDashboardUserMetrics,
  };
};

export default useUserMetricService;
