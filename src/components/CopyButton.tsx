"use client";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      onClick={handleCopy}
      title="Copy address"
    >
      {copied ? (
        <>
          <FiCheck className="text-green-600 dark:text-green-400" />
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="text-gray-600 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Copy</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;