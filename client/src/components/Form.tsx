import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Form() {
  const navigate = useNavigate();

  const [meuble, setMeuble] = useState({
    name: "",
    materiaux: [""],
    category: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!meuble.name || !meuble.materiaux || !meuble.category) {
      setAlert({
        type: "error",
        message: "Veuillez remplir tous les champs",
      });

      setTimeout(() => {
        setAlert({
          type: "",
          message: "",
        });
        setMeuble({
          name: "",
          materiaux: [],
          category: "",
        });
      }, 3000);

      return;
    }

    try {
      fetch("http://localhost:8080/meubles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meuble),
      }).then(() => {
        setAlert({
          type: "success",
          message: "Le meuble a bien été créé",
        });
      });

      setTimeout(() => {
        setAlert({
          type: "",
          message: "",
        });
        setMeuble({
          name: "",
          materiaux: [],
          category: "",
        });

        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Une erreur est survenue",
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md w-1/3">
          {alert.type && <Alert type={alert.type} message={alert.message} />}
          <div className="mb-4 p-4">
            <label htmlFor="name" className="w-full">
              Nom du meuble
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setMeuble({ ...meuble, name: e.target.value })}
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
              className="rounded-md border-gray-700 border-2 p-2 w-full"
            />
            <span className="italic text-xs text-gray-700">Rentrez les matériaux de meuble en séparent avec une virgule ",", par exemple: Plastique, Bois, ...</span>
          </div>
          <div className="mb-4 p-4">
            <label htmlFor="category" className="w-full">
              Catégorie
            </label>
            <input
              type="text"
              id="category"
              onChange={(e) => setMeuble({ ...meuble, category: e.target.value })}
              className="rounded-md border-gray-700 border-2 p-2 w-full"
            />
          </div>
          <button type="submit" className="py-3 px-12 bg-blue-500 text-white rounded-md">
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}
