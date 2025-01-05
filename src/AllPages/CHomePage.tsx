"use client";

import React from "react";

import { motion } from "framer-motion";
import PomodoroTimer from "../Components/ui/Time Management/PomodoroTimer";
import FocusAnalytics from "../Components/ui/Time Management/FocusAnalytics";
import TaskList from "../Components/ui/Time Management/TaskList";
import GamificationElements from "../Components/ui/Time Management/GamificationElements";

const CHomePage = () => {
  return (
    <div>
      <div className="min-h-screen  text-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Cosmic Focus Tracker
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <PomodoroTimer />
              <TaskList />
            </div>
            <div className="space-y-12">
              <FocusAnalytics />
              <GamificationElements />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CHomePage;
