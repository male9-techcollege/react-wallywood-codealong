/* I changed the order of the imports to match the teacher's version of the 
codealong because it takes too long to go through the comparison. */
/* Used in older version of codealong:
html-react-parser is for avoiding displaying the HTML tags when the fetched data includes text with HTML tags. 
The HTML elements are parsed so that they are treated as HTML elements, and not as text. 
import parse from "html-react-parser";
*/
//import { useState, useEffect } from "react";
import type { MovieData } from "../../types/movieTypes";
import { Title } from "../../components/title/title";
import { Poster } from "../../components/poster/poster";
import curtainImage from "../../assets/images/curtain.jpg";
import style from "./home.module.scss";
import { Grid } from "../../components/grid/grid";
import { useFetch } from "../../hooks/useFetch";

export function Home() {

    /* From a codealong before 2026-01-30.
    useState + useEffect was later replaced by the custom hook useFetch. 

    const [movieData, setMovieData] = useState<Array<MovieData>>();
    
    useEffect(() => {
        const url = "http://localhost:4000/posters?sort_key=random&limit=2&attributes=id,name,description,image,price";
        fetch(url)
            .then(res => res.json())
            // To log the array to the terminal in view of noting the data's structure: 
            // .then(data=> console.log("Data: ", data));
            .then(data => setMovieData(data));
    }, []);
    */

    /* Note from the codealong that I attended on 2026-01-30: 
    It's best to get the sorting done on the server side in order to increase speed on the client side.
    Sorting can be done by adding variables inside of template strings. */
    const { data, isLoading, error } = useFetch<Array<MovieData>>(
        "http://localhost:4000/posters?sort_key=random&limit=2&attributes=id,name,description,image,price"
    );
    
    if (isLoading) {
        return <h1>Loading data...</h1>
    }

    if (error) {
        return <h1>Error: {error}</h1>
    }

    return (
        <>
            <img
                src={curtainImage}
                alt="Image of a curtain"
                className={style.hero}
            />
            <Title text={"Sidste nyt..."} />
            {/* Other version of code-along said: 
            <Grid gtc="1fr 1fr" gap={32}>
            or
            <Grid gtc={2} gap={32}> 
            */}
            <Grid gtc={"1fr 1fr"} gap={32}>
                {
                    /* Renamed. Old code-along said: 
                    movieData && movieData.map */
                    data && data.map((item) => {
                        return (
                            // An even older version of code-along said (the parsing is now done by the Poster component):
                            // <div>
                            //     <img src={item.image} width="200px" />
                            //     <h4>{item.name}</h4>
                            //     {parse(item.description)}
                            //     <button>Læs mere</button>
                            // </div>
                            <Poster
                                key={item.id}
                                genres={item.genres}
                                title={item.name}
                                imageUrl={item.image}
                                description={item.description}
                                id={item.id}
                            />
                        );
                    })
                }
            </Grid>
        </>
    );
};