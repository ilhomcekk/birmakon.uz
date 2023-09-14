import React, { useState, useEffect, useCallback } from "react";
import PlacesAutocomplete, { getLatLng } from "react-places-autocomplete";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { geocodeByPlaceId } from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import Geocode from "react-geocode";
import axios from "axios";
import { Button } from "@mui/material";
Geocode.setApiKey(
  "AIzaSyAoud-_7sLGaEDVV5s8QvtTeGzI9dunLqU&libraries=places&v=weekly"
);
Geocode.setLanguage("us");
Geocode.setRegion("uz");
Geocode.enableDebug();

const MapPayment = ({
  onClickMapsValue,
  onClickCoordinateValue,
  clickCoordinate,
}) => {
  const [address, setAddress] = useState("");
  const [animation, setAnimation] = useState(2);
  let [coordinates, setCoordinates] = useState({ lat: 39.627, lng: 66.975 });

  // useEffect(() => {
  //   setCoordinates({
  //     lat: coordinates.lat,
  //     lng: coordinates.lng,
  //   });
  // }, [coordinates]);

  const handleSelect = async (value, placeId, suggestion) => {
    // const results = await geocodeByAddress(value);
    const results = await geocodeByPlaceId(placeId);
    const latLng = await getLatLng(results[0]);
    onClickMapsValue(value);
    // onClickCoordinateValue(latLng);
    setAddress(value);
    onClickCoordinateValue(latLng);
    setCoordinates(latLng);
  };
  const [map, setMap] = useState(null);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "100%",
    marginTop: "1rem",
    height: "360px",
  };
  const apikey =
    "AIzaSyAoud-_7sLGaEDVV5s8QvtTeGzI9dunLqU&libraries=places&v=weekly";

  const onInfoWindowClose = (event) => {};

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    setCoordinates({
      lat: newLat,
      lng: newLng,
    });
    Geocode.fromLatLng(`${newLat}`, `${newLng}`).then(
      (response) => {
        const addres2 = response.results[0].formatted_address;
        setAddress(addres2);
        onClickMapsValue(addres2);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <PlacesAutocomplete
        bounds={coordinates}
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <div className="input-autocomplete">
                <TextField
                  id="outlined-basic"
                  label="Найти адрес на карте"
                  className="inputProps w-full"
                  variant="outlined"
                  {...getInputProps({ placeholder: "Введите адрес" })}
                />
              </div>
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions
                  .filter(
                    (sugg) =>
                      sugg?.formattedSuggestion?.secondaryText?.includes(
                        "Уз"
                      ) ||
                      sugg?.formattedSuggestion?.secondaryText?.includes("Uz")
                  )
                  .map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    return (
                      <>
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
      <LoadScriptNext googleMapsApiKey={apikey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={13}
          center={coordinates}
          onUnmount={onUnmount}
          ref={setMap}
          onClick={(e) => {
            onMarkerDragEnd(e);
            setCoordinates({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
            clickCoordinate(coordinates);
            setAnimation(animation === 1 ? 2 : 1);
          }}
        >
          {address && (
            <InfoWindow
              onClose={() => onInfoWindowClose()}
              position={{
                lat: coordinates.lat + 0.0038,
                lng: coordinates.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{address}</span>
              </div>
            </InfoWindow>
          )}
          {address && (
            <Marker
              animation={animation}
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              draggable={true}
              onDragEnd={(e) => onMarkerDragEnd(e)}
            />
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default MapPayment;
