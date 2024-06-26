import { useEffect, useState } from "react";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://valorant-api.com/v1/agents");

        if (!response.ok) throw new Error("Network response was not ok");

        const fetchedData = await response.json();

        setData(
          fetchedData.data.filter(
            (agent) =>
              agent.displayName && agent.fullPortrait && agent.background
          )
        );

        console.log(fetchedData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {!loading &&
        data &&
        data.map((agent) => (
          <Card
            key={agent.uuid}
            img={agent.fullPortrait}
            background={agent.background}
            displayName={agent.displayName}
          />
        ))}
    </div>
  );
}
