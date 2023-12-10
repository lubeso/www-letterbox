function main(): void {
  const svg = document.querySelector("svg");

  if (svg) {
    svg.addEventListener("click", () => {
      // Arrange
      const link = document.createElement("a");
      link.download = "download.svg";
      const blob = new Blob([svg.outerHTML], {"type": "image/svg+xml"});
      link.href = URL.createObjectURL(blob);

      // Act
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
      link.remove();
    });
  }
}

main();
