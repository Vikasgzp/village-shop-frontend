const API_BASE = "https://village-shop-backend-2.onrender.com/api";

export async function getShops(category, village) {
  const res = await fetch(
    `${API_BASE}/shops?category=${category}&village=${village}`,
  );
  return res.json();
}
