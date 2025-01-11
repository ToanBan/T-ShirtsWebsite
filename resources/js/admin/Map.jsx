import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export default function Map({ init, des, ChooseCheck, orderId}) {
    useEffect(() => {
        const map = L.map("map").setView([init.lat, init.lng], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const carIcon = new L.Icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/4736/4736213.png",
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });
        const carMarker = L.marker([init.lat, init.lng], { icon: carIcon }).addTo(map);

        if (des && des.lat && des.lng) {
            const destinationMarker = L.marker([des.lat, des.lng]).addTo(map);
            destinationMarker.bindPopup("Địa Điểm Giao Hàng");

            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(init.lat, init.lng),
                    L.latLng(des.lat, des.lng)
                ],
                routeWhileDragging: false
            }).addTo(map);

            routingControl.on("routesfound", function (e) {
                const route = e.routes[0];
                const coordinates = route.coordinates;
                let index = 0;
                const moveCar = () =>{
                    if(index < coordinates.length){
                        const {lat, lng} = coordinates[index]
                        carMarker.setLatLng([lat, lng]);
                        index += 1;
                        setTimeout(moveCar, 100);
                    }
                    if(index === coordinates.length){
                        ChooseCheck('shipped', orderId);
                    }
                }
                moveCar();
            });
        }

        return () => map.remove();
    }, [init, des, ChooseCheck]);

    return <div id="map" style={{ height: "480px" }}></div>;
}
