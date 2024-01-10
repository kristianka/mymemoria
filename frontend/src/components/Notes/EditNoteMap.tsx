import { useState, useRef, useEffect } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { NoteInterface } from "../../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    note: NoteInterface;
}

const EditNoteMap = ({ note, setLat, setLng }: props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // if there are no coordinates, use default coordinates
        // and be more zoomed out
        const defaultCoordinates =
            note.location.coordinates[0] !== 0 || note.location.coordinates[1] !== 0
                ? [note.location.coordinates[0], note.location.coordinates[1]]
                : [23.761, 61.4978]; // Tampere, Finland;

        const defaultZoom = defaultCoordinates === note.location.coordinates ? 12 : 8;
        console.log("defaultCoordinates", defaultCoordinates);

        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current as HTMLElement,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: defaultCoordinates as LngLatLike,
                zoom: defaultZoom
            });

            setMap(mapInstance);

            // Add geocoder
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken as string,
                mapboxgl: mapboxgl
            });

            if (note.location.coordinates[0] !== 0 || note.location.coordinates[1] !== 0) {
                const newMarker = new mapboxgl.Marker()
                    .setLngLat(defaultCoordinates as LngLatLike)
                    .addTo(mapInstance);
                setMarker(newMarker);
            }

            geocoder.on("result", (e) => {
                // Get the coordinates from the geocoding result
                const coordinates = e.result.center;
                mapInstance.flyTo({
                    center: coordinates,
                    zoom: 14 // Adjust the zoom level as needed
                });

                const newMarker = new mapboxgl.Marker().setLngLat(coordinates).addTo(mapInstance);
                setMarker(newMarker);

                setLng(coordinates[0]);
                setLat(coordinates[1]);
            });

            mapInstance.on("click", (e) => {
                // Check if the click event is not associated with a geocoding result
                if (!e.originalEvent || !("result" in e.originalEvent)) {
                    const coordinates = e.lngLat;
                    if (coordinates !== undefined || coordinates !== null) {
                        // Remove existing marker if present
                        if (marker) {
                            marker.remove();
                        }

                        // Set new marker
                        const newMarker = new mapboxgl.Marker()
                            .setLngLat(coordinates)
                            .addTo(mapInstance);
                        setMarker(newMarker);

                        setLat(coordinates.lat);
                        setLng(coordinates.lng);
                    }
                }
            });

            mapInstance.addControl(geocoder);
        };

        if (!map) {
            initializeMap();
        }

        return () => {
            // Clear marker but do not remove the map instance
            if (marker) {
                marker.remove();
            }
        };
    }, [map, marker, setLat, setLng, note]);

    return (
        <div className="h-100" ref={mapContainer} style={{ height: "400px", borderRadius: 5 }} />
    );
};

export default EditNoteMap;
