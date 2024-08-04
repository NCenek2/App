import { useEffect, useState } from "react";
import "./LoadingBar.css";

type LoadingBarProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingBar = ({ isLoading, setIsLoading }: LoadingBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isLoading) {
      interval = setInterval(() => {
        setPercentage((prevPercentage) => {
          const newPercentage = prevPercentage + 1;
          if (newPercentage > 100) {
            setIsLoading(false);
            return prevPercentage;
          }
          return newPercentage;
        });
      }, 5);
    }

    return () => clearInterval(interval!);
  }, [isLoading]);

  return (
    <div className="loading-container-primary">
      <div className="loading-container-secondary">
        <h1 className="loading">Loading</h1>
        <h2 className="percentage">{percentage}%</h2>
        <div className="outer-bar">
          <div className="inner-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
