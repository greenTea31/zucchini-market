import { useLocation } from "react-router-dom";
import TopComponent from "../toolbar/TopComponent";
import ConferenceRoom from "./ConferenceRoom";

export default function Conference() {
  const location = useLocation();
  const title = location.state.title;
  return (
    <>
      {/* <TopComponent title={title} /> */}
      <ConferenceRoom title={title} />
    </>
  );
}
