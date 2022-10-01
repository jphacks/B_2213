import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import JoinRoomForm from "../modules/forms/start/JoinRoomForm";

describe("Test joinRoom Page", () => {
  // render時のUIテスト
  test("render joinRoom Page", async () => {
    render(<JoinRoomForm gameType={"poker"} />);

    expect(screen.getByText("user name")).toBeInTheDocument();
    expect(screen.getByText("room id")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(await screen.findAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("roomid")).toBeInTheDocument();
  });

  // 空欄での送信時処理テスト
  test("send empty", async () => {
    // 何も入力なしで送信
    render(<JoinRoomForm gameType={"poker"} />);
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.click(sendButton);
    expect(
      screen.getByText("please input username or roomid")
    ).toBeInTheDocument();
  });

  // usernameのみ空欄での送信時処理テスト
  test("send empty roomid", async () => {
    // 何も入力なしで送信
    render(<JoinRoomForm gameType={"poker"} />);
    const input_roomid = screen.getByTestId("roomid");
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.change(input_roomid, { target: { value: "test" } });
    fireEvent.click(sendButton);
    expect(
      screen.getByText("please input username or roomid")
    ).toBeInTheDocument();
  });

  // roomidのみ空欄での送信時処理テスト
  test("send empty roomid", async () => {
    // 何も入力なしで送信
    render(<JoinRoomForm gameType={"poker"} />);
    const input_username = screen.getByTestId("username");
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.change(input_username, { target: { value: "test" } });
    fireEvent.click(sendButton);
    expect(
      screen.getByText("please input username or roomid")
    ).toBeInTheDocument();
  });

  // roomidにスペースのみ入力されて送信
  test("send space", async () => {
    render(<JoinRoomForm gameType={"poker"} />);
    const input_roomid = screen.getByTestId("roomid");
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.change(input_roomid, { target: { value: " " } });
    fireEvent.click(sendButton);
    expect(
      screen.getByText("please input username or roomid")
    ).toBeInTheDocument();
  });
});
