import type { PropsBurger } from "../types/types";

export const BurgerCard = ({ burger, onSelect }: PropsBurger) => {
  return (
    <div onClick={() => onSelect?.(burger)}>
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
