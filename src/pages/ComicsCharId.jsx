// Pour utiliser l'id passer en params dans le Link de Hom
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const ComicsCharId = () => {
  // states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //destructuring pour récupérer l'id
  // ID du personnade
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("test");
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="container">
      <div>
        <h1>Retrouvz toutes les BD de votre personnage préféré {data.name}</h1>
        <img
          src={
            data.thumbnail.path + "/portrait_medium" + data.thumbnail.extension
          }
        />
      </div>
      {data.comics.map((comic, index) => {
        //console.log(comic);
        return (
          <article key={index}>
            <h2>{comic.title}</h2>
            <img
              src={
                comic.thumbnail.path +
                "/portrait_medium." +
                comic.thumbnail.extension
              }
            />
            <p>{comic.description}</p>
          </article>
        );
      })}
    </main>
  );
};

export default ComicsCharId;
