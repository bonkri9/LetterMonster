import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouterChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const gaId = import.meta.env.VITE_APP_GA_TRACKING_ID;

    if (!window.location.href.includes("localhost") && gaId) {
      try {
        ReactGA.initialize(gaId);
        setInitialized(true);
      } catch (e) {
        console.warn("GA init failed:", e);
        setInitialized(false);
      }
    } else {
      console.info("GA disabled (missing ID or localhost).");
      setInitialized(false);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send("pageview");
    }
  }, [initialized, location]);

  return null;
};

export default RouterChangeTracker;
