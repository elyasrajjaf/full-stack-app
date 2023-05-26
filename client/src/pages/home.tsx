import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardMeuble from "../components/CardMeuble";

type MeubleType = {
  name: string;
  materiaux: string[];
  category: string;
};

export default function Home() {
  const [meubles, setMeubles] = useState([]);

  useEffect(() => {
    const getMeubles = async () => {
      try {
        const response = await fetch("http://localhost:8080/meubles");
        if (response.ok) {
          const data = await response.json();
          setMeubles(data);
        } else {
          throw new Error("Response was not ok.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMeubles();
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex justify-center items-center">
      <div>
      <h1 className="mb-10 text-4xl font-bold">Bienvenue sur le site de meubles</h1>
      <p className="text-lg font-normal mb-4">Voici les meubles disponible:</p>
      <div className="grid grid-cols-3 gap-4">
        {meubles.map((meuble: MeubleType) => (
          <CardMeuble meuble={meuble} />
        ))}
      </div>
      <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/create-meuble">
        Ajouter un meuble
        </Link>
      </button>
      </div>
    </div>
  );
}
