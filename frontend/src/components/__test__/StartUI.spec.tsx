import { render, screen } from "@testing-library/react";
import Start from "../../../pages/start";
describe("Test Start Page", () => {
  test("render startUI", async () => {
    render(<Start />);
    const poker_heading = screen.getByRole("heading", { name: "poker" });
    const mahjong_heading = screen.getByRole("link", { name: "mahjong" });

    expect(poker_heading).toBeInTheDocument();
    expect(mahjong_heading).toBeInTheDocument();
  });
});
