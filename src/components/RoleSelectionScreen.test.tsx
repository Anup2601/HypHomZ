import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleSelectionScreen from "./RoleSelectionScreen";

describe("RoleSelectionScreen", () => {
  it("renders the component correctly", () => {
    render(<RoleSelectionScreen />);

    // Check if the title is rendered
    expect(screen.getByText("Select a Role")).toBeInTheDocument();

    // Check if both role cards are rendered
    expect(screen.getByText("Looking for a specialist")).toBeInTheDocument();
    expect(screen.getByText("Service Provider")).toBeInTheDocument();

    // Check if descriptions are rendered
    expect(
      screen.getByText("To place any type of order to search for a performer"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Search and execute orders in your field of activity"),
    ).toBeInTheDocument();

    // Check if skip link is rendered
    expect(screen.getByText("Skip and Start")).toBeInTheDocument();
  });

  it("handles role card clicks", () => {
    // Mock console.log to check if it's called with the right arguments
    const consoleSpy = vi.spyOn(console, "log");
    render(<RoleSelectionScreen />);

    // Click on the first role card
    fireEvent.click(
      screen.getByText("Looking for a specialist").closest("article")!,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "Selected role: Looking for a specialist",
    );

    // Click on the second role card
    fireEvent.click(screen.getByText("Service Provider").closest("article")!);
    expect(consoleSpy).toHaveBeenCalledWith("Selected role: Service Provider");

    consoleSpy.mockRestore();
  });

  it("handles skip link click", () => {
    // Mock console.log to check if it's called
    const consoleSpy = vi.spyOn(console, "log");
    render(<RoleSelectionScreen />);

    // Click on the skip link
    fireEvent.click(screen.getByText("Skip and Start"));
    expect(consoleSpy).toHaveBeenCalledWith("Skipped role selection");

    consoleSpy.mockRestore();
  });

  it("supports keyboard navigation", () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<RoleSelectionScreen />);

    // Test keyboard interaction with Enter key
    const firstCard = screen
      .getByText("Looking for a specialist")
      .closest("article")!;
    firstCard.focus();
    fireEvent.keyDown(firstCard, { key: "Enter" });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Selected role: Looking for a specialist",
    );

    // Test keyboard interaction with Space key
    const secondCard = screen.getByText("Service Provider").closest("article")!;
    secondCard.focus();
    fireEvent.keyDown(secondCard, { key: " " });
    expect(consoleSpy).toHaveBeenCalledWith("Selected role: Service Provider");

    consoleSpy.mockRestore();
  });
});
