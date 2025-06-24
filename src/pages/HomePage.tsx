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
    <section className="min-h-screen bg-yellow-50 px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-yellow-700 mb-8">
        🍔 Nuestro Menú de Hamburguesas
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando menú...</p>
      ) : (
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {burgers.map((burger) => (
            <BurgerCard
              key={burger.id}
              burger={{
                ...burger,
                image: imageMap[burger.name] || "default.png",
              }}
            />
          ))}
        </article>
      )}
    </section>
  );
};
