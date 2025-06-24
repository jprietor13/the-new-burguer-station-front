import { useState, useEffect } from "react";
import api from "../api/api";
import type { Order } from "../types/types";

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error al cargar pedidos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-yellow-600 font-semibold animate-pulse">
        Cargando sus pedidos...
      </div>
    );
  if (orders.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">
        Aún no has realizado ningún pedido. puede regresar al Home para realizar
        un pedido
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-4 pt-20">
      <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
        🧾 Mis Pedidos
      </h2>

      {orders.map((order) => (
        <article
          key={order.id}
          className="bg-white shadow-md rounded-lg p-4 mb-6 border-l-4 border-yellow-500"
        >
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            {order.burger.name}
          </h3>

          <p className="mb-1">
            <strong>Extras:</strong>{" "}
            {order.extras.length > 0 ? order.extras.join(", ") : "Ninguno"}
          </p>
          <p className="mb-1">
            <strong>Salsas:</strong>{" "}
            {order.sauces.length > 0 ? order.sauces.join(", ") : "Ninguna"}
          </p>
          <p className="mb-1">
            <strong>Acompañamiento:</strong> {order.side}
          </p>
          <p className="mb-1">
            <strong>Bebida:</strong> {order.drink}
          </p>
          <p className="mb-1 text-green-600 font-semibold">
            <strong>Total:</strong> ${Number(order.totalPrice).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Fecha de pedido:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </article>
      ))}
    </section>
  );
};
