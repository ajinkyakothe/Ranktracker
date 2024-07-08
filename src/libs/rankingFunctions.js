const axios = require("axios");

export async function doGoogleSearch(keyword) {
  const data = { country: "us", query: { q: keyword }, brd_json: "json" };
  const url =
    "https://api.brightdata.com/serp/req?customer=hl_e7fe7ce4&zone=rank";
  const headers = {
    Authorization: "Bearer 8775d128-22f7-4dc5-9105-e801b5e35fe5",
  };
  const response = await axios.post(url, data, { headers });
  // return response.headers.get("x-response-id");
  if (!response?.headers) {
    console.error("no header in response " + url);
    console.error(data);
    return null;
  } else {
    console.log("responseId:" + response?.headers.get("x-response-id"));
    return response?.headers.get("x-response-id");
  }
}
