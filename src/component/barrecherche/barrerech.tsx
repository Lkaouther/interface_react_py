import { useState, useEffect } from "react";

import "./barrerech.css";


interface Props<T> {
  data: T[];
  fieldNom: keyof T; // ex: "nomSite" ou "adresse"
  fieldId: keyof T;  // ex: "id"
  entrer?: string;
  retourner: (noms: string[], ids: string[]) => void;
}

function BarreRecherche<T>({ data, fieldNom, fieldId, entrer = "éléments", retourner }: Props<T>) {
 const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // initialiser avec tous les éléments
    retourner(
      data.map((e) => String(e[fieldNom])),
      data.map((e) => String(e[fieldId]))
    );
  }, [data]);
  
  const handleChange = (value: string) => {
    setInputValue(value);
  const filtered = data.filter((item) =>
      String(item[fieldNom]).toLowerCase().includes(value.toLowerCase())
    );
    retourner(
      filtered.map((e) => String(e[fieldNom])),
      filtered.map((e) => String(e[fieldId]))
    );
  };
  

  return (
    <>
      <input
        className="input_rech"
        type="text"
        placeholder={`cherchez dans ${entrer}...`}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}

export default BarreRecherche;
