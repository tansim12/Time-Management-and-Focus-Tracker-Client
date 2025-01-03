import React, { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  focusTime: number;
  sessionsCompleted: number;
  currentStreak: number;
  isWorking: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [focusTime, setFocusTime] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isWorking) {
      setIsWorking(true);
      const newTimer = setInterval(() => {
        setFocusTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
    }
  };

  const pauseTimer = () => {
    if (isWorking && timer) {
      clearInterval(timer);
      setIsWorking(false);
    }
  };

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    setFocusTime(0);
    setIsWorking(false);
  };

  useEffect(() => {
    if (focusTime > 0 && focusTime % 1500 === 0) {
      // 25 minutes
      setSessionsCompleted((prev) => prev + 1);
    }
  }, [focusTime]);

  // Simulating streak calculation (in a real app, this would be based on daily usage)
  useEffect(() => {
    const streakInterval = setInterval(() => {
      setCurrentStreak((prev) => prev + 1);
    }, 86400000); // 24 hours

    return () => clearInterval(streakInterval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        focusTime,
        sessionsCompleted,
        currentStreak,
        isWorking,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
