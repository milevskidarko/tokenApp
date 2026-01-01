import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  color: "blue" | "green" | "purple";
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500"
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}/10`}>
          <div className={`text-${color}-600 dark:text-${color}-400`}>
            {icon}
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${color}-100 dark:bg-${color}-900/30 text-${color}-700 dark:text-${color}-300`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
