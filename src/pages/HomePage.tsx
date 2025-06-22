import { useEffect, useState } from "react";
import api from "../api/api";
import type { Burger } from "../types/types";
import { BurgerCard } from "../components/BurgerCard";

export const HomePage = () => {
  const [burgers, setBurges] = useState<Burger[]>([]);
  const [loading, setyLoading] = useState<boolean>(true);

  const imageMap: Record<string, string> = {
    "La Montañesa": "montanesa.png",
    "El Ranchero": "ranchero.png",
    "Veggie Mediterránea": "mediterraneo.png",
    "Doble Búfalo": "bufalo.png",
    "Mar y Tierra": "mar_tierra.png",
  };

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await api.get("/burgers");
        setBurges(response.data);
      } catch (err) {
        console.error("Error al obtener el listado de hamburguesas", err);
      } finally {
        setyLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  return (
    <div>
      <h2>Menú de Hamburguesas</h2>
      {loading ? (
        <p>Cargando menu...</p>
      ) : (
        burgers.map((burger) => (
          <BurgerCard
            key={burger.id}
            burger={{
              ...burger,
              image: imageMap[burger.name] || "default.png",
            }}
          />
        ))
      )}
    </div>
  );
};
