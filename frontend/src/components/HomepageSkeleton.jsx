import React from "react";

const HomepageSkeleton = () => {
  // Create an array of 3 placeholders to match your task rows
  const skeletonTasks = [1, 2, 3];

  return (
    <div className="app-wrapper">
      <div className="main-card">
        {/* Header Skeleton */}
        <div className="header">
          <div className="skeleton-line skeleton-title-line"></div>
          <div className="skeleton-line skeleton-subtitle-line"></div>
        </div>

        {/* Input Wrapper Skeleton */}
        <div className="skeleton-input-wrapper">
          <div className="skeleton-line skeleton-input-field"></div>
          <div className="skeleton-btn"></div>
        </div>

        {/* Task Section Skeleton */}
        <div className="task-section">
          <div className="skeleton-line skeleton-section-heading"></div>

          <div className="list-gap">
            {skeletonTasks.map((_, index) => (
              <div key={index} className="skeleton-task-item">
                <div className="skeleton-task-left">
                  <div className="skeleton-checkbox"></div>
                  <div className="skeleton-line skeleton-task-text"></div>
                </div>
                <div className="skeleton-actions">
                  <div className="skeleton-circle-btn"></div>
                  <div className="skeleton-circle-btn"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSkeleton;
