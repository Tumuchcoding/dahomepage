import Clock from "react-live-clock";

function ClockWatch() {
  return (
    <Clock format={"h:mm:ss A"} style={{ fontSize: "1.5em" }} ticking={true} />
  );
}

export default ClockWatch;
