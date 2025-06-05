import { type RouteConfig, index, route, file } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    // Route /pokemon (avec composant "layout")
    route("pokemon", "routes/pokemon.tsx", [
        index("routes/pokemon/index.tsx"), // /pokemon
        route(":pokemonName", "routes/pokemon/$pokemonName.tsx"), // /pokemon/:pokemonName
    ]),
] satisfies RouteConfig;
