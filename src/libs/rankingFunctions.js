const axios = require("axios");

export async function doGoogleSearch(keyword) {
  const data = { country: "us", query: { q: keyword }, brd_json: "json" };
  const url =
    "bright data api link ";
  const headers = {
    Authorization: "token here",
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
