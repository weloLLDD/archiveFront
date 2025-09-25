import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { listDocument } from "../../Redux/Action/DocumentAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const Main = () => {
  const dispatch = useDispatch();
  const documentList = useSelector((state) => state.documentList);
  const { loading, error, documents, totalDocuments } = documentList;
  const [recentActions, setRecentActions] = useState([]);

  // Couleurs pour chaque type
  const typeColors = {
    CV: "#0ea5e9",         // bleu
    Attestation: "#22c55e", // vert
    Offre: "#ec4899",       // rose
    Contrat: "#facc15",     // jaune
  };

  useEffect(() => {
    dispatch(listDocument(1, 100));
  }, [dispatch]);

  useEffect(() => {
    if (documents) {
      const actions = [];
      documents.forEach((doc) => {
        if (doc.history && doc.history.length > 0) {
          doc.history.forEach((h) => {
            actions.push({
              docTitle: doc.title,
              action: h.action,
              user: h.user?.name || "Utilisateur supprimé",
              date: new Date(h.date),
            });
          });
        }
      });
      actions.sort((a, b) => b.date - a.date);
      setRecentActions(actions.slice(0, 10));
    }
  }, [documents]);

  // Préparer données pour graphique par type
  const typeData = [];
  if (documents) {
    const typeCounts = {};
    documents.forEach((doc) => {
      const type = doc.type || "Contrat"; // valeur par défaut
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    for (const key in typeCounts) {
      typeData.push({
        name: key,
        count: typeCounts[key],
        color: typeColors[key] || "#a1a1aa",
      });
    }
  }

  // Préparer données pour graphique documents récents par mois
  const monthlyData = [];
  if (documents) {
    const monthCounts = {};
    documents.forEach((doc) => {
      const month = new Date(doc.createdAt).toLocaleString("fr-FR", {
        month: "short",
        year: "numeric",
      });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    for (const key in monthCounts) {
      monthlyData.push({ month: key, count: monthCounts[key] });
    }
    monthlyData.sort((a, b) => new Date(a.month) - new Date(b.month));
  }

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  return (
    <section className="content-main container mt-4">
      <div className="content-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="content-title">📊 Dashboard</h2>
        <div className="admin-profile">
          <i className="fa fa-user-circle me-2"></i> Admin
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <>
          {/* ==== STATISTICS CARDS ==== */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card p-4 shadow-sm text-center bg-white border-0 rounded-lg">
                <h3 className="text-indigo-600">{totalDocuments}</h3>
                <p className="text-gray-500">Total Documents</p>
              </div>
            </div>
            {typeData.map((t, idx) => (
              <div className="col-md-3 mb-3" key={idx}>
                <div
                  className="card p-4 shadow-sm text-center rounded-lg"
                  style={{
                    backgroundColor: typeColors[t.name] || "#a1a1aa",
                    color: "#fff",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3>{t.count}</h3>
                  <p>{t.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ==== GRAPHIQUES ==== */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm p-3 rounded-lg">
                <h5 className="mb-3">📂 Répartition par Type</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={typeData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f1f5f9",
                        borderRadius: 8,
                        border: "none",
                      }}
                      cursor={{ fill: "rgba(0,0,0,0.05)" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      radius={[5, 5, 0, 0]}
                      animationDuration={1500}
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card shadow-sm p-3 rounded-lg">
                <h5 className="mb-3">📅 Documents Récents par Mois</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f1f5f9",
                        borderRadius: 8,
                        border: "none",
                      }}
                      cursor={{ fill: "rgba(0,0,0,0.05)" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#6366f1"
                      radius={[5, 5, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ==== TABLEAU DOCUMENTS RÉCENTS ==== */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card shadow-sm p-3 rounded-lg">
                <h5 className="mb-3">📄 Documents Récents</h5>
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Owner</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents &&
                      documents.slice(0, 10).map((doc) => (
                        <tr key={doc._id}>
                          <td>{capitalize(doc.title)}</td>
                          <td>
                            <span
                              className="badge rounded-pill text-white px-3 py-1"
                              style={{
                                backgroundColor:
                                  typeColors[doc.type] || "#6b7280",
                              }}
                            >
                              {capitalize(doc.type)}
                            </span>
                          </td>
                          <td>{doc.owner?.name || "Utilisateur supprimé"}</td>
                          <td>
                            {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ==== ACTIONS RÉCENTES ==== */}
            <div className="col-md-4">
              <div className="card shadow-sm p-3 rounded-lg">
                <h5 className="mb-3">⚡ Actions Récentes</h5>
                <ul className="list-unstyled">
                  {recentActions.length === 0 ? (
                    <p className="text-muted">Pas d'actions récentes</p>
                  ) : (
                    recentActions.map((a, idx) => (
                      <li
                        key={idx}
                        className="mb-2 p-2 rounded"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "rgba(99,102,241,0.1)"
                              : "rgba(232,244,253,0.8)",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.02)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <strong>{a.user}</strong> {a.action}{" "}
                        <em>{capitalize(a.docTitle)}</em> –{" "}
                        {a.date.toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Main;
