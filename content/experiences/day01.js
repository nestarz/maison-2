import { component, html, useEffect, useState } from "haunted";

const Experience = element => {
  const [canvas, setCanvas] = useState();

  useEffect(() => setCanvas(element.shadowRoot.querySelector("#canvas")), []);

  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas.getBoundingClientRect();
    let i = 0;
    setInterval(() => {
      ctx.fillStyle = `hsl(${i % 360}, 100%, 54%)`;
      ctx.fillRect(0, 0, width, height);
      i++;
    }, 20);
  }, [canvas]);

  return html`
    <style>
      :host,
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
    <canvas id="canvas"></canvas>
  `;
};

export default component(Experience);
