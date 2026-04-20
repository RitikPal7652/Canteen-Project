import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [data, setData] = useState({ users: [], orders: [], foodItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard", {
          withCredentials: true,
        });
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError("Access Denied: You are not an Admin!");
        } else if (err.response?.status === 401) {
          setError("You must be logged in to view this page!");
        } else {
          setError("Error fetching dashboard data. Ensure backend is running.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.5rem', color: 'var(--text-muted)' }}>Loading Admin Dashboard...</div>;

  if (error) return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <div style={{ background: '#fef2f2', color: '#991b1b', padding: '2rem', borderRadius: '10px', display: 'inline-block' }}>
        <h2>⛔ System Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto", color: "var(--text-main)" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem" }}>Admin Dashboard</h1>
      
      {/* Users Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ paddingBottom: "1rem", borderBottom: "2px solid #e5e7eb" }}>Registered Customers ({data.users.length})</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>ID</th>
                <th style={{ padding: "1rem" }}>Name</th>
                <th style={{ padding: "1rem" }}>Email</th>
                <th style={{ padding: "1rem" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "1rem", color: "#6b7280" }}>{u._id}</td>
                  <td style={{ padding: "1rem", fontWeight: 600 }}>{u.username}</td>
                  <td style={{ padding: "1rem" }}>{u.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ background: u.role === "admin" ? "#dcfce7" : "#e0e7ff", color: u.role === "admin" ? "#166534" : "#3730a3", padding: "4px 8px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 600 }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orders Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ paddingBottom: "1rem", borderBottom: "2px solid #e5e7eb" }}>Recent Orders ({data.orders.length})</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Order ID</th>
                <th style={{ padding: "1rem" }}>Customer</th>
                <th style={{ padding: "1rem" }}>Total</th>
                <th style={{ padding: "1rem" }}>Status</th>
                <th style={{ padding: "1rem" }}>Method</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((o) => (
                <tr key={o._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "1rem", color: "#6b7280" }}>{o._id}</td>
                  <td style={{ padding: "1rem", fontWeight: 600 }}>{o.user ? o.user.username : "Unknown"}</td>
                  <td style={{ padding: "1rem", color: "var(--primary)" }}>₹{o.totalAmount}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 600 }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>{o.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admin;
