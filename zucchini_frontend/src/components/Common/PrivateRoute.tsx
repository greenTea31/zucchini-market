import { HTMLAttributes, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export default function PrivateRoute({ ...props }: IProps) {
  if (!useAuth()) {
    // /item/register 경로에 대해 로그인하지 않은 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" />;
  }
  return <div {...props}></div>;
}
