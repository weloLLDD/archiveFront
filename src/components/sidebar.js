 import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // State pour sous-menu Rapports & Archives
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        {/* Logo */}
        <div
          className="aside-top"
          style={{
            backgroundColor: "#334155",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <Link
            to="/"
            className="brand-wrap"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src="/images/logo12.png"
              style={{ height: "90px", objectFit: "contain" }}
              className="logo"
              alt="Archives Dashboard"
            />
          </Link>

          <h2
            style={{
              color: "white",
              fontSize: "18px",
              marginTop: "10px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ArchivaTech Solutions
          </h2>

          <div style={{ marginTop: "10px" }}>
            <button
              className="btn btn-icon btn-aside-minimize"
              style={{
                borderRadius: "50%",
                backgroundColor: "#1e293b",
                border: "none",
                padding: "8px",
                transition: "all 0.3s ease",
              }}
            >
              <i className="text-white fas fa-stream"></i>
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav>
          <ul className="menu-aside">
            {/* Tableau de bord toujours visible */}
            <li className="menu-item">
              <NavLink className="menu-link" to="/" end>
                <i className="icon fas fa-archive"></i>
                <span className="text">Tableau de bord</span>
              </NavLink>
            </li>

            {/* Menus accessibles à tous */}
            <li className="menu-item">
              <NavLink className="menu-link" to="/products">
                <i className="icon fas fa-folder"></i>
                <span className="text">Tous les dossiers</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink className="menu-link" to="/addproduct">
                <i className="icon fas fa-file-upload"></i>
                <span className="text">Ajouter un dossier</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink className="menu-link" to="/depense">
                <i className="icon fas fa-history"></i>
                <span className="text">Historique</span>
              </NavLink>
            </li>

            {/* Profil toujours visible */}
            {userInfo && (
              <li className="menu-item">
                <NavLink className="menu-link" to="/category">
                  <i className="icon fas fa-user-circle"></i>
                  <span className="text">Profil</span>
                </NavLink>
              </li>
            )}

            {/* Admin uniquement */}
            {userInfo && userInfo.isAdmin && (
              <>
                <li className="menu-item">
                  <NavLink className="menu-link" to="/users">
                    <i className="icon fas fa-users"></i>
                    <span className="text">Utilisateurs</span>
                  </NavLink>
                </li>

                {/* Sous-menu Rapports & Archives */}
                <li className="menu-item has-submenu">
                  <a
                    href="#!"
                    className="menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmenuOpen(!submenuOpen);
                    }}
                  >
                    <i className="icon fas fa-chart-bar"></i>
                    <span className="text">Rapports & Consulter</span>
                    <i
                      className={`fas fa-chevron-down float-end ms-auto ${
                        submenuOpen ? "rotate" : ""
                      }`}
                    ></i>
                  </a>
                  <ul className={`submenu ${submenuOpen ? "open" : ""}`} id="submenu-gestion">
                    <li>
                      <NavLink className="submenu-link" to="/Invoice">
                        Rapport par dossier
                      </NavLink>
                    </li>
                  
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Styles CSS */}
      <style>{`
        .menu-link {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          color: #475569;
          text-decoration: none;
          font-weight: 500;
          border-radius: 8px;
          margin: 4px 10px;
          transition: all 0.3s ease;
        }

        .menu-link:hover {
          background-color: #f1f5f9;
          color: #334155;
          transform: translateX(4px);
        }

        .menu-link.active {
          background-color: #334155; 
          color: white;
          font-weight: 600;
        }

        .menu-link.active i {
          color: white;
        }

        .submenu {
          list-style: none;
          padding-left: 0;
          display: none;
        }

        .submenu.open {
          display: block;
        }

        .submenu-link {
          display: block;
          padding: 8px 25px;
          color: #475569;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .submenu-link:hover {
          background-color: #f1f5f9;
          color: #334155;
        }

        .submenu-link.active {
          background-color: #334155;
          color: white;
          font-weight: 600;
        }

        .icon {
          margin-right: 10px;
        }

        .rotate {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
