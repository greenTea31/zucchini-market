import { Input } from "../components/Common/Input";
import axios from "axios";
import styled from "styled-components";
import { Button } from "../components/Common/Button";

const Container = styled.div`
  width: 40%;
  height: 100%;
  background-color: white;
  margin: 0 auto;
`;

export default function Test() {
  const onClick = () => {
    axios("api/users?page=2", {
      method: "GET",
    }).then((res) => alert(JSON.stringify(res.data)));
  };
  return (
    <Container>
      <Input
        Size="big"
        Variant="outline"
        Rounded="small"
        placeholder="아이디"
      ></Input>
      <Button Size="big" Variant="blueOutline" Rounded="small">
        클릭
      </Button>
    </Container>
  );
}
