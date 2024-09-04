// Pour utiliser l'id passer en params dans le Link de Hom
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* const Comic = () => {
  // states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //destructuring pour récupérer l'id
  // soucis on récupère l'id du personnage là, pas des BD lié au personnage
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comic/${comicId}`
        );
        console.log(response.data); // {} données du perso
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comicId]);
  return isLoading ? <p>Loading...</p> : <div>Test</div>;
}; */

export default Comic;
