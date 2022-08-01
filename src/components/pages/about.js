import React from "react";
import profilePicture from "../../../static/assets/images/about.jpg";

export default function () {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-col"
        style={{
          background: "url(" + profilePicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="right-col">
        Hi! I'm Lee Knorpp, a young web developer and recent graduate in
        Riverton, Utah. <br />
        Even though I'm only now entering the many people who make a living in
        computers and coding, I've been interested in and using HTML and CSS
        since elementary school, and I'm ecstatic I'm able to use all my passion
        and experience to help people in the real world! Between my training
        with HTML5/CSS3, UX/UI design, JavaScript, React, and more, I'm excited
        to help you bring your idea for a website to your hands!
      </div>
    </div>
  );
}
