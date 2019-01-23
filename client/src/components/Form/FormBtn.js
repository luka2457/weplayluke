import React from "react";
import { Button } from 'react-materialize';

export function FormBtn(props) {
  return (
    <Button {...props} style={{ float: "right", marginBottom: 10 }} className="cyan darken-3 center">
      {props.children}
    </Button>
  );
}
