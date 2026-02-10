/* This file is from the code-along dated 2026-02-03. */

import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import type { MovieData } from "../../types/movieTypes";

export function Details() {
  // useParams hook der "trækker" params ud fra vores URL
  const params = useParams();

  // Vi har kaldt den slug inde i vores router, så params.slug
  /* See files 
  App.tsx 
  poster.tsx (file for the component called Poster) */
  console.log('params', params.slug);

  // Brug params til at fetche en bestemt movie poster
  const { data, isLoading, error } = useFetch<MovieData>(`http://localhost:4000/posters/${params.slug}`);

  if (isLoading) {
    return <h1>Loading...</h1>
  };

  if (error) {
    return <h1>Error...</h1>
  };

  console.log('slug data', data);
  return <h1>{data?.name}</h1>
}
