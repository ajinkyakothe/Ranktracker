"use client";
import NewDomainForm from "@/components/NewDomainForm";

import DomainsList from "@/components/DomainsList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [domains, setDomains] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchDomains();
  }, []);

  function fetchDomains() {
    setLoading(true);
    axios.get("/api/domains").then((res) => {
      setDomains(res.data.domains);
      setKeywords(res.data.keywords);
      setResults(res.data.results);
      setLoading(false);
    });
  }

  return (
    <div>
      <NewDomainForm onNew={fetchDomains} />
      {loading && <div>Loading...</div>}
      {!loading && (
        <DomainsList domains={domains} keywords={keywords} results={results} />
      )}
    </div>
  );
}
