import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Projector from ".";

describe("<Projector />", () => {
  describe("getTabControlsProps()", () => {
    it("provides an ARIA role", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabControlsProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabControlsProps({
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
          {({ getTabControlsProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabControlsProps({
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

    it("changes the active slide index on click", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabControlsProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabControlsProps({
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

      expect(
        screen.getByRole("tab", { selected: true }).getAttribute("id")
      ).toBe("projector-tab-1");
    });

    it("adds ARIA compliant controls", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabControlsProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabControlsProps({
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
      const tabs = screen.getAllByRole("tab");

      tabs.forEach((tab, index) => {
        expect(tab.getAttribute("aria-controls")).toBe("slide-" + index);
      });
    });

    it("adds an ARIA compliant label", () => {
      const slides = [
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
        { img: "http://placekitten.com/200/200" },
      ];
      render(
        <Projector>
          {({ getTabControlsProps }) => {
            return slides.map((slide, index) => (
              <button
                {...getTabControlsProps({
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

      const tabs = screen.getAllByRole("tab");

      tabs.forEach((tab, index) => {
        expect(tab.getAttribute("aria-label")).toBe("Slide " + (index + 1));
      });
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

    it("adds ARIA compliant label", () => {
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
                  index,
                  key: index + "-kitten-img",
                  src: slide.img,
                  total: slides.length,
                })}
              />
            ));
          }}
        </Projector>
      );
      const slidePanels = screen.getAllByRole("tabpanel");

      slidePanels.forEach((slide, index) => {
        expect(slide.getAttribute("aria-label")).toBe(
          `${index + 1} of ${slides.length}`
        );
      });
    });

    it("adds id for controls", () => {
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
                  index,
                  key: index + "-kitten-img",
                  src: slide.img,
                })}
              />
            ));
          }}
        </Projector>
      );
      const slidePanels = screen.getAllByRole("tabpanel");

      slidePanels.forEach((slide, index) => {
        expect(slide.getAttribute("id")).toBe("slide-" + index);
      });
    });
  });
});
