import { component, html, useState, useMemo } from "haunted";
import Peer from "simple-peer/simplepeer.min";

const peer2 = new Peer({
  trickle: false,
  config: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:global.stun.twilio.com:3478?transport=udp" }
    ]
  }
});

const Receiver = ({ shadowRoot }) => {
  const [answer, setAnswer] = useState();

  useMemo(() => {
    peer2.on("signal", data => {
      if (data.type === "answer") {
        console.log("signal received on peer2");
        setAnswer(data);
      }
    });

    peer2.on("data", data => {
      console.log("data: " + data);
    });

    peer2.on("stream", stream => {
      console.log("stream received");
      const video = shadowRoot.querySelector("video");
      video.srcObject = stream;
      video.play();
    });

    peer2.on("negotiationneeded", data => console.log(data));

    peer2.on("close", console.log);
    peer2.on("error", console.log);
  });

  const signal = () => {
    const offer = shadowRoot.querySelector("textarea#emitter-offer").value;
    peer2.signal(JSON.parse(offer));
  };

  return html`
    <style>
      :host,
      div {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 3fr;
      }
      button {
        position: fixed;
        bottom: 0.5rem;
        left: 0.5rem;
      }
      video {
        width: 100%;
        height: 100%;
        grid-row: span 2;
      }
    </style>
    <button @click="${signal}">Set Receiver</button>
    <textarea id="receiver-answer" readonly>${JSON.stringify(answer)}</textarea>
    <video controls></video>
    <textarea id="emitter-offer" placeholder="Place Emitter SDP"></textarea>
  `;
};

export default component(Receiver);
