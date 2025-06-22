import { useNavigate } from "react-router-dom";
import type { PropsBurger } from "../types/types";

export const BurgerCard = ({ burger }: PropsBurger) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/order/${burger.id}`)}>
      <img
        src={`/images/burgers/${burger.image}`}
        alt={burger.name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <h3>{burger.name}</h3>
      <p>{burger.description}</p>
      <p>
        <strong>${burger.price}</strong>
      </p>
    </div>
  );
};
