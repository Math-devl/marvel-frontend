// Pour utiliser l'id passer en params dans le Link de Hom
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Character = () => {
  // states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //destructuring pour récupérer l'id
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${characterId}`
        );
        //console.log(response.data); // {} données du perso
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>{data.name}</h1>
      <img
        src={
          data.thumbnail.path + "/portrait_uncanny." + data.thumbnail.extension
        }
      />
    </div>
  );
};

export default Character;
