import { Link } from "react-router-dom";
import { NoteInterface } from "../../types";

interface TimelineCardProps {
    note: NoteInterface;
    index: number;
}

const formatDate = (dateString: string) => {
    const noteDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // get notes date: year, month, day for comparison
    const noteDateYMD = `${noteDate.getFullYear()}-${noteDate.getMonth()}-${noteDate.getDate()}`;
    const todayYMD = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const yesterdayYMD = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

    // Options to exclude seconds from the time
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
    };

    if (noteDateYMD === todayYMD) {
        return `Today, ${noteDate.toLocaleTimeString([], timeOptions)}`;
    } else if (noteDateYMD === yesterdayYMD) {
        return `Yesterday, ${noteDate.toLocaleTimeString([], timeOptions)}`;
    } else {
        return noteDate.toLocaleDateString([], timeOptions);
    }
};

const TimelineCard = ({ note, index }: TimelineCardProps) => {
    return (
        <li key={note.id}>
            <hr />
            <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4">
                    <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2" fill="none" />
                </svg>
            </div>

            <Link
                className={`timeline-box bg-white rounded-lg p-3 ${
                    index % 2 === 0 ? "timeline-start md:text-end" : "timeline-end mb-3"
                } `}
                to={`/notes/${note.id}`}
            >
                <time className="font-mono italic">{formatDate(note.createdAt)}</time>
                <div className="text-lg font-black">{note.title}</div>
            </Link>
            <hr />
        </li>
    );
};

export default TimelineCard;
