import React from "react";
import { render } from "react-testing-library";
import App from "../MapState";

export function renderWithLocation() {
  return render(<App />);
}
