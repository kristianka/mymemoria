import { useEffect } from "react";
import { FireBaseUserInterface } from "../../types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useNotes from "../../hooks/useNotes";
import useUser from "../../hooks/useUser";
import TimelineCard from "./TimelineCard";
import TimelineCardLoadingSkeleton from "./TimelineCardLoadingSkeleton";
import { sortNotesByCreationTime } from "../Notes/SortNotes/sortingNotes";

interface TimelineProps {
    firebaseAuth: FireBaseUserInterface | null;
}

const Timeline = ({ firebaseAuth }: TimelineProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    document.title = `${t("timeline")} | ${t("appName")}`;

    const sortedNotes = sortNotesByCreationTime(notes || [], "desc");

    return (
        <div>
            <h2 className="text-3xl font-bold text-center m-5">{t("timeline")}</h2>
            <ul className="timeline timeline-vertical">
                {userStatus === "pending" ||
                    (notesStatus === "pending" &&
                        Array(6) // Assuming you want 5 skeletons
                            .fill(0)
                            .map((_, index) => (
                                <TimelineCardLoadingSkeleton key={index} index={index} />
                            )))}
                {sortedNotes &&
                    sortedNotes.map((note, index) => (
                        <TimelineCard key={note.id} note={note} index={index} />
                    ))}
            </ul>
        </div>
    );
};

export default Timeline;
