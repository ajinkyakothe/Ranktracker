import axios from "axios";
import mongoose from "mongoose";
import { Result } from "../../../models/Result";
import { URL } from "url";

export async function POST(req) {
  // mongoose.connect(process.env.MONGODB_URI);

  const data = await req.json();
  const response_id = data.response_id;
  const url =
    "https://api.brightdata.com/serp/get_result?customer=&zone=&response_id=" +
    response_id;

  const headers = {
    Authorization: "Bearer " + process.env.BRIGHT_DATA_API_KEY,
  };
  const response = await axios.get(url, { headers });
  console.log(response);
  console.log(response.data);
  const ourResultDoc = await Result.findOne({
    brightDataResponseId: response_id,
  });

  if (ourResultDoc) {
    const domain = ourResultDoc.domain;
    const keyword = ourResultDoc.keyword;
    const rank = response?.data?.organic?.find((result) =>
      result.link.includes(domain)
    )?.rank;
    ourResultDoc.complete = true;
    if (rank) {
      ourResultDoc.rank = rank;
      console.log(
        `Rank ${rank} saved for keyword ${keyword} and domain ${domain}`
      );
    }
    await ourResultDoc.save();
  }
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const domain = url.searchParams.get("domain");
  const keyword = url.searchParams.get("keyword");
  if (id) {
    return Response.json(await Result.findOne({ brightDataResponseId: id }));
  }
  if (domain && keyword) {
    return Response.json(await Result.find({ domain, keyword }));
  }
}
