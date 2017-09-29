import "babel-polyfill";

let apiBaseUrl = "https://api.github.com/repos/jelko/digitalehilfe/";
//spoil githubs token detection
// eslint-disable-next-line
let oAuthToken = "00f69af9fb63058d73" + "" + "d9eb7cc6ba43e9d6410bd8";

function githubApiRequest(endpoint, params = "") {
  let url = (endpoint.startsWith("http")) ? endpoint : apiBaseUrl + endpoint;

  return fetch(url + params, {
    headers: {
      Accept: "application/vnd.github.v3.html+json",
      Authorization: "token " + oAuthToken
    },
  })
  .then(response => {
    if(!response.ok) {
      throw Error("Network request failed");
    }

    return response;
  })
  .then(d => d.json())
}

function githubApiPost(endpoint, payload) {
  let url = (endpoint.startsWith("http")) ? endpoint : apiBaseUrl + endpoint
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3.html+json",
      // write access key!!! dangerous as fuck
      Authorization: "token " + oAuthToken
    },
    method: "post",
    body: JSON.stringify(payload)
  })
  .then(response => {
    if(!response.ok) {
      throw Error("Network request failed");
    }

    return response;
  })
  .then(d => d.json())
}

function isFilterInArray(filters, filter) {
  return 0 <= filters.findIndex(f => f.id === filter.id);
}

function isFilterNameInArray(filters, filtername) {
  return 0 <= filters.findIndex(f => f.name === filtername);
}

function areFiltersInArray(filters1, filters2) {
  var inArray = true;
  filters1.forEach(f => {
    inArray = isFilterInArray(filters2, f) ? inArray : false;
  })
  
  return inArray;
}



export {githubApiRequest, githubApiPost, isFilterInArray, isFilterNameInArray, areFiltersInArray};