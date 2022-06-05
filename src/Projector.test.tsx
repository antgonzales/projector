import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Projector from ".";

describe("<Projector />", () => {
  describe("getTabProps()", () => {
    it("provides an ARIA role", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabProps({
                  key: index + "-kitten-btn",
                })}
              >
                Slide {index}
              </button>
            ));
          }}
        </Projector>
      );
      expect(screen.getAllByRole("tab").length).toBe(slides.length);
    });

    it("display the currently active tab by slide", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabProps({
                  index,
                  key: index + "-kitten-btn",
                })}
              >
                Slide {index}
              </button>
            ));
          }}
        </Projector>
      );
      expect(screen.getByRole("tab", { selected: true }).textContent).toBe(
        "Slide 0"
      );
    });

    it("changes the active side index on click", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabProps({
                  index,
                  key: index + "-kitten-btn",
                })}
              >
                Slide {index}
              </button>
            ));
          }}
        </Projector>
      );
      const nextSlide = screen.getAllByRole("tab", { selected: false })[0];

      fireEvent.click(nextSlide);

      expect(screen.getByRole("tab", { selected: true }).textContent).toBe(
        "Slide 1"
      );
    });
  });

  describe("getSlideProps()", () => {
    it("adds an ARIA compliant role", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getSlideProps }) => {
            return slides.map((slide, index) => (
              <img
                {...getSlideProps({
                  key: index + "-kitten-img",
                  src: slide.img,
                })}
              />
            ));
          }}
        </Projector>
      );
      expect(screen.getAllByRole("tabpanel").length).toBe(slides.length);
    });
  });
});
