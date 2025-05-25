import { useState, useEffect } from "react";

import "./barrerech.css";


interface Props<T> {
  data: T[];
  fieldNom: keyof T; // ex: "nomSite" ou "adresse"
  fieldId: keyof T;  // ex: "id"
  entrer?: string;
  subAr?:string;
  subRech?: keyof T;
  retourner: (noms: string[], ids: string[]) => void;
}

function BarreRecherche<T>({ data, fieldNom, fieldId, entrer = "éléments", retourner,subRech,subAr}: Props<T>) {
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
  let filtered = data.filter((item) =>
    String(item[fieldNom]).toLowerCase().includes(value.toLowerCase())
  );

  if (filtered.length === 0 && subAr && subRech) {
    filtered = data.filter((item) => {
      const subArray = (item as any)[subAr];
      if (Array.isArray(subArray)) {
        return subArray.some((subItem) =>
          String(subItem[subRech]).toLowerCase().includes(value.toLowerCase())
        );
      }
      return false;
    });
  }

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
