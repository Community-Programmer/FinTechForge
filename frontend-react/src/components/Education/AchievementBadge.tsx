import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AchievementBadgeProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  unlocked: boolean;
  color: string;
  requirement?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  id,
  title,
  description,
  icon,
  unlocked,
  color,
  requirement,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            id={id}
            className="flex flex-col items-center max-w-128 max-h-128"
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center ${
                unlocked ? "" : "opacity-40 grayscale"
              }`}
              style={{ backgroundColor: color }}
            >
              <div className="p-4">
                {icon || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="M8 8h8" />
                    <path d="M8 12h8" />
                    <path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
                  </svg>
                )}
              </div>
            </div>
            <h4
              className={`text-center mt-2 font-medium text-sm ${
                unlocked ? "" : "text-gray-400"
              }`}
            >
              {title}
            </h4>
            {!unlocked && requirement && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                {requirement}
              </p>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2 max-w-xs">
            <h5 className="font-semibold mb-1">{title}</h5>
            <p className="text-sm">{description}</p>
            {!unlocked && requirement && (
              <p className="text-xs mt-2 text-gray-500">
                Requirement: {requirement}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
