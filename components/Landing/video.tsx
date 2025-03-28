import Presentation from "@/videos/get-started.mp4.json";
import VideoP from "next-video";

export default function Video() {
  return (
    <div>
      <VideoP controls={false} autoPlay muted src={Presentation} />
    </div>
  );
}
