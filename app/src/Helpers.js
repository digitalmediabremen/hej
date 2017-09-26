import "babel-polyfill";

let apiBaseUrl = "https://api.github.com/repos/jelko/digitalehilfe/";

function githubApiRequest(endpoint, params = "") {
  let url = (endpoint.startsWith("http")) ? endpoint : apiBaseUrl + endpoint;

  return fetch(url + params, {
    headers: {
      Accept: "application/vnd.github.v3.html+json",
      Authorization: "token f7c91d8eb3173836c1a566a716be2597e9737a71"
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
      Authorization: "token f900a7cca534dbd27c5fcc1a9700501ccb019447"
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

function areFiltersInArray(filters1, filters2) {
  var inArray = true;
  filters1.forEach(f => {
    inArray = isFilterInArray(filters2, f) ? inArray : false;
  })
  
  return inArray;
}



export {githubApiRequest, githubApiPost, isFilterInArray, areFiltersInArray};