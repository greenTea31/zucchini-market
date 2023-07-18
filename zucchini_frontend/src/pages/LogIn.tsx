import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const [values, setValues] = useState({ id: "", pw: "" });
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setValues(data);
    console.log(data);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <input placeholder="아이디" {...register("id")}></input>
        </p>
        <p>
          <input placeholder="비밀번호" {...register("pw")}></input>
        </p>
        <button>로그인</button>
      </form>
    </div>
  );
}
