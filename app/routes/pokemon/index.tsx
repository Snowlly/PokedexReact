import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PokemonProvider, usePokemonContext } from "../../contexts/pokemon/PokemonContext";

const extractIdFromUrl = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : null;
};

const PokemonListContent = () => {
    const { pokemons, fetchPokemons } = usePokemonContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPokemons().finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (!pokemons.length) return <p>Aucun Pokémon trouvé.</p>;

    return (
        <div className="pokemon-grid">
            {pokemons.map((pokemon) => {
                const id = extractIdFromUrl(pokemon.url);
                const imageUrl = id
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    : "";

                return (
                    <NavLink to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="pokemon-card">
                        <img src={imageUrl} alt={pokemon.name} />
                        <div>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default function PokemonListPage() {
    return (
        <PokemonProvider>
            <h1 className="Title">Liste des Pokémons</h1>
            <PokemonListContent />
        </PokemonProvider>
    );
}
