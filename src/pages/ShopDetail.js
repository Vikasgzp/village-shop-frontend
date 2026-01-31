import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [phone, setPhone] = useState("");
  const [notifyStatus, setNotifyStatus] = useState("");
  // "", "saved", "already"

  useEffect(() => {
    fetch(`https://village-shop-backend-2.onrender.com/api/shops/${id}`)
      .then((res) => res.json())
      .then(setShop);
  }, [id]);

  if (!shop) return <div className="page">Loading...</div>;

  const isMedical = shop.category === "medical";

  async function handleNotify() {
    if (!phone) return alert("Enter phone number");

    const res = await fetch(
      "https://village-shop-backend-2.onrender.com/api/notify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shop._id,
          phone,
        }),
      },
    );

    const data = await res.json();
    setNotifyStatus(data.status);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="heading">{shop.name}</div>

        <div className={shop.isOpen ? "status-open" : "status-closed"}>
          {shop.isOpen ? "🟢 OPEN" : "🔴 CLOSED"}
        </div>

        <p>📍 {shop.village}</p>

        <div style={{ fontSize: 14, color: "#555" }}>
          🕘 Usually open: {shop.openingTime || "9:00 AM"} –{" "}
          {shop.closingTime || "8:00 PM"}
        </div>

        <p>
          <b>Available:</b>
        </p>
        <ul>
          {shop.servicesAvailable.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        {/* OPEN */}
        {shop.isOpen && (
          <>
            <a href={`tel:${shop.phone}`}>
              <button className="btn btn-primary">📞 Call Shop</button>
            </a>
            <br />
            <br />
            <a
              href={`https://wa.me/91${shop.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-primary">📲 WhatsApp</button>
            </a>
          </>
        )}

        {/* CLOSED */}
        {!shop.isOpen && (
          <>
            <div
              style={{
                marginTop: 14,
                padding: 12,
                background: "#fbe9e7",
                borderRadius: 8,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Shop is currently closed
            </div>

            {/* NOTIFY UI */}
            <div style={{ marginTop: 12 }}>
              {notifyStatus === "" && (
                <>
                  <input
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 10,
                      marginBottom: 8,
                    }}
                  />
                  <button className="btn btn-primary" onClick={handleNotify}>
                    🔔 Notify me when open
                  </button>
                </>
              )}

              {notifyStatus === "saved" && (
                <div style={{ color: "#2e7d32", textAlign: "center" }}>
                  ✅ You’ll be notified when the shop opens
                </div>
              )}

              {notifyStatus === "already" && (
                <div style={{ color: "#ff6f00", textAlign: "center" }}>
                  ⚠️ You are already subscribed for notification
                </div>
              )}
            </div>

            {/* EMERGENCY OVERRIDE */}
            {isMedical && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  border: "1px dashed #c62828",
                  borderRadius: 8,
                }}
              >
                <b style={{ color: "#c62828" }}>🚨 Emergency only</b>
                <br />
                <a href={`tel:${shop.phone}`}>
                  <button className="btn btn-danger" style={{ marginTop: 8 }}>
                    📞 Emergency Call
                  </button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
