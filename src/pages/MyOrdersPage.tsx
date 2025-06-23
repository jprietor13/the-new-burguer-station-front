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

  if (loading) return <p>Cargando sus pedidos...</p>;
  if (orders.length === 0) return <p>Aún no ha realizado ningun pedido.</p>;

  return (
    <div>
      <h2>Mis Pedidos</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>{order.burger.name}</h3>
          <p>
            <strong>Extras:</strong>{" "}
            {order.extras.length > 0 ? order.extras.join(", ") : "Ninguno"}
          </p>
          <p>
            <strong>Salsas:</strong>{" "}
            {order.sauces.length > 0 ? order.sauces.join(", ") : "Ninguna"}
          </p>
          <p>
            <strong>Acompañamiento:</strong> {order.side}
          </p>
          <p>
            <strong>Bebida:</strong> {order.drink}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
      <button onClick={() => (window.location.href = "/")}>
        Volver al Home
      </button>
    </div>
  );
};
