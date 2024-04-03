import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../Home";

jest.mock('../../config/config', () => ({
  BACKEND_BASE_URL: 'http://backend.addr',
}));


describe("Home Page", () => {
  describe("URL Shortening section", () => {
    it("should render a form with a text input for actual url and a submit button", () => {
      render(<Home />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      const input = screen.getByLabelText("Enter URL");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      const button = screen.getByRole("button", { name: "Shorten" });
      expect(button).toBeInTheDocument();
    });

    it("should make an API call to shorten the URL when the form is submitted", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: jest.fn(),
        })
      ) as jest.Mock;

      render(<Home />);

      const input = screen.getByLabelText("Enter URL");
      await userEvent.type(input, "https://www.example.com");

      const button = screen.getByRole("button", { name: "Shorten" });
      await userEvent.click(button);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });
      expect(fetch).toHaveBeenCalledWith('http://backend.addr', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actualUrl: "https://www.example.com" }),
      });
    });

    it("should show the shortened url when the form is submitted", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              shortUrl: 'http://backend.addr/abcde',
            }),
        })
      ) as jest.Mock;

      render(<Home />);

      const input = screen.getByLabelText("Enter URL");
      await userEvent.type(input, "https://www.example.com");

      const button = screen.getByRole("button", { name: "Shorten" });
      await userEvent.click(button);

      await waitFor(() => {
        const link = screen.getByRole('link', { name: 'http://backend.addr/abcde' });
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('http://backend.addr/abcde');
      });

    });
  });
});
