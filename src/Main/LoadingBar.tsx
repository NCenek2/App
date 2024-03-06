import "./LoadingBar.css";

type LoadingBarProps = {
  percentage: number;
  name: string;
};

const LoadingBar = ({ percentage, name }: LoadingBarProps) => {
  return (
    <div className="loading-container-primary">
      <div className="loading-container-secondary">
        <h1 className="loading">Loading {name}</h1>
        <h2 className="percentage">{percentage}%</h2>
        <div className="outer-bar">
          <div className="inner-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
