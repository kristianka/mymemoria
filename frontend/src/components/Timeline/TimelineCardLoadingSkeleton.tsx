// make the boxes same width as timestamps
// Calculate the width based on the timestamp length
// This is a simple example where each character adds 10 pixels to the width
const timestamp = "23/01/2024, 12:18:40";
const width = timestamp.length * 10;
const elementStyle = {
    width: `${width}px`
};

interface TimelineCardLoadingSkeletonProps {
    index: number;
}

const TimelineCardLoadingSkeleton = ({ index }: TimelineCardLoadingSkeletonProps) => {
    return (
        <li className="animate-pulse">
            <hr />
            <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4">
                    <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2" fill="none" />
                </svg>
            </div>

            <div
                style={elementStyle}
                className={`timeline-box bg-gray-200  rounded-lg p-3 ${
                    index % 2 === 0 ? "timeline-start md:text-end" : "timeline-end mb-3"
                } `}
            >
                <div className="animate-pulse bg-gray-300 rounded-md w-full">&#8203;</div>
                <div
                    className={`mt-1 animate-pulse bg-gray-300 rounded-md ${
                        index % 2 === 0 ? "w-2/3 ml-auto" : "w-2/3 mr-auto"
                    }`}
                >
                    &#8203;
                </div>{" "}
            </div>
            <hr />
        </li>
    );
};

export default TimelineCardLoadingSkeleton;
