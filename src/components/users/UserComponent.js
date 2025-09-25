import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Action/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  const roleColors = {
    Admin: "#0ea5e9",
    User: "#22c55e",
  };

  // Filtrer les utilisateurs selon recherche et rôle
  const filteredUsers = users
    ? users.filter((user) => {
        const role = user.isAdmin ? "Admin" : "User";
        const matchesRole =
          roleFilter === "all" ? true : role === roleFilter;
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
      })
    : [];

  return (
    <section className="content-main">
      <div className="content-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : filteredUsers.length === 0 ? (
            <p className="text-muted">No users found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {filteredUsers.map((user) => {
                const role = user.isAdmin ? "Admin" : "User";
                return (
                  <div className="col mb-3" key={user._id}>
                    <div
                      className="card shadow-sm text-white p-4"
                      style={{
                        backgroundColor: roleColors[role],
                        transition: "transform 0.2s, box-shadow 0.2s",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 10px rgba(0,0,0,0.1)";
                      }}
                    >
                      <h5 className="card-title">{user.name}</h5>
                      <p className="mb-1">{role}</p>
                      <p>
                        <a
                          href={`mailto:${user.email}`}
                          className="text-white"
                          style={{ textDecoration: "underline" }}
                        >
                          {user.email}
                        </a>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
