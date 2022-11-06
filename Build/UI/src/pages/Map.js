import {MAPBOX_API_KEY, MAPBOX_URL_STYLE} from "../SettingsConstants"
import mapboxgl from 'mapbox-gl';
import React, {useEffect, useRef, useState} from "react";
import "../css/Map.css";
import getGeoJson from "../requests/Get/getGeoJson";
import Marker from "../components/Marker";
import ReactDOM from 'react-dom';

mapboxgl.accessToken = MAPBOX_API_KEY;

export default function Map() {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(37.629010);
    const [lat,setLat] = useState(55.756040);
    const [zoom, setZoom] = useState(9);
    const [markers, setMarkers] = useState([])

    function SetMarkers(value) {
        setMarkers(() => value)
    }

    async function GetGeoJson() {
        let answer = await getGeoJson(10000);
        SetMarkers(answer);
    }

    /*
    useEffect(() => {
        // Render custom marker components
        markers.forEach((feature) => {
            const ref = React.createRef();
            ref.current = document.createElement("div");
            ReactDOM.render(
                <Marker feature={feature} />,
                ref.current
            );
            new mapboxgl.Marker(ref.current)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers])*/

    useEffect(() => {
        if (markers.length === 0) {
            return;
        }
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: MAPBOX_URL_STYLE,
            zoom: zoom,
            center: [lng, lat]
        })
        map.on('load', () => {
            map.addSource('markers', {
                type: 'geojson',
                data: markers,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'markers',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'markers',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'markers',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('markers').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            map.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .addTo(map);
            });

            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });})
        setMap(map);
        return () => map.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers]);

    useEffect(() => {
        if (!map) return; // wait for map to initialize
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    });

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: MAPBOX_URL_STYLE,
            center: [lng, lat],
            zoom: zoom,
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        setMap(map);
        // Clean up on unmount
        return () => map.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div>
        <div className="marker-settings" style={{display: "none"}}></div>
        <div className="sidebar">
            <button onClick={async () => await GetGeoJson()}>Получить точки</button>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainerRef} className="map-container"/>
    </div>);
}