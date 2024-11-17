import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";
import markerIcon from "../../assets/markerIcon.png";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSelector } from "react-redux";

const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="background-color:${color}; width:25px; height:25px; border-radius:50%;"></div>`,
    className: "",
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
  });
};

const Map = () => {
  const { trips } = useSelector((state) => state.selectedTrips);
  const tripsPath =
    trips && trips.length > 0 ? trips.map((trip) => trip.tripDetail) : [];

  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [38, 38],
    iconAnchor: [12.5, 12.5],
  });

  return (
    <MapContainer
      center={[13.505145645125744, 13.336599594406174]}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {tripsPath &&
          tripsPath.length > 0 &&
          tripsPath.map((trip, tripIndex) => {
            let startLatitude = trip[0].coordinate[0].latitudeA;
            let startLongitude = trip[0].coordinate[0].longitudeB;
            let endLatitude = trip[trip.length - 1].coordinate[0].latitudeA;
            let endLongitude = trip[trip.length - 1].coordinate[0].longitudeB;
            return (
              <React.Fragment key={`trip-${tripIndex}`}>
                <Marker
                  position={[startLatitude, startLongitude]}
                  icon={customIcon}
                >
                  <Popup className="custom-popup">Start</Popup>
                </Marker>
                <Marker
                  position={[endLatitude, endLongitude]}
                  icon={customIcon}
                >
                  <Popup className="custom-popup">End</Popup>
                </Marker>
                {trip.map((path, index) => {
                  const {
                    speed,
                    coordinate,
                    isIdle,
                    isStopped,
                    idleStoppedDuration,
                  } = path;
                  const [latitudeA, longitudeA] = [
                    Number(coordinate[0].latitudeA),
                    Number(coordinate[0].longitudeA),
                  ];
                  const [latitudeB, longitudeB] = [
                    Number(coordinate[0].latitudeB),
                    Number(coordinate[0].longitudeB),
                  ];

                  return (
                    <React.Fragment key={`path-${tripIndex}-${index}`}>
                      {isStopped && !isIdle && (
                        <Marker
                          position={[latitudeA, longitudeA]}
                          icon={createCustomIcon("#0021f7")}
                        >
                          <Popup>{`Stopped for ${Math.ceil(
                            idleStoppedDuration
                          )} Mins`}</Popup>
                        </Marker>
                      )}
                      {isIdle && !isStopped && (
                        <Marker
                          position={[latitudeA, longitudeA]}
                          icon={createCustomIcon("#fa07cd")}
                        >
                          <Popup>{`Stopped for ${Math.ceil(
                            idleStoppedDuration
                          )} Mins`}</Popup>
                        </Marker>
                      )}
                      <Polyline
                        positions={[
                          [latitudeA, longitudeA],
                          [latitudeB, longitudeB],
                        ]}
                        color={ speed > 60 ? "#03fcf4ed" : "#039dfc"}
                      />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
