import { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { NoteInterface } from "../../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    note: NoteInterface;
}

const SingleNoteMap = ({ note }: props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    const defaultCoordinates = note.location.coordinates;

    useEffect(() => {
        const initializeMap = async () => {
            if (!mapContainer.current) return;

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: defaultCoordinates as LngLatLike,
                zoom: 12
            });

            setMap(mapInstance);

            mapInstance.on("load", () => {
                // Add geocoder
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken as string,
                    mapboxgl: mapboxgl
                });

                mapInstance.addControl(geocoder);

                if (note.location) {
                    const coordinates: LngLatLike = note.location.coordinates;
                    const popup = new mapboxgl.Popup().setHTML(
                        `<h3><b>${note.title}</h3></b>
                                <p>${note.content}</p>`
                    );
                    const newMarker = new mapboxgl.Marker()
                        .setLngLat(coordinates)
                        .setPopup(popup)
                        .addTo(mapInstance);
                    setMarker(newMarker);
                }
            });
        };
        if (!map) {
            initializeMap();
        }

        if (marker?.getLngLat().toArray() !== note.location.coordinates) {
            marker?.setLngLat(note.location.coordinates);
        }

        return () => {
            // Clear marker but do not remove the map instance
            if (marker) {
                marker.remove();
            }
        };
    }, [defaultCoordinates, map, marker, note]);

    if (!note) {
        return null;
    }

    return (
        <div>
            <div
                className="h-100"
                ref={mapContainer}
                style={{ height: "25rem", borderRadius: 5 }}
            />
        </div>
    );
};

export default SingleNoteMap;
