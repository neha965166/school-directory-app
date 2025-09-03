// pages/addSchool.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const onSubmit = async (data) => {
    setLoading(true);
    setServerMsg("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "image" && v && v[0]) formData.append(k, v[0]);
        else formData.append(k, v);
      });

      const res = await fetch("/api/schools/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setServerMsg("✅ " + json.message);
      reset();
    } catch (e) {
      setServerMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f7f7f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#fff",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: 16 }}>Add School</h1>
        <p style={{ color: "#666", marginBottom: 24 }}>
          Enter details below. Fields marked * are required.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div style={{ gridColumn: "span 2" }}>
              <label>School Name *</label>
              <input
                {...register("name", {
                  required: "School name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
                placeholder="e.g., Sunrise Public School"
                style={inputStyle}
              />
              {errors.name && (
                <span style={errStyle}>{errors.name.message}</span>
              )}
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label>Address *</label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Street, Area"
                style={inputStyle}
              />
              {errors.address && (
                <span style={errStyle}>{errors.address.message}</span>
              )}
            </div>

            <div>
              <label>City *</label>
              <input
                {...register("city", { required: "City is required" })}
                placeholder="Lucknow"
                style={inputStyle}
              />
              {errors.city && (
                <span style={errStyle}>{errors.city.message}</span>
              )}
            </div>

            <div>
              <label>State *</label>
              <input
                {...register("state", { required: "State is required" })}
                placeholder="Uttar Pradesh"
                style={inputStyle}
              />
              {errors.state && (
                <span style={errStyle}>{errors.state.message}</span>
              )}
            </div>
            <div>
              <label>Contact *</label>
              <input
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9+\-()\s]{7,20}$/i,
                    message: "Invalid contact",
                  },
                })}
                placeholder="9876543210"
                style={inputStyle}
              />
              {errors.contact && (
                <span style={errStyle}>{errors.contact.message}</span>
              )}
            </div>

            <div>
              <div>
                <label>Contact *</label>
                <input
                  {...register("contact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9+\-()\s]{7,20}$/i,
                      message: "Invalid contact",
                    },
                  })}
                  placeholder="9876543210"
                  style={inputStyle}
                />
                {errors.contact && (
                  <span style={errStyle}>{errors.contact.message}</span>
                )}
              </div>

              <div></div>
              <label>Email *</label>
              <input
                type="email"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="info@school.com"
                style={inputStyle}
              />
              {errors.email_id && (
                <span style={errStyle}>{errors.email_id.message}</span>
              )}
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label>School Image (max 5MB)</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                style={inputStyle}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Saving…" : "Save School"}
          </button>
        </form>

        {serverMsg && <div style={{ marginTop: 16 }}>{serverMsg}</div>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  outline: "none",
  marginTop: 6,
};
const errStyle = { color: "#d00", fontSize: 12 };

const btnStyle = {
  marginTop: 20,
  padding: "12px 18px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
};
