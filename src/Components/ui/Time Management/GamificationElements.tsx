import React from "react";
import { motion } from "framer-motion";
import { Card, Progress } from "@nextui-org/react";
import { useAppContext } from "@/src/Context/AppContext";

const GamificationElements: React.FC = () => {
  const { currentStreak } = useAppContext();

  const badges = [
    { name: "Cosmic Explorer", icon: "��" },
    { name: "Nebula Navigator", icon: "🌌" },
    { name: "Starlight Sage", icon: "✨" },
    { name: "Galaxy Guardian", icon: "🌠" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-4 bg-gray-800 text-white">
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">
            Cosmic Streak
          </h3>
          <Progress
            value={currentStreak}
            max={7}
            color="secondary"
            className="mt-2"
          />
          <p className="mt-2 text-lg">
            {currentStreak} day{currentStreak !== 1 ? "s" : ""} streak in the
            cosmos
          </p>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-4 bg-gray-800 text-white">
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">
            Galactic Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-2">{badge.icon}</div>
                <p className="text-sm text-center">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {currentStreak > 0 ? (
            <>
              You're on a {currentStreak}-day cosmic journey! Keep exploring! 🌟
            </>
          ) : (
            <>Ready to start your cosmic focus adventure? Let's go! 🚀</>
          )}
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default GamificationElements;
