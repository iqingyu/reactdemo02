import React from "react";

import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";

class FormsDemo extends React.Component {
  render() {
    return (
      <div>
        <Form1 />
        <br />
        <br />
        <Form2 />
        <br />
        <br />
        <Form3 />
      </div>
    );
  }
}

export default FormsDemo;
