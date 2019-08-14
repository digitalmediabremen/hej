import "babel-polyfill"; 
import { API_BASE_URL, OAUTH_TOKEN } from "../config";

function githubApiRequest(endpoint, params = "", headers = {}, headerCallback) {
  let url = (endpoint.startsWith("http")) ? endpoint : API_BASE_URL + endpoint;
  
  headers = Object.assign({
    Accept: "application/vnd.github.v3.html+json",
    Authorization: "token " + OAUTH_TOKEN
  }, headers);

  return fetch(url + params, {
    headers: headers,
  })
  .then(response => {
    if(!response.ok) {
      throw Error("Network request failed");
    }
    if(headerCallback) headerCallback(response.headers)

    return response;
  })
  .then(d => d.json())
}

function githubApiResourceChanged(endpoint, eTag, callbackYes, callbackNo) { 
  let url = (endpoint.startsWith("http")) ? endpoint : API_BASE_URL + endpoint;
  
  let headers = {
    Accept: "application/vnd.github.v3.html+json",
    Authorization: "token " + OAUTH_TOKEN,
    "If-None-Match": eTag
  }

  return fetch(url, {
    headers: headers,
  })
  .then(response => {
    if(response.status !== 304) {
      if(callbackYes) callbackYes(response.headers.get("ETag"), response.headers.get("X-Poll-Interval"))
    } else {
      if(callbackNo) callbackNo(response.headers.get("X-Poll-Interval"));
    }
    return response
  })
  
}

function githubApiPost(endpoint, payload) {
  let url = (endpoint.startsWith("http")) ? endpoint : API_BASE_URL + endpoint
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3.html+json",
      // write access key!!! dangerous as fuck
      Authorization: "token " + OAUTH_TOKEN
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


export {githubApiRequest, githubApiPost, isFilterInArray, isFilterNameInArray, areFiltersInArray, githubApiResourceChanged};