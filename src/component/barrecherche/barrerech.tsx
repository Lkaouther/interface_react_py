import { useState, useEffect } from "react";

import "./barrerech.css";

type Equipement = {
  id: string;
  nomSite: string;
};
interface Props {
  entrer?:string;
  lienjson:string;
  retourner: (sites: string[], id: string[]) => void;
}

function BarreRecherche({ lienjson,retourner,entrer="sites" }: Props) {
  const [allData, setAllData] = useState<Equipement[]>([]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(lienjson)
      .then((response) => response.json())
      .then((json: Equipement[]) => {
        setAllData(json);
        retourner(
          json.map((e) => e.nomSite),
          json.map((e) => e.id)
        );
      })
      .catch((error) => {
        console.error("Erreur lors du fetch JSON :", error);
      });
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    const filtered = allData.filter((eq) =>
      eq.nomSite.toLowerCase().includes(value.toLowerCase())
    );

    retourner(
      filtered.map((e) => e.nomSite),
      filtered.map((e) => e.id)
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
