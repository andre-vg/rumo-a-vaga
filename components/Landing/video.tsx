//@ts-ignore

import { body, title } from "../primitives";

export default function Video() {
  return (
    <div className="grid grid-cols-2 gap-8 py-12">
      <div className="flex flex-col justify-center gap-4">
        <h1 className={title({ size: "xl" })}>Como funciona?</h1>
        <p className={body()}>
          O aplicativo que vai te ajudar a organizar seus estudos de forma
          simples e eficiente.
        </p>
      </div>
      {/* <video
        className="rounded-3xl shadow-lg"
        autoPlay
        loop
        muted
        src={
          "https://enkkszonozxfabvotzyw.supabase.co/storage/v1/object/public/videos/rumoAvaga.mp4"
        }
      /> */}
      <div className="h-full min-h-96 w-full rounded-3xl shadow-lg">
        <video
          autoPlay
          loop
          muted
          className="rounded-3xl shadow-lg"
          preload="none"
        >
          <source
            src="https://enkkszonozxfabvotzyw.supabase.co/storage/v1/object/public/videos/rumoAvaga.mp4"
            type="video/mp4"
          />
          <track kind="subtitles" label="English" src="#" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
