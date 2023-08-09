import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";
import colors from "../../constants/color";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Variant?:
    | "filled"
    | "outline"
    | "tonal"
    | "whiteOutline"
    | "whiteTonal"
    | "pinkFilled"
    | "pinkTonal"
    | "blueFilled"
    | "blueOutline"
    | "blueTonal"
    | "redFilled"
    | "purpleFilled";
  Size?: "extraSmall" | "small" | "medium" | "big";
  Rounded?: "small" | "medium" | "large";
}

export function Button({
  Size = "medium",
  Variant = "tonal",
  Rounded,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      Size={Size}
      Variant={Variant}
      Rounded={Rounded}
      {...props}
    ></StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>((props) => ({
  // 스타일의 외부
  outline: "none",
  border: "0 solid transparent",
  cursor: "pointer",

  // 버튼 사이즈
  ...SIZE_VARIANT[props.Size || "medium"],

  // 스타일 타입
  ...TYPE_VARIANTS[props.Variant || "tonal"],

  // 라운드
  ...ROUNDED[props.Rounded || "small"],
}));

const SIZE_VARIANT = {
  extraSmall: {
    fontSize: "15px",
    padding: "7px 16px",
  },
  small: {
    fontSize: "15px",
    padding: "11px 16px",
  },
  medium: {
    fontSize: "20px",
    padding: "14px 64px",
  },
  big: {
    fontSize: "25px",
    padding: "24px 96px",
    width: "100%",
    display: "border-box",
  },
};

const TYPE_VARIANTS = {
  filled: {
    backgroundColor: colors.primary40,
    color: colors.white,
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.primary50,
    outline: `1px solid ${colors.primary50}`,
  },
  tonal: {
    backgroundColor: colors.primary90,
    color: colors.primary20,
  },
  whiteOutline: {
    backgroundColor: "transparent",
    color: colors.white,
    outline: `1px solid ${colors.white}`,
  },
  whiteTonal: {
    backgroundColor: colors.white,
    color: colors.primary,
  },
  pinkFilled: {
    backgroundColor: colors.error90,
    color: colors.white,
    fontWeight: "500",
  },
  pinkTonal: {
    backgroundColor: colors.error90,
    // color: colors.primary40,
    color: "#254021",
  },
  blueFilled: {
    backgroundColor: colors.tertiary,
    color: colors.white,
  },
  blueOutline: {
    backgroundColor: "transparent",
    color: colors.tertiary,
    outline: `1px solid ${colors.tertiary}`,
  },
  blueTonal: {
    backgroundColor: colors.tertiary90,
    color: colors.tertiary,
  },
  redFilled: {
    backgroundColor: colors.error,
    color: colors.white,
  },
  purpleFilled: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
};

const ROUNDED = {
  small: {
    borderRadius: "10px",
  },
  medium: {
    borderRadius: "24px",
  },
  large: {
    borderRadius: "36px",
  },
};
