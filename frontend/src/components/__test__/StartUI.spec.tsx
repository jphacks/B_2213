import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Start from "../../../pages/start";

describe("Test Start Page", () => {
  // render時のUIテスト
  test("render startUI", async () => {
    render(<Start />);

    expect(screen.getByText("poker")).toBeInTheDocument();
    expect(screen.getByText("mahjong")).toBeInTheDocument();
  });

  // poker選択時のUI変更テスト
  test("select poker", async () => {
    render(<Start />);
    const poker_heading = screen.getByRole("heading", { name: "poker" });

    fireEvent.click(poker_heading);

    expect(screen.getByText("New Room")).toBeInTheDocument();
    expect(screen.getByText("Join Room")).toBeInTheDocument();
    expect(screen.getByText("back")).toBeInTheDocument();
  });

  // mahjong選択時のUI変更テスト
  test("select mahjong", async () => {
    render(<Start />);
    const mahjong_heading = screen.getByRole("heading", { name: "mahjong" });

    fireEvent.click(mahjong_heading);

    expect(screen.getByText("New Room")).toBeInTheDocument();
    expect(screen.getByText("Join Room")).toBeInTheDocument();
    expect(screen.getByText("back")).toBeInTheDocument();
  });

  // backボタン機能テスト
  test("back function", async () => {
    render(<Start />);
    // mahjongおしてback押す
    const mahjong_heading = screen.getByRole("heading", { name: "mahjong" });
    fireEvent.click(mahjong_heading);

    let back_button = screen.getByRole("heading", { name: "back" });
    fireEvent.click(back_button);

    expect(screen.getByText("poker")).toBeInTheDocument();
    expect(screen.getByText("mahjong")).toBeInTheDocument();
    expect(screen.queryByText("back")).not.toBeInTheDocument(); // backはないことを期待する

    // pokerおしてback押す
    const poker_heading = screen.getByRole("heading", { name: "poker" });
    fireEvent.click(poker_heading);

    back_button = screen.getByRole("heading", { name: "back" });
    fireEvent.click(back_button);

    expect(screen.getByText("poker")).toBeInTheDocument();
    expect(screen.getByText("mahjong")).toBeInTheDocument();
    expect(screen.queryByText("back")).not.toBeInTheDocument(); // backはないことを期待する
  });
});