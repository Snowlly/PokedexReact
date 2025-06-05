import type { Route } from "./+types/home";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokédex React" },
    { name: "description", content: "Explorez les Pokémons avec React Router" },
  ];
}

export default function Home() {
  return (
      <div class="containerIndex">
        <h1>Bienvenue sur mon Pokédex !</h1>
        <p>Explorez les Pokémons de la 1ère génération via la PokéAPI.</p>
        <Link class="buttonList" to="/pokemon">
          Voir les Pokémons
        </Link>
      </div>
  );
}
