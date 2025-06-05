import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PokemonProvider, usePokemonContext } from "../../contexts/pokemon/PokemonContext";

const PokemonDetailContent = () => {
    const { pokemonName } = useParams();
    const { selectedPokemon, fetchPokemonDetails } = usePokemonContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pokemonName) {
            fetchPokemonDetails(pokemonName).finally(() => setLoading(false));
        }
    }, [pokemonName]);

    if (loading) return <p>Chargement...</p>;
    if (!selectedPokemon) return <p>Pokémon non trouvé.</p>;

    return (
        <div className="pokemon-detail">
            <h1>{selectedPokemon.name}</h1>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />

            <div className="pokemon-section">
                <h2>Types</h2>
                <ul>
                    {selectedPokemon.types.map((t, idx) => (
                        <li key={idx}>{t.type.name}</li>
                    ))}
                </ul>
            </div>

            <div className="pokemon-section">
                <h2>Capacités</h2>
                <ul>
                    {selectedPokemon.abilities.map((a, idx) => (
                        <li key={idx}>{a.ability.name}</li>
                    ))}
                </ul>
            </div>

            <Link to="/pokemon" className="back-link">
                Retour à la liste
            </Link>
        </div>
    );

};

export default function PokemonDetailPage() {
    return (
        <PokemonProvider>
            <PokemonDetailContent />
        </PokemonProvider>
    );
}
