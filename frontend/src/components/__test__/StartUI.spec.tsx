import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Start from "../../../pages/start";

describe("Test Start Page", () => {
  // render時のUIテスト
  test("render startUI", async () => {
    render(<Start />);
    const poker_heading = screen.getByText("poker");
    const mahjong_heading = screen.getByText("mahjong");

    expect(poker_heading).toBeInTheDocument();
    expect(mahjong_heading).toBeInTheDocument();
  });

  // poker選択時のUI変更テスト
  test("select poker", async () => {
    render(<Start />);
    const poker_heading = screen.getByRole("heading", { name: "poker" });

    fireEvent.click(poker_heading);

    const new_heading = screen.getByText("New Room");
    const join_heading = screen.getByText("Join Room");
    const back_button = screen.getByText("back");

    expect(new_heading).toBeInTheDocument();
    expect(join_heading).toBeInTheDocument();
    expect(back_button).toBeInTheDocument();
  });

  // mahjong選択時のUI変更テスト
  test("select mahjong", async () => {
    render(<Start />);
    const mahjong_heading = screen.getByRole("heading", { name: "mahjong" });

    fireEvent.click(mahjong_heading);

    const new_heading = screen.getByText("New Room");
    const join_heading = screen.getByText("Join Room");
    const back_button = screen.getByText("back");

    expect(new_heading).toBeInTheDocument();
    expect(join_heading).toBeInTheDocument();
    expect(back_button).toBeInTheDocument();
  });
});
