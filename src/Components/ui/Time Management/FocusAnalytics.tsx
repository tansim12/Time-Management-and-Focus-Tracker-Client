import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@nextui-org/react';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useAppContext } from '@/src/Context/AppContext';

const FocusAnalytics: React.FC = () => {
  const { focusTime, sessionsCompleted, currentStreak } = useAppContext();

  const dailyData = [
    { day: 'Mon', minutes: 120 },
    { day: 'Tue', minutes: 90 },
    { day: 'Wed', minutes: 150 },
    { day: 'Thu', minutes: 80 },
    { day: 'Fri', minutes: 200 },
    { day: 'Sat', minutes: 170 },
    { day: 'Sun', minutes: Math.floor(focusTime / 60) },
  ];

  const weeklyData = [
    { week: 'Week 1', minutes: 800 },
    { week: 'Week 2', minutes: 920 },
    { week: 'Week 3', minutes: 1050 },
    { week: 'This Week', minutes: dailyData.reduce((acc, day) => acc + day.minutes, 0) },
  ];

  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 bg-gray-800 text-white">
        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Daily Focus Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData}>
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="minutes" animationBegin={0} animationDuration={2000}>
              {dailyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4 bg-gray-800 text-white">
        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Weekly Focus Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="week" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="minutes" fill="#8884d8" animationBegin={0} animationDuration={2000} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4 bg-gray-800 text-white col-span-full">
        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Focus Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg">Total Focus Time</p>
            <motion.div
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {Math.floor(focusTime / 60)} minutes
            </motion.div>
          </div>
          <div className="text-center">
            <p className="text-lg">Sessions Completed</p>
            <motion.div
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {sessionsCompleted}
            </motion.div>
          </div>
          <div className="text-center">
            <p className="text-lg">Current Streak</p>
            <motion.div
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {currentStreak} days
            </motion.div>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gray-800 text-white col-span-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-2 text-purple-400">Motivational Message</h3>
          <p className="text-lg">
            {currentStreak > 0
              ? `Great job! You're on a ${currentStreak}-day streak. Keep up the fantastic work!`
              : "Ready to start your cosmic focus journey? Let's begin today!"}
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default FocusAnalytics;

