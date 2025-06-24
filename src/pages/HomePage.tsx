import { BurgerCard } from "../components/BurgerCard";
import { useHomePage } from "../hooks/useHomePage";

export const HomePage = () => {
  const { burgers, loading, imageMap } = useHomePage();

  return (
    <section className="min-h-screen bg-yellow-50 px-4">
      <h2 className="text-3xl font-bold text-center text-yellow-700 mb-8 pt-20">
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
