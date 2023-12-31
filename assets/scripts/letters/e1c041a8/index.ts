import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";

import Common from "modules/common";

type Point = [number, number];

function main(): void {

  // Measurements
  const { width, height } = Common.getViewportInformation("svg");

  const [minX, maxX] = [0, width];
  const [minY, maxY] = [0, height];

  const xScale = scaleLinear()
    .range([minX, maxX]);

  const yScale = scaleLinear()
    .range([minY, maxY]);
  
  const numRows = 40;
  const numColumns = 40;

  const cellWidth = 1 / numColumns;
  const cellHeight = 1 / numRows;
  const maxCell = (numRows - 1) * (numColumns - 1);

  // Colors
  const [minColor, maxColor] = ["#662163", "#eae8bb"];

  const colorScale = scaleLinear()
    .domain([0, maxCell])
    .range([minColor, maxColor])

  // Rendering
  const foreground = select("#foreground");

  const matrix = foreground
    .append("g")
      .attr("id", "matrix");

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {


      const x = (j + 0.2) * cellWidth;
      const y = (i + 0.2) * cellHeight;

      const cell = j + numColumns * i;
      const color = colorScale(cell);

      matrix
        .append("rect")
          .attr("x", xScale(x))
          .attr("y", yScale(y))
          .attr("width", xScale(0.6 * cellWidth))
          .attr("height", yScale(0.6 * cellHeight))
          .attr("rx", xScale(0.1 * cellWidth))
          .attr("fill", color);
    }
  }

}

main();
