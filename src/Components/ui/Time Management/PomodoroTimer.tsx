import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, ButtonGroup, Card } from '@nextui-org/react';
import { useAppContext } from '@/src/Context/AppContext';


const PomodoroTimer: React.FC = () => {
  const { focusTime, isWorking, startTimer, pauseTimer, resetTimer, sessionsCompleted, currentStreak } = useAppContext();
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3'); // Make sure to add this audio file to your public folder
  }, []);

  useEffect(() => {
    if (focusTime > 0 && focusTime % 1500 === 0) { // 25 minutes
      setShowMessage(true);
      audioRef.current?.play();
      setTimeout(() => setShowMessage(false), 3000);
    }
  }, [focusTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressValue = (focusTime % 1500) / 15; // 25 minutes cycle
  const isBreak = focusTime % 1800 >= 1500; // 5 minutes break after 25 minutes focus

  return (
    <Card className="p-6 bg-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Cosmic Focus Timer</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg">
          Session: <span className="font-bold text-green-400">{sessionsCompleted + 1}</span>
        </div>
        <div className="text-lg">
          Streak: <span className="font-bold text-yellow-400">{currentStreak}</span> days
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <motion.div
          className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          key={focusTime}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {formatTime(isBreak ? 300 - (focusTime % 300) : 1500 - (focusTime % 1500))}
        </motion.div>
      </div>
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${(progressValue / 100) * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${(progressValue / 100) * 100}%` }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </div>
      <div className="text-center mb-6">
        <motion.span
          className={`text-2xl font-semibold ${isBreak ? 'text-yellow-400' : 'text-green-400'}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isBreak ? 'Break Time' : 'Focus Time'}
        </motion.span>
      </div>
      <ButtonGroup className="flex justify-center">
        <Button
          auto
          color={isWorking ? "warning" : "success"}
          onClick={isWorking ? pauseTimer : startTimer}
          className="px-6 py-2 text-lg"
        >
          {isWorking ? "Pause" : "Start"}
        </Button>
        <Button
          auto
          color="error"
          onClick={resetTimer}
          className="px-6 py-2 text-lg"
        >
          Reset
        </Button>
      </ButtonGroup>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-green-400">
              Great job! Time for a break!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PomodoroTimer;

