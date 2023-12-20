import React from "react";

export function Password2Form({ password2, updateFields }) {
  return (
    <>
      <label htmlFor="password2" className="form-group">
        Re-enter Password
      </label>
      <input
        id="password2"
        type="password"
        className="form-control mb-2"
        required={true}
        minLength={10}
        value={password2}
        onChange={(e) => updateFields({ password2: e.target.value })}
      />
    </>
  );
}
