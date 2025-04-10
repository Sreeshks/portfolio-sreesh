import { useEffect, useState } from 'react';
import '../styles/loading.css';

const LoadingScreen = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setTimeout(onLoaded, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${!loading ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-photo">
          <img src="/assets/sree (1).png" alt="Sreesh K Suresh" />
        </div>
        <h1 className="loading-name">Sreesh K Suresh</h1>
        <div className="loading-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loading-text">Loading Portfolio...</div>
      </div>
    </div>
  );
};

export default LoadingScreen; 