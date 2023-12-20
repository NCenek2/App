import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { EmailForm } from "./signin_forms/EmailForm";
import { PasswordForm } from "./signin_forms/PasswordForm";
import { Password2Form } from "./signin_forms/Password2Form";
import axios from "../api/axios";
import ErrorAlert from "./authenticated/ErrorAlert";
import useRegister from "../fake-backend/useRegister";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const register = useRegister();

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <EmailForm {...data} updateFields={updateFields} />,
      <PasswordForm {...data} updateFields={updateFields} />,
      <Password2Form {...data} updateFields={updateFields} />,
    ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    }

    if (data.password !== data.password2) {
      setErrorMessage("Passwords do not match");
      setShowErrorMessage(true);
      return;
    }

    if (data.password.length < 10) {
      setErrorMessage("Password is less than 10 character");
      setShowErrorMessage(true);
      return;
    }

    setShowErrorMessage(false);

    try {
      const response = register(data);

      if (response?.status === 201) {
        navigate("/rigel/login");
      }
    } catch (err) {
      if (err?.response?.status) {
        setShowErrorMessage(true);
        if (err?.response?.status === 409) {
          setErrorMessage("User with that email already exists");
        } else {
          setErrorMessage("Server is having problems. Try again later!");
        }
      } else {
        setErrorMessage("Cannot Connect to the Server! Check Connection.");
      }
      return err.response;
    }

    register();
  };

  return (
    <>
      {showErrorMessage && (
        <ErrorAlert
          errorMessage={errorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
      )}
      <div className="form-container">
        <div
          style={{
            position: "relative",
            background: "transparent",
            border: "1px solid white",
            padding: "2rem",
            borderRadius: "0.5rem",
            fontFamily: "Ariel",
            color: "white",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
              }}
            >
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={back}
                  className="btn btn-sm btn-outline-light"
                >
                  Back
                </button>
              )}
              <button type="submit" className="btn btn-sm btn-outline-light">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
