import styled from "styled-components";
import { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import colors from "../../constants/color";

interface IIcon extends HTMLAttributes<HTMLDivElement> {
  onClick?: MouseEventHandler<HTMLDivElement>;
  kind?: "small" | "large";
  Round?: "none" | "full";
  Type?:
    | "none"
    | "redIcon"
    | "redFilled"
    | "redTonal"
    | "blueIcon"
    | "blueFilled"
    | "blueTonal";
}

export default function Icon({
  onClick,
  kind = "small",
  Round = "none",
  Type = "none",
  ...props
}: IIcon) {
  return (
    <ClickArea
      onClick={onClick}
      kind={kind}
      Round={Round}
      Type={Type}
      {...props}
    >
      <Container kind={kind} Round={Round} Type={Type} {...props}></Container>
    </ClickArea>
  );
}

const Container = styled.div<IIcon>((props) => ({
  // 사이즈
  ...SIZE_VARIANT_CONTAINER[props.kind || "small"],

  // 라운드
  ...ROUND[props.Round || "none"],

  // 컬러 타입
  ...TYPE_VARIANT_CONTAINER[props.Type || "none"],
}));

const ClickArea = styled.div<IIcon>((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  // 사이즈
  ...SIZE_VARIANT_CLICK_AREA[props.kind || "small"],

  // 라운드
  ...ROUND[props.Round || "none"],

  // 컬러 타입
  ...TYPE_VARIANT_CLICK_AREA[props.Type || "none"],
}));

const TYPE_VARIANT_CLICK_AREA = {
  none: {},
  redIcon: {
    backgroundColor: "transparent",
  },
  redFilled: {
    backgroundColor: colors.error,
  },
  redTonal: {
    backgroundColor: colors.error90,
  },
  blueIcon: {
    backgroundColor: "transparent",
  },
  blueFilled: {
    backgroundColor: colors.tertiary,
  },
  blueTonal: {
    backgroundColor: colors.tertiary90,
  },
};

const TYPE_VARIANT_CONTAINER = {
  none: {},
  redIcon: {
    color: colors.error,
  },
  redFilled: {
    color: colors.white,
  },
  redTonal: {
    color: colors.error,
  },
  blueIcon: {
    color: colors.tertiary,
  },
  blueFilled: {
    color: colors.white,
  },
  blueTonal: {
    color: colors.tertiary,
  },
};

const SIZE_VARIANT_CONTAINER = {
  small: {
    width: "24px",
    height: "24px",
  },
  large: {
    width: "70px",
    height: "70px",
  },
};

const SIZE_VARIANT_CLICK_AREA = {
  small: {
    width: "48px",
    height: "48px",
  },
  large: {
    width: "140px",
    height: "140px",
  },
};

const ROUND = {
  none: {},
  full: {
    borderRadius: "100%",
  },
};
