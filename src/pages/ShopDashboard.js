import React, { useEffect, useState } from "react";

export default function ShopDashboard() {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch("https://village-shop-backend-2.onrender.com/api/my-shop", {
      headers: {
        Authorization: sessionId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShop(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]); // ✅ FIXED: dependency added

  const toggleShop = async (isOpen) => {
    await fetch("https://village-shop-backend-2.onrender.com/api/shop/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionId,
      },
      body: JSON.stringify({ isOpen }),
    });

    setShop({ ...shop, isOpen });
  };

  if (loading) return <div className="page">Loading...</div>;

  if (!sessionId) return <div className="page">Please login as shopkeeper</div>;

  if (!shop) return <div className="page">Shop not found</div>;

  return (
    <div className="page">
      <div className="card">
        <h2>My Shop</h2>

        <p>
          Current Status:{" "}
          <b style={{ color: shop.isOpen ? "green" : "red" }}>
            {shop.isOpen ? "OPEN" : "CLOSED"}
          </b>
        </p>

        <button
          className="btn btn-primary"
          disabled={shop.isOpen}
          onClick={() => toggleShop(true)}
        >
          OPEN
        </button>

        <br />
        <br />

        <button
          className="btn btn-danger"
          disabled={!shop.isOpen}
          onClick={() => toggleShop(false)}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
