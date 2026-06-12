import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch(console.error);
  }, [name]);

  if (!country) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#00ffff",
          textDecoration: "none",
        }}
      >
        ← Back to Globe
      </Link>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        <img
          src={country.flags.svg}
          alt={country.name.common}
          width="250"
        />

        <div>
          <h1>{country.name.common}</h1>

          <h3>
            Capital: {country.capital?.[0]}
          </h3>

          <h3>
            Population: {country.population.toLocaleString()}
          </h3>

          <h3>
            Region: {country.region}
          </h3>

          <h3>
            Area: {country.area.toLocaleString()} km²
          </h3>

          <h3>
            Timezones: {country.timezones.join(", ")}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;