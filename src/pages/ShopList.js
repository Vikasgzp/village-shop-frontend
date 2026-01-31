import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ShopList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(
      `https://village-shop-backend-2.onrender.com/api/shops?category=${category}`,
    )
      .then((res) => res.json())
      .then(setShops);
  }, [category]);

  return (
    <div className="page">
      <div className="heading">{category.toUpperCase()} Shops</div>

      {shops.map((shop) => (
        <div
          key={shop._id}
          className="card"
          onClick={() => navigate(`/shop/${shop._id}`)}
          style={{ cursor: "pointer" }}
        >
          <div style={{ fontSize: 18 }}>{shop.name}</div>
          <div className={shop.isOpen ? "status-open" : "status-closed"}>
            {shop.isOpen ? "🟢 OPEN" : "🔴 CLOSED"}
          </div>
          <div style={{ fontSize: 14 }}>{shop.village}</div>
        </div>
      ))}
    </div>
  );
}
