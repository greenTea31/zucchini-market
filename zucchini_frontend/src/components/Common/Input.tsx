import styled from "styled-components";
import { InputHTMLAttributes } from "react";
import colors from "../../constants/color";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Variant?: "tonal" | "outline";
  Size?: "big";
  Rounded?: "small" | "medium" | "large";
}

export function Input({
  Size = "big",
  Variant = "tonal",
  Rounded,
  ...props
}: InputProps) {
  return (
    <StyledInput
      Size={Size}
      Variant={Variant}
      Rounded={Rounded}
      {...props}
    ></StyledInput>
  );
}

const StyledInput = styled.input<InputProps>((props) => ({
  // 스타일의 외부
  outline: "none",
  border: "0 solid transparent",
  cursor: "pointer",

  // 버튼 사이즈
  ...SIZE_VARIANT[props.Size || "big"],

  // 스타일 타입
  ...TYPE_VARIANTS[props.Variant || "tonal"],

  // 라운드
  ...ROUNDED[props.Rounded || "small"],
}));

const SIZE_VARIANT = {
  big: {
    fontSize: "22px",
    padding: "18px 48px",
    width: "100%",
    display: "border-box",
  },
};

const TYPE_VARIANTS = {
  tonal: {
    backgroundColor: colors.neutral95,
    color: colors.white,
    placeholderTextColor: colors.neutral40,
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.black,
    placeholderTextColor: colors.neutral40,
    outline: `1px solid ${colors.primary20}`,
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
