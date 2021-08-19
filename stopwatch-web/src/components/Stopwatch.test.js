import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Stopwatch from "./Stopwatch";

describe("Stopwatch component", () => {
  test("renders test", () => {

    // Arrange
    render(<Stopwatch />);

    // Act
    const buttonElement = screen.getByText('START', { exact: true });
    userEvent.click(buttonElement);

    setTimeout(() => {
      const buttonElement2 = screen.getByText('SAVE', { exact: true });
      userEvent.click(buttonElement2);

      // Assert
      const outputElement = screen.getByText('00 : 00 : 03', { exact: false });
      expect(outputElement).toBeInTheDocument();
    }, 3000);
  });
});
