import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../Home";
import isURL from "validator/es/lib/isURL";

jest.mock("validator/es/lib/isURL", () => jest.fn(() => true));

jest.mock("../../config/config", () => ({
  BACKEND_BASE_URL: "http://backend.addr",
}));

describe("Home Page", () => {
  describe("URL Shortening section", () => {
    it.only("should render a form with a text input for actual url and a submit button", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(),
        })
      ) as jest.Mock;

      render(<Home />);

      const form = await screen.findByRole("form");
      expect(form).toBeInTheDocument();
      const input = screen.getByPlaceholderText(
        "Enter your long link starting with http:// or https:// to enable the button"
      );
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
      const button = await screen.findByRole("button", { name: "Shorten URL" });
      expect(button).toBeVisible();
    });

    it.only("should disable the submit button when the input is not valid URL", async () => {
      (isURL as jest.Mock).mockImplementation(() => false);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(),
        })
      ) as jest.Mock;

      render(<Home />);

      const button = await screen.findByRole("button", { name: "Shorten URL" });
      expect(button).toBeDisabled();
    });

    it.only("should make an API call to shorten the URL when the form is submitted", async () => {
      (isURL as jest.Mock).mockImplementation(() => true);
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(), // Mock recent links
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                shortUrl: "http://backend.addr/abcde",
              }),
          })
        );

      render(<Home />);

      const input = await screen.findByPlaceholderText(
        "Enter your long link starting with http:// or https:// to enable the button"
      );
      await userEvent.type(input, "https://www.example.com");

      const button = await screen.findByRole("button", { name: "Shorten URL" });
      await userEvent.click(button);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(2); // 1 for health, 1 for shortening
      });
      expect(fetch).toHaveBeenCalledWith("http://backend.addr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actualUrl: "https://www.example.com" }),
      });
    });

    it.only("should show the shortened url when the form is submitted", async () => {
      (isURL as jest.Mock).mockImplementation(() => true);
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(), // Mock recent links
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                shortUrl: "http://backend.addr/abcde",
              }),
          })
        );

      render(<Home />);

      const input = await screen.findByPlaceholderText(
        "Enter your long link starting with http:// or https:// to enable the button"
      );
      await userEvent.type(input, "https://www.example.com");

      const button = screen.getByRole("button", { name: "Shorten URL" });
      await userEvent.click(button);

      await waitFor(() => {
        const link = screen.getByRole("link", {
          name: "http://backend.addr/abcde",
        });
        expect(link).toBeVisible();
        expect(link.getAttribute("href")).toBe("http://backend.addr/abcde");
      });
    });
  });
});
