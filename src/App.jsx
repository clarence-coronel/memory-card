import { useEffect, useState } from "react";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentPool, setAgentPool] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [insertedAgents, setInsertedAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://valorant-api.com/v1/agents");

        if (!response.ok) throw new Error("Network response was not ok");

        const fetchedData = await response.json();

        const filteredData = fetchedData.data.filter(
          (agent) => agent.displayName && agent.fullPortrait && agent.background
        );

        setData(filteredData);

        setAgentPool(generateNewAgentPool(filteredData, 12));

        // console.log(fetchedData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateNewAgentPool = (agents, limit) => {
    const shuffledAgents = shuffleArray(agents);

    return shuffledAgents.slice(0, limit);
  };

  const reloadAgentPool = () => {
    setAgentPool(generateNewAgentPool(data, 12));
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const cardClickHandler = (displayName) => {
    reloadAgentPool();

    if (!insertedAgents.find((agentName) => agentName === displayName)) {
      setScore(score + 1);
      setInsertedAgents([...insertedAgents, displayName]);
    } else {
      if (score > highScore) setHighScore(score);

      setScore(0);
      setInsertedAgents([]);
    }
  };

  return !loading && data ? (
    <div className="min-h-screen w-full bg-neutral-800">
      <div className="bg-neutral-800 text-white p-3 flex justify-center items-center gap-5">
        <h1 className="flex justify-center items-center gap-1">
          <span>Score: </span>
          <span className="text-red-400 text-xl">{score}</span>
        </h1>
        <h2>
          <span>Highest Score: </span>
          <span className="text-red-400 text-xl">{highScore}</span>
        </h2>
      </div>
      <div className="max-md:grid-cols-2 max-xl:grid-cols-4 grid grid-cols-6 gap-5 px-5">
        {agentPool.map((agent) => (
          <Card
            key={agent.uuid}
            img={agent.fullPortrait}
            background={agent.background}
            displayName={agent.displayName}
            action={cardClickHandler}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full flex-col gap-2 min-h-screen flex justify-center items-center bg-neutral-800">
      <img
        className="w-[200px]"
        src="https://freelogopng.com/images/all_img/1664302216valorant-logo-png.png"
        alt=""
      />
      <h1 className="text-2xl text-red-400 font-bold">Memory Card Game</h1>
      <span className="text-white text-lg animate-pulse">
        Retrieving Agents Information...
      </span>
    </div>
  );
}
