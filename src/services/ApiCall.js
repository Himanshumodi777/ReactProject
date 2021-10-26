export const ApiCall = function (pathURL) {
    return fetch(pathURL)
      .then((response) => {
        return response.json();
      })
      .then((apiData) => {
        if (apiData.status != 404) {
          console.log("data", apiData);
          return apiData;
        } else throw "wrong data";
      })
      .catch((err) => {
        console.log("in catch",err);
        return [];
      });
  };
  