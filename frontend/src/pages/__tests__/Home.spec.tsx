import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../Home";

jest.mock("../../config/config", () => ({
  BACKEND_BASE_URL: "http://backend.addr",
}));

describe("Home Page", () => {
  describe("URL Shortening section", () => {
    it("should render a form with a text input for actual url and a submit button", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]), // Mock recent links
        })
      ) as jest.Mock;

      render(<Home />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      const input = screen.getByLabelText("Enter URL");
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "text");
      const button = await screen.findByRole("button", { name: "Shorten" });
      expect(button).toBeVisible();
    });

    it("should make an API call to shorten the URL when the form is submitted", async () => {
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]), // Mock recent links
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
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]), // Mock recent links
          })
        )

      render(<Home />);

      const input = screen.getByLabelText("Enter URL");
      await userEvent.type(input, "https://www.example.com");

      const button = await screen.findByRole("button", { name: "Shorten" });
      await userEvent.click(button);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(3); // 1 for recent links, 1 for shortening, 1 for recent links
      });
      expect(fetch).toHaveBeenCalledWith("http://backend.addr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actualUrl: "https://www.example.com" }),
      });
    });

    it("should show the shortened url when the form is submitted", async () => {
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]), // Mock recent links
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
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]), // Mock recent links
          })
        )

      render(<Home />);

      const input = screen.getByLabelText("Enter URL");
      await userEvent.type(input, "https://www.example.com");

      const button = screen.getByRole("button", { name: "Shorten" });
      await userEvent.click(button);

      await waitFor(() => {
        const link =  screen.getByRole("link", {
          name: "http://backend.addr/abcde",
        });
        expect(link).toBeVisible();
        expect(link.getAttribute("href")).toBe("http://backend.addr/abcde");
      });
    });
  });

  describe("Recent Links section", () => {
    it("should show the top 10 recent links", async () => {
      const mockedLinks = [
        {
          actualUrl: "https://www.example1.com",
          shortUrl: "http://backend.addr/abcde",
        },
        {
          actualUrl: "https://www.example2.com",
          shortUrl: "http://backend.addr/lishg",
        },
      ];
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockedLinks),
        })
      ) as jest.Mock;

      render(<Home />);

      const link1 = await screen.findByRole("link", {
        name: mockedLinks[0].shortUrl,
      });
      expect(link1).toBeVisible();
      expect(link1.getAttribute("href")).toBe(mockedLinks[0].shortUrl);
      expect(screen.getByText(mockedLinks[0].actualUrl)).toBeVisible();

      const link2 = screen.getByRole("link", { name: mockedLinks[1].shortUrl });
      expect(link2).toBeVisible();
      expect(link2.getAttribute("href")).toBe(mockedLinks[1].shortUrl);
      expect(screen.getByText(mockedLinks[1].actualUrl)).toBeVisible();
    });
  });
});
