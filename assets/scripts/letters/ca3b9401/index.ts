import { select } from "d3-selection";

import Common from "scripts/modules/common";


function main(): void {
  Common.say_hello();

  // Verify third-party imports work as expected...
  const foreground = select("#foreground");
  foreground
    .append("text")
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("font-size", "8rem")
      .attr("text-anchor", "middle")
      .attr("fill", "var(--theme-stroke-color)")
      .text("Hello world!");

}

main();
