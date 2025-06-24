import { useOrderPage } from "../hooks/useOrderPage";

export const OrderPage = () => {
  const {
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
  } = useOrderPage();

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
