import { useEffect, useRef } from "react";

type CompanyKey = {
  companyKey: string;
};

type CompanyKeyProps = CompanyKey & {
  updateFields: (fields: Partial<CompanyKey>) => void;
};

export function CompanyKeyForm({ companyKey, updateFields }: CompanyKeyProps) {
  const companyKeyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    companyKeyRef.current!.focus();
  }, []);

  return (
    <>
      <label htmlFor="companykey" className="form-group">
        Company Key
      </label>
      <input
        id="companykey"
        type="password"
        className="form-control mb-2"
        required={true}
        value={companyKey}
        onChange={(e) => updateFields({ companyKey: e.target.value })}
        ref={companyKeyRef}
      />
    </>
  );
}
