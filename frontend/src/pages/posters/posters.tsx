/* I changed the order of my imports to match the teacher's verion of the codealongs 
because it takes too long to review these differences over and over again. */

import { Poster } from "../../components/poster/poster";
import { Grid } from "../../components/grid/grid";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import type { MovieData } from "../../types/movieTypes";
import { GenreSelect } from "../../components/genreSelect/genreSelection";
import { Title } from '../../components/title/title'
import { Dropdown } from "../../components/dropdown/dropdown";

export function Posters() {

    const [selectedGenre, setSelectedGenre] = useState<string>("komedie");
    const [selectedSort, setSelectedSort] = useState<string>("asc");

    /* It's important to be able to read the URL of endpoints and understand what the parts mean. 
    We can see in Postman that the API has sorting options identified by a key (sort_key).
    The attributes tell the API what values we want to fetch. Here, description is left out.
    This saves computational resources. Overfetching requires more than necessary from the server.

    Old version of code-along:
    const [posterData, setPosterData] = useState();
    useEffect(()=>{
        fetch("http://localhost:3000/posters?sort_key=random&limit=2&attributes=id,name,image,stock")
        .then(res => res.json())
        .then(data => setPosterData(data))
    }, []);
    */

    // Initialiser variabler til sortering
    /* Those are the variables that make the fetching URL dynamic. 
    Within that URL, the sorting method is specified. */
    let sort_Key = "random";
    let sort_Direction = "asc";

    // Hvis selectedSort er "name", så sæt sort_Key til 'name' og ellers sæt den til 'random'
    /* Since the default value of sort_Key is random, the else could have been omitted here. It's a bit redundant. */
    if (selectedSort === "name") {
        sort_Key = "name";
    } else {
        sort_Key = "random";
    };

    // Hvis selectedSort er 'asc' eller 'desc' så sæt sort_Direction til at være selectedSort (asc/desc)
    // Og sæt sort_Key til 'price'
    /* Thanks to the multiple conditional expressions, it is possible to use the values in the select menu to change multiple parameters in the fetching URL. */
    if (selectedSort === "asc" || selectedSort === "desc") {
        sort_Direction = selectedSort;
        sort_Key = "price";
    };

    /* Giving a type to the custom hook is necessary, at least in this case, otherwise there is a type error
    indicating that data is of type never, etc., when the map method is applied to it. 
    */
    const { data, isLoading, error } = useFetch<Array<MovieData>>(
        `http://localhost:4000/posters/list_by_genre/${selectedGenre}?sort_key=${sort_Key}&sort_direction=${sort_Direction}`
    );

    console.log("data", data);

    /* Alternatively: 
    if (isLoading)
    */
    if (isLoading === true) {
        return <h1>Loading data...</h1>
    };

    if (error) {
        return <h1>Error: {error}</h1>
    };

    // console.log(selectedGenre);

    return (
        <>
            <Title text="Plakater" />

            {/* Old version of code-along said: 
            
            <ul>
                <li onClick={()=> setSelectedGenre("drama")}>Drama</li>
                <li onClick={() => setSelectedGenre("gysere")}>Gyser</li>
            </ul>
            */}
            <Dropdown setSelectedSort={setSelectedSort} />

            {/* Other version of code-along: 
            <Grid gtc={2} gap={32}>
            */}
            <Grid gtc={"1fr 4fr"} gap={32}>
                {/* Maybe TO DO: debug even though the following error does not hinder the rendering.
                It was in the teacher's version of the code-along on GitHub on 2026-01-30.
                The setter provided as a prop does update a state with a value of type string. */}
                <GenreSelect setSelectedGenre={setSelectedGenre} />
                {/* Other verson of code-along: 
                <Grid gtc={3} gap={32}>
                */}
                <Grid gtc={"1fr 1fr 1fr"} gap={32}> 
                    {data?.map((item) => {
                        return (
                            <Poster
                                slug={item.slug}
                                key={item.id}
                                price={item.price}
                                imageUrl={item.image}
                                id={item.id}
                                genres={item.genres}
                                title={item.name}
                            />
                        )
                    })}
                </Grid>
            </Grid>
        </>
    );
};