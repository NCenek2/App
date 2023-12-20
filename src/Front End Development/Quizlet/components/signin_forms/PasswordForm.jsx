import React from "react";

export function PasswordForm({ password, updateFields }) {
  return (
    <>
      <label htmlFor="password" className="form-group">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="form-control mb-2"
        required={true}
        minLength={10}
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </>
  );
}
