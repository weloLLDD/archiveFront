import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Action/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header
      className="main-header navbar"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Bouton menu mobile */}
      <div className="col-search">
        <button className="btn btn-icon btn-mobile" data-trigger="#offcanvas_aside">
          <i className="md-28 fas fa-bars"></i>
        </button>
      </div>

      {/* Section de navigation / notifications */}
      <div className="col-nav" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link className="nav-link btn-icon" title="Dark mode" to="#">
          <i className="fas fa-moon"></i>
        </Link>
        <Link className="nav-link btn-icon" to="#">
          <i className="fas fa-bell"></i>
        </Link>

        {/* Dropdown utilisateur */}
        <li className="dropdown nav-item list-unstyled" style={{ position: "relative" }}>
          <Link
            className="dropdown-toggle d-flex align-items-center flex-column"
            data-bs-toggle="dropdown"
            to="#"
            style={{ textDecoration: "none", color: "#334155", gap: "2px", alignItems: "flex-start" }}
          >
            {userInfo && (
              <>
                {/* Avatar */}
                <img
                  className="img-xs rounded-circle"
                  src="/images/logo12.png"
                  alt="logo12"
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "cover",
                    border: "2px solid #334155",
                    transition: "all 0.3s",
                  }}
                />
                {/* Nom utilisateur */}
                <span style={{ fontWeight: 600, fontSize: "14px" }}>{userInfo.name}</span>
                {/* Rôle utilisateur */}
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  {userInfo.isAdmin ? "Admin" : "Utilisateur"}
                </span>
              </>
            )}
          </Link>

          {/* Dropdown menu */}
          <div
            className="dropdown-menu dropdown-menu-end"
            style={{
              minWidth: "200px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Link className="dropdown-item d-flex align-items-center" to="/category">
              <i className="fas fa-id-badge me-2"></i> Mon profil
            </Link>
            <Link className="dropdown-item d-flex align-items-center" to="#">
              <i className="fas fa-cog me-2"></i> Paramètres
            </Link>
            <Link
              onClick={logoutHandler}
              className="dropdown-item d-flex align-items-center text-danger"
              to="#"
            >
              <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
            </Link>
          </div>
        </li>
      </div>

      {/* Styles hover et effets */}
      <style>{`
        .nav-link.btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          font-size: 16px;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .nav-link.btn-icon:hover {
          background-color: #e2e8f0;
          color: #1e293b;
          transform: translateY(-2px);
        }
        .dropdown-toggle:hover img {
          transform: scale(1.1);
        }
        .dropdown-toggle:hover span {
          color: #1e293b;
        }
        .dropdown-item:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }
      `}</style>
    </header>
  );
};

export default Header;
