import type { SetStateAction } from "react";
import { useFetch } from "../../hooks/useFetch";
import type { Genre } from "../../types/movieTypes";
import style from "./genreselection.module.scss";

interface GenreSelectProps {
    // I had guessed: setSelectedGenre: (text: string) => void;
    setSelectedGenre: React.Dispatch<SetStateAction<String>>;
};

export function GenreSelect({setSelectedGenre}: GenreSelectProps) {
    const { data, isLoading, error } = useFetch<Array<Genre>>("http://localhost:4000/genre");

    console.log(data);

    if (isLoading) {
        return <p>Loading genres...</p>
    };

    if (error) {
        return <b>Error: {error}</b>
    };

    return (
        <aside>
            <ul className={style.genreStyle}>
                {data?.map((item) => {
                    return (
                        <li key={item.id} onClick={() => setSelectedGenre(item.slug)}>
                            {item.title}
                        </li>
                    )
                })}
            </ul>
        </aside>
    );
};