import { createClient } from "pexels";

export const pexels = createClient(
  process.env.NEXT_PUBLIC_PEXELS_API_KEY as string,
);
