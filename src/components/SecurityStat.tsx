import React from "react";

interface SecurityStatProps {
  label: string;
  value: string;
  isWarning?: boolean;
}

const SecurityStat: React.FC<SecurityStatProps> = ({ label, value, isWarning = false }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    <span className={`text-sm font-medium ${isWarning ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-800 dark:text-gray-200'}`}>
      {value}
    </span>
  </div>
);

export default SecurityStat;
