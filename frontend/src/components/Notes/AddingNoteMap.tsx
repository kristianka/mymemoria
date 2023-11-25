import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface LngLat {
    lng: number;
    lat: number;
}

interface props {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
}

const AddingNoteMap = (props: props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        const initializeMap = () => {
            if (!mapContainer.current) return;

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [23.761, 61.4978], // Tampere, Finland
                zoom: 12
            });

            setMap(mapInstance);

            // Add geocoder
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken as string,
                mapboxgl: mapboxgl
            });

            geocoder.on("result", (e) => {
                // Get the coordinates from the geocoding result
                const coordinates = e.result.center;
                console.log("in result", coordinates);
                mapInstance.flyTo({
                    center: coordinates,
                    zoom: 14 // Adjust the zoom level as needed
                });

                const newMarker = new mapboxgl.Marker().setLngLat(coordinates).addTo(mapInstance);
                setMarker(newMarker);

                props.setLng(coordinates[0]);
                props.setLat(coordinates[1]);
            });

            mapInstance.on("click", (e) => {
                // Check if the click event is not associated with a geocoding result
                if (!e.originalEvent || !e.originalEvent?.result) {
                    const coordinates: LngLat = e.lngLat;
                    console.log("in click", coordinates);
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

                        props.setLat(coordinates.lat);
                        props.setLng(coordinates.lng);
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
    }, [map, marker]);

    return <div ref={mapContainer} style={{ height: "400px" }} />;
};

export default AddingNoteMap;
