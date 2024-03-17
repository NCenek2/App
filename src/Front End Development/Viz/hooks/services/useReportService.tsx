import { initialReport } from "../../components/authenticated/role2/Reports/Report";
import { UserReportType } from "../../components/authenticated/role2/UserReports/UserReport";
import { CycleType } from "../../contexts/Role1Context";
import { useAlert } from "../useAlert";
import useAuth from "../useAuth";
import useDashboard from "../useDashboard";
import useRole1 from "../useRole1";
import useRole2 from "../useRole2";

export type ReportType = {
  report: string;
  cycleId: number;
  userId: number;
  reportId?: number;
  acknowledged: boolean;
};

const useReportService = () => {
  const { setAlert } = useAlert();
  const { selectedCycle, selectedUser } = useDashboard();
  const { auth } = useAuth();
  const { cycles } = useRole1();
  const { reports, setReports } = useRole2();

  async function getReport(): Promise<ReportType> {
    if (!selectedCycle || !selectedUser) return initialReport;

    const report = reports.find(
      (rpt) => rpt.userId === selectedUser && rpt.cycleId === selectedCycle
    );

    if (!report) {
      return {
        ...initialReport,
        reportId: -1,
        userId: selectedUser,
        cycleId: selectedCycle,
      };
    }

    return { ...initialReport, ...report };
  }

  async function getUserReport(): Promise<UserReportType | null> {
    if (!auth) return null;
    if (!auth?.userInfo?.userId) return null;

    const userReport = reports.find(
      (report) =>
        report.userId === auth.userInfo.userId &&
        report.cycleId === selectedCycle
    );

    if (!userReport) {
      setAlert("Report could be returned");
      return null;
    }

    return userReport;
  }

  async function getUserReportCycles() {
    if (!auth?.userInfo?.userId) return [];

    const userReports: UserReportType[] = reports.filter(
      (report) => report.userId === auth.userInfo.userId
    );

    let userCycles: CycleType[] = userReports.reduce(
      (acc: CycleType[], userReport) => {
        const cycle = cycles.find((cyc) => cyc.cycleId === userReport.cycleId);
        if (!cycle) return acc;
        return [...acc, cycle];
      },
      []
    );

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

  async function acknowledgeReport(report: UserReportType | null) {
    if (!report) return;
    const { reportId } = report;
    let { userId } = auth?.userInfo ?? { userId: 0 };
    userId = parseInt(userId as unknown as string);

    const newReports = reports.map((rpt) => {
      if (rpt.reportId === reportId) {
        return { ...rpt, acknowledged: true };
      }
      return rpt;
    });

    setReports(newReports);
    setAlert("Report Acknowledged", "success");
  }

  async function createReport(report: ReportType) {
    const reportId = reports.reduce(
      (accumulator, report) => Math.max(accumulator, report.reportId + 1),
      1
    );

    const currentCycle = cycles.find(
      (cycle) => cycle.cycleId === report.cycleId
    );

    if (!currentCycle) {
      setAlert("Cycle with that id cannot be found");
      return;
    }

    const { startDate } = currentCycle;
    const newReport: UserReportType = {
      ...report,
      startDate,
      acknowledged: false,
      reportId,
    };

    setReports([...reports, newReport]);
    setAlert("Report Created", "success");
  }

  async function updateReport(report: ReportType) {
    const { reportId } = report;
    const newReports = reports.map((rpt) => {
      if (rpt.reportId === reportId) {
        return { ...rpt, report: report.report, acknowledged: false };
      }
      return rpt;
    });

    setReports(newReports);
    setAlert("Report Updated", "success");
  }

  return {
    getReport,
    getUserReport,
    getUserReportCycles,
    acknowledgeReport,
    createReport,
    updateReport,
  };
};

export default useReportService;
