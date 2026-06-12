import Globe from "react-globe.gl";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import { useNavigate } from "react-router-dom";

function GlobeView() {
  const [countries, setCountries] = useState([]);
  const [hoverD, setHoverD] = useState(null);
  const navigate = useNavigate();

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  useEffect(() => {
    fetch("/countries-110m.json")
      .then((res) => res.json())
      .then((worldData) => {
        const countries = feature(
          worldData,
          worldData.objects.countries
        ).features;

        setCountries(countries);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleHover = (polygon) => {
    setHoverD(polygon);

    if (!polygon) {
      setTooltip((prev) => ({
        ...prev,
        visible: false,
      }));
      return;
    }

    setTooltip({
      visible: true,
      x: window.innerWidth / 2,
      y: 120,
      text: polygon.properties?.name || "Unknown Country",
    });
  };

  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="#0f172a"
        polygonsData={countries}
        polygonCapColor={(d) =>
          d === hoverD
            ? "rgba(0,255,255,0.8)"
            : "rgba(0,255,255,0.25)"
        }
        polygonSideColor={() => "rgba(0,255,255,0.08)"}
        polygonStrokeColor={() => "#00ffff"}
        polygonAltitude={(d) =>
          d === hoverD ? 0.04 : 0.01
        }
        onPolygonHover={handleHover}

        onPolygonClick={(country) => {
  navigate(
    `/country/${country.properties.name}`
  );
}}
      />

      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateX(-50%)",
            background: "rgba(10,15,30,0.95)",
            color: "#ffffff",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid #00ffff",
            boxShadow: "0 0 20px rgba(0,255,255,0.4)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "16px",
            fontWeight: "600",
            backdropFilter: "blur(10px)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}

export default GlobeView;