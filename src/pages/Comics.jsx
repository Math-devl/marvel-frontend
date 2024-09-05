import axios from "axios";
import { useEffect, useState } from "react";

const Comics = ({ search, setSearch }) => {
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${search}`
        );

        //console.log(response.data); //
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
          value={search}
          onChange={(event) => {
            // console.log(event.target.value); // ok renvoie ce qu'on tape dans la barre de recherche
            //setSearch(event.target.value);

            setSearch(event.target.value);
          }}
        />
      </div>
      {data.sort().map((details) => {
        //console.log(details._id); // id de chaque heros dans un objet
        /* console.log(
          details.thumbnail.path +
            "/portrai_fantastic." +
            details.thumbnail.extension
        ); */
        return (
          <article key={details._id}>
            <h1>{details.title}</h1>
            <img
              src={
                details.thumbnail.path +
                "/portrait_uncanny." +
                details.thumbnail.extension
              }
            />
            <p>{details.description}</p>
          </article>
        );
      })}
    </main>
  );
};

export default Comics;
