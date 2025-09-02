// pages/showSchools.jsx
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/schools");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setSchools(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // search filter
  const filtered = schools.filter((s) => {
    const text =
      (s.name + " " + s.city + " " + s.state + " " + s.address).toLowerCase();
    return text.includes(q.toLowerCase());
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f9",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header and Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h1>Schools</h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, city, state…"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              width: 280,
            }}
          />
        </div>

        {/* Loader/Error */}
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "#d00" }}>{error}</p>}

        {/* School cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((s) => (
            <div
              key={s.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ height: 160, background: "#f0f3f7" }}>
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "#999",
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>
              <div style={{ padding: 14 }}>
                <h3 style={{ margin: "0 0 6px 0" }}>{s.name}</h3>
                <p style={{ margin: 0, color: "#555" }}>{s.address}</p>
                <p style={{ margin: "6px 0 0 0", color: "#777" }}>
                  {s.city}
                  {s.state ? `, ${s.state}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && !loading && !error && (
          <p style={{ marginTop: 20, color: "#555" }}>No schools found.</p>
        )}
      </div>
    </div>
  );
}

