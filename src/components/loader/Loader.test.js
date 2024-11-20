import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import "@testing-library/jest-dom/extend-expect";

describe("Loader", () => {
  const renderLoader = (loading, error) =>
    render(
      <Loader loading={loading} error={error}>
        <div data-testid="children" />
      </Loader>
    );

  it("should render children when loading and error are false", () => {
    renderLoader(false, "");

    const errorElement = screen.queryByText("Error");
    const children = screen.getByTestId("children");

    expect(errorElement).not.toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it("should render loader when loading is true and error is false", () => {
    renderLoader(true, "");

    const errorElement = screen.queryByText("Error");
    const loader = screen.getByText("Loading...");

    expect(errorElement).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });

  it("should render children and error when error is true", () => {
    renderLoader(false, "Error");

    const children = screen.getByTestId("children");
    const errorElement = screen.getByText("Error");

    expect(children).toBeInTheDocument();
    expect(errorElement).toBeInTheDocument();
  });
});
