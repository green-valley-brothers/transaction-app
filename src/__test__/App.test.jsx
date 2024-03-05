import { expect, test } from "vitest"
import { render } from "@testing-library/react"
import App from "../App"

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeInTheDocument();
});
