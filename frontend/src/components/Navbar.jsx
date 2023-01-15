import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/AuthSlice"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item" href="https://bulma.io">
            <img src={logo} width="112" height="28" alt='logo' />
          </NavLink>

          <a href=':#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* {user && user.email === null &&(
                  <div>
                    <a class="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                      Log in
                    </a>
                  </div>
                )} */}
                {user && user.role === "admin" && (
                  <div>
                    <button onClick={logout} className="button is-light">
                      Log out
                    </button>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar