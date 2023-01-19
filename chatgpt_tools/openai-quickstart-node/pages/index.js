import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [limitInput, setLimit] = useState("");
  const [tempInput, setTemp] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
	      body: JSON.stringify({ animal: animalInput, limit: limitInput, temp: tempInput }),
        //body += JSON.stringify({ limit: limitInput}),
       // body: JSON.stringify({ temp: tempInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Test chatgpt</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            value={animalInput}
	    placeholder="Prompt"
            onChange={(e) => setAnimalInput(e.target.value)}
          />
     <input
            type="text"
            name="temp"
	    placeholder="Temperature"
            value={tempInput}
            onChange={(e) => setTemp(e.target.value)}
          />
   <input
            type="text"
            name="limit"
	    placeholder="Output limit"
            value={limitInput}
            onChange={(e) => setLimit(e.target.value)}
          />

          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
