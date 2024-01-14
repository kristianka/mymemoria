import { useState, useRef, useEffect } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { BackendUserInterface, GeocoderResultInterface } from "../../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    user: BackendUserInterface | null | undefined;
}

const EditNoteMap = ({ user, setLat, setLng }: props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;
        if (!user) return;

        // usse user's default location if it exists, otherwise use helsinki railway station
        const defaultCoordinates = user?.defaultLocation?.coordinates || [
            24.94142734228444, 60.17117119051096
        ];

        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current as HTMLElement,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: defaultCoordinates as LngLatLike,
                zoom: 12
            });

            setMap(mapInstance);

            // Add geocoder
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken as string,
                mapboxgl: mapboxgl
            });

            const newMarker = new mapboxgl.Marker()
                .setLngLat(defaultCoordinates as LngLatLike)
                .addTo(mapInstance);
            setMarker(newMarker);

            geocoder.on("result", (e: GeocoderResultInterface) => {
                // Get the coordinates from the geocoding result
                const coordinates = e.result.center;
                mapInstance.flyTo({
                    center: coordinates,
                    zoom: 14
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
                        mapInstance.flyTo({
                            center: coordinates,
                            zoom: 12
                        });

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
    }, [map, marker, setLat, setLng, user]);

    return (
        <div>
            {user && (
                <div
                    className="h-100"
                    ref={mapContainer}
                    style={{ height: "400px", borderRadius: 5 }}
                />
            )}
        </div>
    );
};

export default EditNoteMap;
