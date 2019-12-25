import { component, html, useEffect, useState } from "haunted";
import p5 from "p5";

const Experience = element => {
  const sketch = p => {
    const { width, height } = element.getBoundingClientRect();
    p.setup = () => {
      p.createCanvas(width, height);
      p.frameRate(100);
    };
    p.draw = () => {
      p.stroke("purple");
      p.strokeWeight(10);
      if (p.mouseIsPressed === true) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    };
  };

  useEffect(() => new p5(sketch, element.shadowRoot), []);

  return html`
    <style>
      :host,
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        visibility: visible !important;
      }
    </style>
  `;
};

export default component(Experience);
