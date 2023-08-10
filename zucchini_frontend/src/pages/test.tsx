export default function Test() {
  const backURL = "http://backend-container:8081";
  const backURL2 = "http://i9a209.p.ssafy.io:8081";

  const onClick = async () => {
    console.log("This is test 1");
    const response1 = await fetch(`${backURL}/api/user/test`);
    console.log(response1);

    console.log("This is test 2");
    const response2 = await fetch(`${backURL2}/api/user/test`);
    console.log(response2);
  };
  return (
    <>
      <button onClick={onClick}>클릭</button>
    </>
  );
}
