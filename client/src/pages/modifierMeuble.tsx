import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ModifierMeuble() {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [meuble, setMeuble] = useState({
    name: "",
    materiaux: [""],
    category: "",
  });

  
  useEffect(() => {
      const getMeuble = async () => {
        const response = await fetch(`http://localhost:8080/meubles/${id}`);
        const data = await response.json();
        setMeuble(data);
      };
        getMeuble();
    }, []);

  const updateMeuble = async (meuble: any) => {
    try {
      await fetch(`http://localhost:8080/meubles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meuble),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMeuble(meuble);
  };

  if (!meuble) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md w-1/3">
          <div className="mb-4 p-4">
            <label htmlFor="name" className="w-full">
              Nom du meuble
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setMeuble({ ...meuble, name: e.target.value })}
              value={meuble.name}
              className="rounded-md border-gray-700 border-2 p-2 w-full"
            />
          </div>
          <div className="mb-4 p-4">
            <label htmlFor="materiaux" className="w-full">
              Matériaux
            </label>
            <input
              type="text"
              id="materiaux"
              onChange={(e) => setMeuble({ ...meuble, materiaux: e.target.value.split(",") })}
              value={meuble.materiaux}
              className="rounded-md border-gray-700 border-2 p-2 w-full"
            />
          </div>
          <div className="mb-4 p-4">
            <label htmlFor="category" className="w-full">
              Catégorie
            </label>
            <input
              type="text"
              id="category"
              onChange={(e) => setMeuble({ ...meuble, category: e.target.value })}
              value={meuble.category}
              className="rounded-md border-gray-700 border-2 p-2 w-full"
            />
          </div>
          <button type="submit" className="py-3 px-12 bg-blue-500 text-white rounded-md">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
}
