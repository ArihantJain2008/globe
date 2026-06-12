import { useEffect, useRef } from "react";
import * as d3 from "d3";

function MapChart() {
  const svgRef = useRef();

  useEffect(() => {
  const svg = d3.select(svgRef.current);

  svg.selectAll("*").remove();

  d3.json("/world.geojson").then((worldData) => {
    const projection = d3
      .geoMercator()
      .scale(120)
      .translate([400, 250]);

    const pathGenerator = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", "#1e293b")
      .attr("stroke", "#475569")
      .attr("stroke-width", 0.5)
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#38bdf8");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#1e293b");
      });
  });
}, []);

  return (
    <svg
      ref={svgRef}
      width="800"
      height="500"
      style={{ background: "#020617" }}
    />
  );
}

export default MapChart;