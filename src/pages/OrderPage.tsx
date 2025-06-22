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
  const [loading, setLoading] = useState(true);
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
        setAvailableExtras(extrasRes.data as Option[]);
        setAvailableSauces(saucesRes.data as Option[]);
        setAvailableSides(sidesRes.data as Option[]);
        setAvailableDrinks(drinksRes.data as Option[]);
      } catch (err) {
        console.error("Error cargando datos del pedido", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!burger || !side || !drink) {
      alert("Completa todos los campos");
      return;
    }

    const orderData = {
      burgerId: burger.id,
      extras,
      sauces,
      side,
      drink,
      totalPrice: burger.price + 2.5 + extras.length * 1.5,
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

  if (loading) return <p>Cargando...</p>;
  if (!burger) return <p>Hamburguesa no encontrada</p>;

  return (
    <div>
      <h2>Pedido: {burger.name}</h2>
      <p>{burger.description}</p>
      <p>
        <strong>${burger.price.toFixed(2)}</strong>
      </p>

      <div>
        <h3>Extras</h3>
        {availableExtras.map((extra) => (
          <label key={extra.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={extra.name}
              checked={extras.includes(extra.name)}
              onChange={(e) => {
                const value = e.target.value;
                setExtras((prev) =>
                  prev.includes(value)
                    ? prev.filter((x) => x !== value)
                    : [...prev, value]
                );
              }}
            />
            {extra.name}
          </label>
        ))}
      </div>

      <div>
        <h3>Salsas</h3>
        {availableSauces.map((sauce) => (
          <label>
            <input
              type="checkbox"
              value={sauce.id}
              checked={sauces.includes(sauce.name)}
              onChange={(e) => {
                const value = e.target.value;
                setSauces((prev) =>
                  prev.includes(value)
                    ? prev.filter((x) => x !== value)
                    : [...prev, value]
                );
              }}
            />
            {sauce.name}
          </label>
        ))}
      </div>

      <div>
        <h3>Acompañamiento</h3>
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="">Selecciona...</option>
          {availableSides.map((s) => (
            <option key={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Bebida</h3>
        <select value={drink} onChange={(e) => setDrink(e.target.value)}>
          <option value="">Selecciona...</option>
          {availableDrinks.map((d) => (
            <option key={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Confirmar Pedido</button>
    </div>
  );
};
