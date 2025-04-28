const SkeletonCard = () => {
    return (
      <div className="bg-[#1e293b] rounded-2xl p-4 animate-pulse">
        <div className="h-40 bg-gray-700 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  };
  
  export default SkeletonCard;
  