import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { line as lineFactory } from "d3-shape";

import Common from "modules/common";

// Types
type Point = [number, number]


function main(): void {
  const { width, height } = Common.getViewportInformation("svg");

  const [minX, maxX] = [-0.2 * height, 1.2 * height];
  const [minY, maxY] = [-1.2 * width, 1.2 * width];

  const xScale = scaleLinear()
    .range([minX, maxX]);

  const yScale = scaleLinear()
    .range([maxY, minY]);

  const line = lineFactory<Point>()
    .x(point => xScale(point[0]))
    .y(point => yScale(point[1]));

  const numLines = 33;
  const spaceBetweenLines = 1 / (numLines - 1);

  const x = (i: number): (t: number) => number => {
    return (t: number): number => t;
  }
  const y = (i: number): (t: number) =>  number => {
    return (t: number): number => (
      (i * spaceBetweenLines)
        + (Math.floor(numLines / 2) - i) * (
          0.4 * spaceBetweenLines * Math.sin(Math.PI * t)
        )
        + 0.01 * Math.cos(12 * Math.PI * t)
        - 0.4 * t
    );
  }

  // Rendering
  const foreground = select("#foreground");

  const lines = foreground
    .append("g")
      .attr("id", "lines");

  const numPointsPerLine = 100;
  const spaceBetweenPoints = 1 / (numPointsPerLine - 1);

  for (let i = 0; i < numLines; i++) {
    const points = new Array<Point>(numPointsPerLine)

    for (let j = 0; j < numPointsPerLine; j++) {
      const t = j * spaceBetweenPoints;
      points[j] = [x(i)(t), y(i)(t)];
    }

    lines
      .append("path")
        .attr("d", line(points))
        .attr("fill", "none")
        .attr("stroke-width", "var(--theme-stroke-width-thin)")
        .attr("stroke", "var(--theme-stroke-color")
  }

}

main();
