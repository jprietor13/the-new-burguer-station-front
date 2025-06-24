import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import type { Burger, Option } from "../types/types";
import toast from "react-hot-toast";

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
        toast.error("Error al cargar el menú");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!burger) return;

    const getPrice = (selected: string[], options: Option[]) =>
      selected.reduce((acc, name) => {
        const found = options.find((opt) => opt.name === name);
        return acc + Number(found?.price || 0);
      }, 0);

    const sidePrice = availableSides.find((s) => s.name === side)?.price || 0;
    const drinkPrice =
      availableDrinks.find((d) => d.name === drink)?.price || 0;

    const extrasPrice = getPrice(extras, availableExtras);
    const saucesPrice = getPrice(sauces, availableSauces);

    const total =
      Number(burger.price || 0) +
      Number(extrasPrice) +
      Number(saucesPrice) +
      Number(sidePrice) +
      Number(drinkPrice);

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
        toast.error(`Solo puede seleccionar hasta ${max} opciones`);
        return;
      }
      setSelected([...selected, value]);
    }
  };

  const handleSubmit = async () => {
    if (!burger || !side || !drink) {
      toast.error("Debe llenar todos los campos");
      return;
    }

    const orderData = {
      burgerId: burger.id,
      extras,
      sauces,
      side,
      drink,
      totalPrice: Number(totalPrice).toFixed(2),
    };

    try {
      await api.post("/orders", orderData);
      toast.success("¡Pedido realizado con éxito!");
      navigate("/");
    } catch (err) {
      console.error("Error al hacer pedido", err);
      toast.error("Hubo un error al enviar el pedido");
    }
  };

  if (!burger)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-20">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        Personalice su "{burger.name}"
      </h2>
      <p className="text-gray-600 text-center mb-6">{burger.description}</p>
      <p className="text-center text-yellow-600 font-semibold mb-4">
        Precio base: ${Number(burger.price).toFixed(2)}
      </p>

      <article className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Extras (máx 3)</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableExtras.map((extra) => (
            <label key={extra.name} className="flex items-center gap-2">
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
      </article>
      <hr className="my-6 border-t-2 border-yellow-400 mb-2" />

      <article className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Salsas (máx 2)</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableSauces.map((sauce) => (
            <label key={sauce.name} className="flex items-center gap-2">
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
      </article>
      <hr className="my-6 border-t-2 border-yellow-400 mb-2" />

      <article className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Acompañamiento</h3>
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona...</option>
          {availableSides.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} (+${s.price})
            </option>
          ))}
        </select>
      </article>
      <hr className="my-6 border-t-2 border-yellow-400 mb-2" />

      <article className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Bebida</h3>
        <select
          value={drink}
          onChange={(e) => setDrink(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona...</option>
          {availableDrinks.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name} (+${d.price})
            </option>
          ))}
        </select>
      </article>

      <p className="text-xl font-bold text-center text-green-600 mb-4">
        Total: ${Number(totalPrice).toFixed(2)}
      </p>

      <article className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
        >
          Confirmar Pedido
        </button>
      </article>
    </section>
  );
};
