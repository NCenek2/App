import { useEffect, useRef } from "react";
import { USERS } from "../../constants/constants";

type UsernameData = {
  username: string;
};

type UsernameDataProps = UsernameData & {
  updateFields: (fields: Partial<UsernameData>) => void;
};

export function UsernameForm({ username, updateFields }: UsernameDataProps) {
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current!.focus();
  }, []);

  return (
    <>
      <label htmlFor="username" className="form-group">
        Username - ({username.length}/{USERS.USERNAME})
      </label>
      <input
        id="username"
        type="text"
        maxLength={USERS.USERNAME}
        className="form-control mb-2 signup-input"
        value={username}
        autoComplete="off"
        required={true}
        onChange={(e) => updateFields({ username: e.target.value })}
        ref={usernameRef}
      />
    </>
  );
}
