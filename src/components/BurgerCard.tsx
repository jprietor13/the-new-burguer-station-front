import type { PropsBurger } from "../types/types";

export const BurgerCard = ({ burger, onSelect }: PropsBurger) => {
  return (
    <div onClick={() => onSelect?.(burger)}>
      <h3>{burger.name}</h3>
      <p>{burger.description}</p>
      <p>
        <strong>${burger.price}</strong>
      </p>
    </div>
  );
};
