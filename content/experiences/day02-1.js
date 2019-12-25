import { component, html, useState, useEffect } from "haunted";
import Peer from "simple-peer/simplepeer.min";

const Emitter = ({ shadowRoot }) => {
  const [offer, setOffer] = useState();
  const [peer, setPeer] = useState();
  
  function addMedia(stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478?transport=udp" }
        ]
      }
    });
    setPeer(peer);
    peer.addStream(stream);
    console.log("stream added");
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(addMedia)
      .catch(console.error);
  }, []);

  useEffect(() => {
    peer.on("connect", () => {
      console.log("Host connected");
      peer.send("[TEST] random: " + Math.random());
    });

    peer.on("signal", data => {
      if (data.type === "offer") {
        console.log("signal received on peer");
        setOffer(data);
      }
    });

    peer.on("stream", stream => {
      console.log("stream event", stream);
    });

    peer.on("close", console.log);
    peer.on("error", console.error);
  }, [peer]);

  const signal = () => {
    const answer = shadowRoot.querySelector("textarea#receiver-answer").value;
    peer.signal(JSON.parse(answer));
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
    <button @click="${signal}">Set Emitter</button>
    <textarea id="emitter-offer" readonly>${JSON.stringify(offer)}</textarea>
    <video></video>
    <textarea id="receiver-answer" placeholder="Place Receiver SDP"></textarea>
  `;
};

export default component(Emitter);
