import { type RouteConfig, index, route, file } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("pokemon", "routes/pokemon.tsx", [
        index("routes/pokemon/index.tsx"),
        route(":pokemonName", "routes/pokemon/$pokemonName.tsx"),
    ]),
] satisfies RouteConfig;
