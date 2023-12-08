import { useRef, useEffect } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { LoggedInUser } from "../types";
import useNotes from "../hooks/useNotes";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    user: LoggedInUser | null;
}

const Map = (props: props) => {
    const { data: notes, status: notesStatus } = useNotes(props.user);
    const mapContainer = useRef<HTMLDivElement>(null);
    console.log("notes in map", notes);

    useEffect(() => {
        const initializeMap = async () => {
            if (!mapContainer.current) return;

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: [23.761, 61.4978], // Tampere, Finland
                zoom: 12
            });

            mapInstance.on("load", () => {
                // Add geocoder
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken as string,
                    mapboxgl: mapboxgl
                });

                geocoder.on("result", (e) => {
                    const coordinates: LngLat = e.result.center;

                    // Create a popup
                    const popup = new mapboxgl.Popup().setHTML(`<h3>${e.result.text}</h3>`);

                    new mapboxgl.Marker().setLngLat(coordinates).setPopup(popup).addTo(mapInstance);
                });

                mapInstance.addControl(geocoder);

                if (notes.length > 0) {
                    for (const note of notes) {
                        if (note.location && note.location.coordinates) {
                            const coordinates: LngLat = note.location.coordinates;

                            const popup = new mapboxgl.Popup().setHTML(
                                `<h3>${note.title}</h3><p>${note.content}</p>`
                            );

                            new mapboxgl.Marker()
                                .setLngLat(coordinates)
                                .setPopup(popup)
                                .addTo(mapInstance);
                        }
                    }
                }
            });
        };
        initializeMap();
    }, [notes]);

    if (!notes) {
        return null;
    }

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    return (
        <div>
            {notes.length === 0 ? (
                <div>
                    <h2>
                        No notes? Create one by pressing that + next to your name on the up-right
                        corner!
                    </h2>
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) : (
                <div ref={mapContainer} style={{ height: "400px" }} />
            )}
        </div>
    );
};

export default Map;
