"use client";
import Chart from "@/components/Chart";
import DeleteButton from "@/components/DeleteButton";
import DoubleHeader from "@/components/DoubleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function KeywordPage(props) {
  const domain = props.params.domain;
  const keyword = decodeURIComponent(props.params.keyword);
  const router = useRouter();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("/api/keywords?keyword=" + keyword + "&domain=" + domain)
      .then((response) => setResults(response.data.results));
  }, []);

  async function deleteKeyword() {
    const urlParams =
      "?domain=" + domain + "&keyword=" + encodeURIComponent(keyword);
    const url = "/api/keywords" + urlParams;
    await axios.delete(url);
    await router.push("/domains/" + domain);
  }

  function showDeletePopup() {
    MySwal.fire({
      title: "Delete?",
      text: `Do you really want to delete "${keyword}"?`,
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#f00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKeyword();
      }
    });
  }

  return (
    <div>
      <div className="flex item-end mt-8">
        <DoubleHeader
          preTitleLink={`/domains/${domain}`}
          preTitle={domain}
          mainTitle={keyword}
        />
        <div className="p-2">
          <DeleteButton onClick={showDeletePopup} />
        </div>
      </div>
      {results && <Chart width={"100%"} results={results} />}
    </div>
  );
}
