import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = ({ search, setSearch }) => {
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${search}`
        );
        console.log(response.data); // renvoie un [ {infos d'un personnage} ]
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div>
        <input
          type="text"
          placeholder="recherche tes heros"
          value={search}
          onChange={(event) => {
            // console.log(event.target.value); // ok renvoie ce qu'on tape dans la barre de recherche
            setSearch(event.target.value);
          }}
        />
      </div>

      {data.map((details) => {
        //console.log(details._id); // id de chaque heros dans un objet
        /* console.log(
          details.thumbnail.path +
            "/portrai_fantastic." +
            details.thumbnail.extension
            
        ); */
        //console.log(details._id);
        return (
          <Link
            to={`/comics/${details._id}`}
            className="text-link"
            /*  to={`/comic/${details._id}`} */
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
