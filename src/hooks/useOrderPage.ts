import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import type { Burger, Option } from "../types/types";
import toast from "react-hot-toast";

export const useOrderPage = () => {
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
      toast.success(
        "¡Pedido realizado con éxito, revise su correo con detalle de la orden!"
      );
      navigate("/");
    } catch (err) {
      console.error("Error al hacer pedido", err);
      toast.error("Hubo un error al enviar el pedido");
    }
  };

  return {
    burger,
    availableExtras,
    extras,
    setExtras,
    availableSauces,
    sauces,
    setSauces,
    side,
    setSide,
    availableSides,
    drink,
    setDrink,
    availableDrinks,
    totalPrice,
    toggleSelect,
    handleSubmit,
  };
};
