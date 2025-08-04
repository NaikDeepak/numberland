import "@testing-library/jest-dom"

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveFocus(): R
      toHaveStyle(css: string | Record<string, any>): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp): R
      toHaveAccessibleName(expectedAccessibleName?: string | RegExp): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string | RegExp): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveErrorMessage(text: string | RegExp): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveValue(value: string | string[] | number): R
      toHaveTextContent(text: string | RegExp): R
      toBeInTheDocument(): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveFocus(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
    }
  }
}

export {}
