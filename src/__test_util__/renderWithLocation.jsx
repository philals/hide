import React from "react";
import { render } from "react-testing-library";
import App from "../App";

export function renderWithLocation() {
  return render(<App />);
}
