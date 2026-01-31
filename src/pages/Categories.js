import React from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    { id: "kirana", label: "🛒 Kirana Store" },
    { id: "medical", label: "💊 Medical Store" },
    { id: "barber", label: "💇 Barber" },
    { id: "hardware", label: "🔧 Hardware" },
    { id: "food", label: "🍽️ Food" },
  ];

  return (
    <div className="page">
      <div className="heading">What do you need?</div>

      {categories.map((c) => (
        <div
          key={c.id}
          className="card"
          onClick={() => navigate(`/shops/${c.id}`)}
          style={{ fontSize: 20, cursor: "pointer" }}
        >
          {c.label}
        </div>
      ))}

      <div
        className="card"
        onClick={() => navigate("/shop-login")}
        style={{
          textAlign: "center",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🧑‍💼 Are you a shopkeeper? Login
      </div>
    </div>
  );
}
