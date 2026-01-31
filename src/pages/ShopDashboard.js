import React, { useEffect, useState } from "react";

export default function ShopDashboard() {
  const [shop, setShop] = useState(null);
  const sessionId = localStorage.getItem("sessionId");

  function loadShop() {
    fetch("https://village-shop-backend-2.onrender.com/api/my-shop", {
      headers: { Authorization: sessionId },
    })
      .then((res) => res.json())
      .then(setShop);
  }

  function toggle(status) {
    fetch("https://village-shop-backend-2.onrender.com/api/shop/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionId,
      },
      body: JSON.stringify({ isOpen: status }),
    }).then(loadShop);
  }

  useEffect(loadShop, []);

  if (!shop) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <div className="card">
        <div className="heading">{shop.name}</div>

        <div className={shop.isOpen ? "status-open" : "status-closed"}>
          {shop.isOpen ? "🟢 OPEN" : "🔴 CLOSED"}
        </div>

        <br />

        <button
          className={`btn btn-primary ${shop.isOpen ? "btn-disabled" : ""}`}
          disabled={shop.isOpen}
          onClick={() => toggle(true)}
        >
          OPEN SHOP
        </button>

        <br />
        <br />

        <button
          className={`btn btn-danger ${!shop.isOpen ? "btn-disabled" : ""}`}
          disabled={!shop.isOpen}
          onClick={() => toggle(false)}
        >
          CLOSE SHOP
        </button>
      </div>
    </div>
  );
}
