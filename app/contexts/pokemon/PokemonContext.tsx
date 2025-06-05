import React, { createContext, useState, useContext } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonDetails {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
}

interface PokemonContextType {
    pokemons: Pokemon[];
    selectedPokemon: PokemonDetails | null;
    fetchPokemons: () => Promise<void>;
    fetchPokemonDetails: (name: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
            setPokemons(response.data.results);
        } catch (error) {
            console.error("Erreur fetchPokemons:", error);
        }
    };

    const fetchPokemonDetails = async (name: string) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setSelectedPokemon(response.data);
        } catch (error) {
            console.error("Erreur fetchPokemonDetails:", error);
            setSelectedPokemon(null);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemons, selectedPokemon, fetchPokemons, fetchPokemonDetails }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (!context) throw new Error("usePokemonContext must be used within PokemonProvider");
    return context;
};
