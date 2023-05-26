import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

export default function CardMeuble({ meuble }: any) {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const deleteMeuble = async () => {
    try {
      fetch(`http://localhost:8080/meubles/${meuble._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("Le meuble a bien été supprimé");
        setAlert({
          type: "success",
          message: "Suppression réussie",
        });

        setTimeout(() => {
          setAlert({
            type: "",
            message: "",
          });
          window.location.reload();
        }, 3000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      {alert.type && <Alert type={alert.type} message={alert.message} />}
      <p className="text-sm text-gray-700 italic">{meuble.category}</p>
      <h2 className="text-xl font-medium my-2">{meuble.name}</h2>
      {meuble.materiaux.map((materiau: string) => (
        <span className="text-xs text-white bg-sky-700 mr-1 px-2 rounded-sm">{materiau} </span>
      ))}
      <div className="flex justify-between items-center mt-5">
        <span className="rounded-sm bg-sky-600 text-white p-1 cursor-pointer">
          <Link to={`/modifier-meuble/${meuble._id}`}>Modifier</Link>
          </span>
        <span
          className="rounded-sm bg-red-600 text-white p-1 cursor-pointer"
          onClick={deleteMeuble}
        >
          Supprimer
        </span>
      </div>
    </div>
  );
}
