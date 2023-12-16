const NotesLoadingSkeleton = () => {
    return (
        <div className="card bg-gray-300 animate-pulse">
            <div className="card-body">
                <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                <div className="space-y-2 mt-2">
                    <div className="h-4 bg-gray-500 rounded"></div>
                    <div className="h-4 bg-gray-500 rounded w-5/6"></div>
                </div>
                <div className="card-actions justify-end mt-4">
                    <div className="h-10 w-10 bg-gray-500 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default NotesLoadingSkeleton;
