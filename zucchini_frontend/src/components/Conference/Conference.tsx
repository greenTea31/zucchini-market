import { useLocation } from "react-router-dom";
import ConferenceRoom from "./ConferenceRoom";

export default function Conference() {
  const location = useLocation();
  const title = location.state.title;
  return <ConferenceRoom title={title} />;
}
