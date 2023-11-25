import React, { useState, useRef, useEffect } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { NoteInterface } from "../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    notes: NoteInterface[];
}

const Map = (props: props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const { notes } = props;

    useEffect(() => {
        const initializeMap = async () => {
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
                const coordinates: LngLat = e.result.center;

                // Create a popup
                const popup = new mapboxgl.Popup().setHTML(
                    `<h3>${e.result.text}</h3>` // Use the geocoding result's text as the popup title
                );

                // Add a marker with a popup
                new mapboxgl.Marker().setLngLat(coordinates).setPopup(popup).addTo(mapInstance);
            });

            mapInstance.addControl(geocoder);

            // Add markers for existing notes
            if (notes.length > 0) {
                for (const note of notes) {
                    if (note.location && note.location.coordinates) {
                        const coordinates: LngLat = note.location.coordinates;

                        // Create a popup for each existing note
                        const popup = new mapboxgl.Popup().setHTML(
                            `<h3>${note.title}</h3><p>${note.content}</p>`
                        );

                        // Add a marker with a popup
                        new mapboxgl.Marker()
                            .setLngLat(coordinates)
                            .setPopup(popup)
                            .addTo(mapInstance);
                    }
                }
            }
        };

        // Check if the map is not already initialized
        if (!map) {
            initializeMap();
        }

        return () => {
            // Cleanup logic if needed
        };
    }, [map, notes]);

    return <div ref={mapContainer} style={{ height: "400px" }} />;
};

export default Map;
