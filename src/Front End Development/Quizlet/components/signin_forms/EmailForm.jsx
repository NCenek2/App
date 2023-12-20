import React from "react";

export function EmailForm({ email, updateFields }) {
  return (
    <>
      <label htmlFor="email" className="form-group">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="form-control mb-2 signup-input"
        required={true}
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
    </>
  );
}
