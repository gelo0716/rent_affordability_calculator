import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
        <div className="h-10 bg-gray-200 rounded-lg max-w-lg mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded max-w-2xl mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded max-w-xl mx-auto"></div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-40 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
