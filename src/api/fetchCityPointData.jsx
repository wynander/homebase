
export const fetchCityPointData = async () => {
  const cityRes = await fetch(
    'https://raw.githubusercontent.com/wynander/market-maker/master/src/data/US_City_points_geojson.json'
  );
  const cityPoints = await cityRes.json();
  let coordinates = { features: [] };
  cityPoints.features.forEach((city) => {
    coordinates.features.push({
      COORDINATES: city.geometry.coordinates,
      properties: { NAME: city.properties.name, STATEFP: city.properties.state_fips },
    });
  });

  return coordinates;
};
