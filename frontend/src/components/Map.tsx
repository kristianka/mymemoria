import { useRef, useEffect } from "react";
import mapboxgl, { LngLat, LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { FireBaseUserInterface } from "../types";
import useNotes from "../hooks/useNotes";
import useUser from "../hooks/useUser";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Map = ({ firebaseAuth }: props) => {
    const { data: user } = useUser(firebaseAuth);
    const { data: notes } = useNotes(user);
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
                    new mapboxgl.Marker().setLngLat(coordinates);
                });

                mapInstance.addControl(geocoder);

                if (notes && notes.length > 0) {
                    for (const note of notes) {
                        if (note.location) {
                            const coordinates: LngLatLike = note.location.coordinates;

                            const popup = new mapboxgl.Popup().setHTML(
                                `<h3><b>${note.title}</h3></b>
                                <p>${note.content}</p>`
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

    return (
        <div>
            {notes.length === 0 ? (
                <div>
                    <h2>
                        No notes? Create one by pressing that + next to your name on the up-right
                        corner!
                    </h2>
                </div>
            ) : (
                <div ref={mapContainer} style={{ height: "400px" }} />
            )}
        </div>
    );
};

export default Map;
