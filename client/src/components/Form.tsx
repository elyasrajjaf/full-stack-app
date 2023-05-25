import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Form() {
  const navigate = useNavigate();

  const [meuble, setMeuble] = useState({
    name: "",
    materiaux: "",
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
      <h1>Form</h1>
      <p>Formulaire de création de meuble</p>
      <div>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
          {alert.type && <Alert type={alert.type} message={alert.message} />}
          <div className="mb-4 p-4">
            <label htmlFor="name">Nom du meuble</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setMeuble({ ...meuble, name: e.target.value })}
              className="rounded-md shadow-md border-gray-300 border-2 p-2"
            />
          </div>
          <div className="mb-4 p-4">
            <label htmlFor="materiaux">Matériaux</label>
            <input
              type="text"
              id="materiaux"
              onChange={(e) => setMeuble({ ...meuble, materiaux: e.target.value })}
              className="rounded-md shadow-md border-gray-300 border-2 p-2"
            />
          </div>
          <div className="mb-4 p-4">
            <label htmlFor="category">Catégorie</label>
            <input
              type="text"
              id="category"
              onChange={(e) => setMeuble({ ...meuble, category: e.target.value })}
              className="rounded-md shadow-md border-gray-300 border-2 p-2"
            />
          </div>
          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
}
