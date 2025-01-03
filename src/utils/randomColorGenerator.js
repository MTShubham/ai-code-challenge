function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function randomColorGenerator(numColors) {
    const colors = new Set();
    while (colors.size < numColors) {
      const newColor = getRandomColor();
      if (!colors.has(newColor)) {
        colors.add(newColor);
      }
    }
    return Array.from(colors);
  }
  
  export default randomColorGenerator;