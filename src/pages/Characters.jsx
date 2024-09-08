import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Characters = ({ search, setSearch }) => {
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${search}`
        );
        // console.log(response.data); // renvoie un [ {infos d'un personnage} ]
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  //------GESTION FAVORIS------------

  // Charger les favoris depuis le cookie lors du chargement de la page
  useEffect(() => {
    // En arrivant sur la page j'enregistre dans une variable ce qu'il peut y avaoit dans favoris
    const savedFavorites = Cookies.get("favorites");
    //console.log(savedFavorites); //[] si pas de favoris / [] avec l'objet complet du comic
    if (savedFavorites) {
      // Je transforme ces favoris en objet dans un tableau
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  //console.log(favorites); //[] si pas de favoris / [] avec l'objet complet du comic

  //------Fonction pour le click--------------------------------------

  // Fonction pour ajouter ou retirer un favori quand on clique dessus
  const handleFavorite = (comic) => {
    //console.log(comic); //{objet avec infos du comic}
    let isAlreadyFavorite = false;
    let updatedFavorites = [];

    // Parcourir le tableau des favoris existants

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i]._id === comic._id) {
        // Si le comic est déjà dans les cookies, on passe isAlready à true
        isAlreadyFavorite = true;
      } else {
        // Ajouter le nouveau favoris dans updatedfavoris
        updatedFavorites.push(favorites[i]);
      }
    }

    // Si le comic n'est pas déjà dans les favoris, on l'ajoute
    if (!isAlreadyFavorite) {
      updatedFavorites.push(comic);
    }

    //MAJ state
    setFavorites(updatedFavorites);

    // Transformer le tableau en chaine de caractère [{jgdvosjbvoùs:bkhvkhv}]
    const favoritesToSave = JSON.stringify(updatedFavorites);

    // Mettre à jour le cookie avec la nouvelle liste de favoris (expire dans 7 jours)
    Cookies.set("favorites", favoritesToSave, { expires: 15 });
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="container">
      <div className="search">
        <input
          className="search-bar"
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
        //console.log(details._id);
        const detailsId = details._id;
        // comic pas des les favoris par defaut
        let isFavorite = false;

        // Parcourir chaque comic dans la liste des favoris
        for (let i = 0; i < favorites.length; i++) {
          const currentFavorite = favorites[i]; // Récupérer le comic actuel dans les favoris
          const currentFavoriteId = currentFavorite._id; // Récupérer l'identifiant du comic actuel

          // Vérifier si l'identifiant du comic actuel est le même que celui du comic que tu veux vérifier
          if (currentFavoriteId === detailsId) {
            isFavorite = true; // Si les identifiants correspondent, alors le comic est déjà dans les favoris
            break; // On peut arrêter la boucle puisqu'on a trouvé le comic dans les favoris
          }
        }
        return (
          <article key={details._id}>
            <Link to={`/comics/${details._id}`} className="text-link">
              <h2>{details.name}</h2>

              <img
                className="img"
                src={
                  details.thumbnail.path +
                  "/portrait_uncanny." +
                  details.thumbnail.extension
                }
              />
            </Link>
            <label htmlFor={details._id}>Ajouter aux favoris</label>
            <input
              type="checkbox"
              id={details._id}
              checked={isFavorite}
              onChange={() => handleFavorite(details)}
            />
            <p>{details.description}</p>
          </article>
        );
      })}
    </main>
  );
};

export default Characters;
