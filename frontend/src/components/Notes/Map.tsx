import { useRef, useEffect } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { FireBaseUserInterface, GeocoderResultInterface } from "../../types";
import useUser from "../../hooks/useUser";
import useNotes from "../../hooks/useNotes";
import { useTranslation } from "react-i18next";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Map = ({ firebaseAuth }: props) => {
    const { t } = useTranslation();
    const mapContainer = useRef<HTMLDivElement>(null);
    // if there are no notes, zoom to user's default location

    const { data: user } = useUser(firebaseAuth);
    const { data: notes } = useNotes(user || null);
    const defaultCoordinates =
        notes &&
        notes.length > 0 &&
        (notes[0].location.coordinates[0] !== 0 || notes[0].location.coordinates[1] !== 0)
            ? notes[0].location?.coordinates
            : user?.defaultLocation.coordinates;

    useEffect(() => {
        const initializeMap = async () => {
            if (!mapContainer.current) return;

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/outdoors-v12",
                center: defaultCoordinates as LngLatLike,
                zoom: 12
            });

            // you can get your current location by clicking the gps button on the bottom right
            const geolocateControl = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: false,
                showUserHeading: true
            });

            mapInstance.addControl(geolocateControl, "bottom-right");

            mapInstance.on("load", () => {
                // Add geocoder
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken as string,
                    mapboxgl: mapboxgl,
                    placeholder: t("search")
                });

                geocoder.on("result", (e: GeocoderResultInterface) => {
                    const coordinates = e.result.center;
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
    }, [defaultCoordinates, notes, t]);

    if (!notes) {
        return null;
    }

    return <div ref={mapContainer} style={{ height: "25rem", borderRadius: 5 }} />;
};

export default Map;
