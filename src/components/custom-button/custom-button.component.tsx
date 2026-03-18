import React from "react"
import "./custom-button.styles.scss"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isPrimary?: boolean
  isSecondary?: boolean
  utilities?: string
}

const CustomButton = ({
  children,
  isPrimary,
  isSecondary,
  utilities,
  ...otherProps
}: CustomButtonProps) => (
  <button
    className={`
      ${isPrimary && "primary-button"}
      ${isSecondary && "secondary-button"}
      ${utilities}
      default-button-styles
    `}
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton
