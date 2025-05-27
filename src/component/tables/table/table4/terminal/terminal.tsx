// component/terminal/Terminal.tsx
import React, { useState } from 'react';
import "./terminal.css";

interface Props {
  script: string[]; // tableau de lignes du script
  onApply?: () => void; // fonction appelée lors du clic sur "Appliquer"
}

function Terminal({ script, onApply }: Props) {
  const [output, setOutput] = useState<string[]>([]);
  const [executed, setExecuted] = useState(false);

  const handleApply = () => {
    if (executed) return;
    setOutput([...script, ">> Script appliqué avec succès"]);
    setExecuted(true);
    onApply?.(); // optionnel : notifier le parent
  };

  return (
    <>
      <div className="terminal">
        {output.length > 0
          ? output.map((line, index) => (
              <div key={index} className="line">{line}</div>
            ))
          : script.map((line, index) => (
              <div key={index} className="line waiting">{line}</div>
            ))}
      </div>
     
   </>
  );
}

export default Terminal;
