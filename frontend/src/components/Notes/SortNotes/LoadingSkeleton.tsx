const LoadingSkeleton = () => {
    return (
        <div className="mt-3 bg-gray-300 animate-pulse">
            <div className="bg-gray-300 animate-pulse">
                <div className="card-actions justify-start">
                    <div className="h-10 w-10 m-1 bg-gray-500 rounded"></div>
                    <div className="h-6 w-1/2 mt-auto mb-auto bg-gray-500 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
