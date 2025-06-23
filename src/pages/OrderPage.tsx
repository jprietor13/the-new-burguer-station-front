import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import type { Burger, Option } from "../types/types";

export const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [burger, setBurger] = useState<Burger | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [sauces, setSauces] = useState<string[]>([]);
  const [side, setSide] = useState("");
  const [drink, setDrink] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableExtras, setAvailableExtras] = useState<Option[]>([]);
  const [availableSauces, setAvailableSauces] = useState<Option[]>([]);
  const [availableSides, setAvailableSides] = useState<Option[]>([]);
  const [availableDrinks, setAvailableDrinks] = useState<Option[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [burgerRes, extrasRes, saucesRes, sidesRes, drinksRes] =
          await Promise.all([
            api.get(`/burgers/${id}`),
            api.get("/extras"),
            api.get("/sauces"),
            api.get("/sides"),
            api.get("/drinks"),
          ]);

        setBurger(burgerRes.data);
        setAvailableExtras(extrasRes.data);
        setAvailableSauces(saucesRes.data);
        setAvailableSides(sidesRes.data);
        setAvailableDrinks(drinksRes.data);
      } catch (err) {
        console.error("Error cargando datos del pedido", err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!burger) return;

    const getPrice = (selected: string[], options: Option[]) =>
      selected.reduce((acc, name) => {
        const found = options.find((opt) => opt.name === name);
        return acc + (found?.price || 0);
      }, 0);

    const sidePrice = availableSides.find((s) => s.name === side)?.price || 0;
    const drinkPrice =
      availableDrinks.find((d) => d.name === drink)?.price || 0;

    const extrasPrice = getPrice(extras, availableExtras);
    const saucesPrice = getPrice(sauces, availableSauces);

    const total =
      burger.price + extrasPrice + saucesPrice + sidePrice + drinkPrice;
    setTotalPrice(total);
  }, [
    burger,
    extras,
    sauces,
    side,
    drink,
    availableExtras,
    availableSauces,
    availableSides,
    availableDrinks,
  ]);

  const toggleSelect = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    max: number
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      if (selected.length >= max) {
        alert(`Solo puede seleccionar hasta ${max} opciones`);
        return;
      }
      setSelected([...selected, value]);
    }
  };

  const handleSubmit = async () => {
    if (!burger || !side || !drink) {
      alert("Complete todos los campos");
      return;
    }

    const orderData = {
      burgerId: burger.id,
      extras,
      sauces,
      side,
      drink,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    };

    try {
      await api.post("/orders", orderData);
      alert("¡Pedido realizado con éxito!");
      navigate("/");
    } catch (err) {
      console.error("Error al hacer pedido", err);
      alert("Hubo un error al enviar el pedido");
    }
  };

  if (!burger) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Pedido: {burger.name}</h2>
      <p>{burger.description}</p>
      <p>
        <strong>${burger.price.toFixed(2)}</strong>
      </p>

      <div>
        <h3>Extras (máx 3)</h3>
        {availableExtras.map((extra) => (
          <label key={extra.name}>
            <input
              type="checkbox"
              value={extra.name}
              checked={extras.includes(extra.name)}
              onChange={() => toggleSelect(extra.name, extras, setExtras, 3)}
            />
            {extra.name} (+${extra.price})
          </label>
        ))}
      </div>

      <div>
        <h3>Salsas (máx 2)</h3>
        {availableSauces.map((sauce) => (
          <label key={sauce.name}>
            <input
              type="checkbox"
              value={sauce.name}
              checked={sauces.includes(sauce.name)}
              onChange={() => toggleSelect(sauce.name, sauces, setSauces, 2)}
            />
            {sauce.name} {sauce.price > 0 ? `(+${sauce.price})` : "(Gratis)"}
          </label>
        ))}
      </div>

      <div>
        <h3>Acompañamiento</h3>
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="">Selecciona...</option>
          {availableSides.map((availableSide) => (
            <option key={availableSide.name} value={availableSide.name}>
              {availableSide.name} (+${availableSide.price})
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Bebida</h3>
        <select value={drink} onChange={(e) => setDrink(e.target.value)}>
          <option value="">Selecciona...</option>
          {availableDrinks.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name} (+${d.price})
            </option>
          ))}
        </select>
      </div>

      <p>
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </p>

      <button onClick={handleSubmit}>Confirmar Pedido</button>
    </div>
  );
};
