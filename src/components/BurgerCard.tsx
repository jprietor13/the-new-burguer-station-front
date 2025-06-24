import { useNavigate } from "react-router-dom";
import type { PropsBurger } from "../types/types";

export const BurgerCard = ({ burger }: PropsBurger) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/order/${burger.id}`)}
      className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
    >
      <img
        src={`/images/burgers/${burger.image}`}
        alt={burger.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{burger.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{burger.description}</p>
        <p className="text-lg text-yellow-600 font-semibold">
          <span className="text-black font-bold">Precio:</span> $
          {Number(burger.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
