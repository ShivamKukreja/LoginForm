// @flow
import React from "react";
import type { Node } from "react";

type Props = {
  className?: string,
  children: Node,
  inheritedStyles?: string,
  type?: string,
  primary?: boolean,
  secondary?: boolean,
  disabled?: boolean,
  ariaLabel?: string
};

const Button = ({
  className,
  children,
  inheritedStyles,
  type,
  primary,
  secondary,
  disabled,
  ariaLabel,
  ...others
}: Props): Node => (
  <button
    aria-label={ariaLabel || null}
    className={className}
    disabled={disabled}
    type={type}
    {...others}
  >
    {children}
  </button>
);

Button.defaultProps = {
  inheritedStyles: "",
  type: "button",
  primary: false,
  secondary: false,
  disabled: false,
  ariaLabel: "",
  className: ""
};

export default Button;
