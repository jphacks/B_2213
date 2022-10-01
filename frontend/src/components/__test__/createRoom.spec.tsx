import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateRoomForm from "../modules/forms/start/CreateRoomForm";

describe("Test createtRoom Page", () => {
  // render時のUIテスト
  test("render createRoom Page", async () => {
    render(<CreateRoomForm />);

    expect(screen.getByText("user name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(await screen.findAllByRole("textbox")).toHaveLength(1);
    expect(screen.getByTestId("username")).toBeInTheDocument();
  });

  // 空欄での送信時処理テスト
  test("send empty", async () => {
    // 何も入力なしで送信
    render(<CreateRoomForm />);
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.click(sendButton);
    expect(screen.getByText("please input username")).toBeInTheDocument();
  });

  // スペースのみ入力されて送信
  test("send space", async () => {
    render(<CreateRoomForm />);
    const input_username = screen.getByTestId("username");
    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.change(input_username, { target: { value: " " } });
    fireEvent.click(sendButton);
    expect(screen.getByText("please input username")).toBeInTheDocument();
  });

  // 文字が10文字以内でない時の処理
  test("send space", async () => {
    render(<CreateRoomForm />);
    const input_username = screen.getByTestId("username");
    fireEvent.change(input_username, { target: { value: "abcdefghij" } });
    expect(input_username).toHaveValue("abcdefghij");
    fireEvent.change(input_username, { target: { value: "abcdefghijk" } });
    expect(input_username).toHaveValue("abcdefghij");
  });
});
