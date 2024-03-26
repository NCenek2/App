import "./LoadingBar.css";

type LoadingBarProps = {
  percentage: number;
};

const LoadingBar = ({ percentage }: LoadingBarProps) => {
  return (
    <div className="loading-container-primary">
      <div className="loading-container-secondary">
        <h1 className="loading">Loading Home</h1>
        <h2 className="percentage">{percentage}%</h2>
        <div className="outer-bar">
          <div className="inner-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
