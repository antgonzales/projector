import React from "react";
import { render, screen } from "@testing-library/react";

import Projector from ".";

describe("<Projector />", () => {
  it("renders children", () => {
    render(
      <Projector>
        <div>Hello</div>
      </Projector>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
