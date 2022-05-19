
export const fetchZillowData = async () => {
  // //With zillow API key this would be fetched from their API and then modified the same way
  let zillowRes = await fetch('/data/Zillow_Home_Value_By_City_May_2022.csv', {
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    },
  });
  return await zillowRes.text();
};
