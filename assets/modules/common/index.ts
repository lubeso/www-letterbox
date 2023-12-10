import { select } from "d3-selection";

/**
 * Information about the viewport for an `SVGSVGElement` instance.
 * 
 * - https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
 */
interface ViewportInformation {
  /**
   * Leftmost x-coordinate for the viewport.
   */
  "min-x": number;
  /**
   * Topmost y-coordinate for the viewport.
   */
  "min-y": number;
  /**
   * Width of the viewport.
   */
  width: number;
  /**
   * Height of the viewport.
   */
  height: number;
}

/**
 * Return information about the viewport for the `SVGSVGElement` corresponding 
 * to the given CSS selector string.
 * @throws if the selector string returns no matches
 */
export function getViewportInformation(selector: string): ViewportInformation {
  const svg = select<SVGSVGElement, unknown>(selector);

  if (!svg.empty()) {
    const viewBox = svg.attr("viewBox")
    const numbers = viewBox
      .split(" ")
      .map(s => parseInt(s))

    if (numbers.length == 4) {
      return {
        "min-x": numbers[0],
        "min-y": numbers[1],
        width: numbers[2],
        height: numbers[3]
      }

    } else {
      throw new Error(`Could not parse \`viewBox\` attribute '${viewBox}'`);
    }

  } else {
    throw new Error(`Selector '${selector}' returned no matches.`);
  }
}

export default {
  getViewportInformation,
}
