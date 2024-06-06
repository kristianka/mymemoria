import { useState, useRef, useEffect } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

import { FireBaseUserInterface, GeocoderResultInterface } from "../../types";
import useUser from "../../hooks/useUser";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import { useTranslation } from "react-i18next";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface LngLat {
    lng: number;
    lat: number;
}

interface props {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    firebaseAuth: FireBaseUserInterface | null;
}

const AddingNoteMap = ({ firebaseAuth, setLat, setLng }: props) => {
    const { t } = useTranslation();
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const navigate = useNavigate();

    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    // if user is not logged in, redirect to front page
    // useEffect to prevent infinite loop if server is down
    useEffect(() => {
        if (!user && userStatus !== "pending") {
            navigate("/");
        }
    }, [user, userStatus, navigate]);

    useEffect(() => {
        const initializeMap = () => {
            if (!mapContainer.current) return;

            // usse user's default location if it exists, otherwise use helsinki railway station
            const defaultCoordinates = user?.defaultLocation?.coordinates || [
                24.94142734228444, 60.17117119051096
            ];

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: defaultCoordinates as LngLatLike,
                zoom: 12
            });

            setMap(mapInstance);

            // Add geocoder
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken as string,
                mapboxgl: mapboxgl,
                placeholder: t("search")
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
                    const coordinates: LngLat = e.lngLat;
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

            // you can get your current location by clicking the gps button on the bottom right
            const geolocateControl = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: false,
                showUserHeading: true
            });

            geolocateControl.on("geolocate", (e) => {
                // Remove existing marker if present
                if (marker) {
                    marker.remove();
                }

                // really hacky due to lackluster typescript support!!
                if (e !== undefined && "coords" in e) {
                    const { latitude, longitude } = e.coords as GeolocationCoordinates;
                    if (isNaN(latitude) || isNaN(longitude)) return;
                    // Set new marker
                    const newMarker = new mapboxgl.Marker()
                        .setLngLat([longitude, latitude] as LngLatLike)
                        .addTo(mapInstance);
                    setMarker(newMarker);

                    setLng(longitude);
                    setLat(latitude);
                }
            });

            mapInstance.addControl(geolocateControl, "bottom-right");
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
    }, [map, marker, user, setLat, setLng, t]);

    return (
        <div>
            {firebaseAuth && userStatus === "pending" && <MapLoadingSkeleton />}
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

export default AddingNoteMap;
