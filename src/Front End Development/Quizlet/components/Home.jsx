import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Disclaimer
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Disclaimer
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                This version of Rigel is <em>NOT</em> a full-stack version.
              </p>
              <p>
                If you sign up to test the functionality, do not use a real
                password as I am not hashing (safely storing) the password as I
                would in a full-stack project.
              </p>
              <p>
                With that being said, there is a bypass login button at login
                that will allow you to not register and use Rigel as if you
                signed up. This functionality is only for this version.
              </p>
              <p>
                There is only one instance of data for all users that sign-up,
                which is stored locally within the browser.
              </p>
              <p>Hope you enjoy!</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container">
        <h2>Welcome to Rigel</h2>
        <div className="home-btn-container">
          <Link to={"/rigel/login"} className="btn btn-green">
            Login
          </Link>
          <Link to={"/rigel/register"} className="btn add-color">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
