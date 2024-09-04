import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        //console.log(response.data); // renvoie un [ {infos d'un personnage} ]
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      {data.map((details) => {
        //console.log(details._id); // chaque heros dans un objet
        /* console.log(
          details.thumbnail.path +
            "/portrai_fantastic." +
            details.thumbnail.extension
        ); */
        return (
          <Link
            className="text-link"
            to={`/character/${details._id}`}
            key={details._id}
          >
            <article>
              <h1>{details.name}</h1>
              <img
                src={
                  details.thumbnail.path +
                  "/portrait_uncanny." +
                  details.thumbnail.extension
                }
              />
              <p>{details.description}</p>
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default Characters;
