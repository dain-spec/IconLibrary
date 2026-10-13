import { redirect } from "next/navigation";
import { ClientRedirect } from "@/components/ClientRedirect";

const HOME = "/icon/multicolor";

export default function Home() {
  if (process.env.STATIC_EXPORT === "1") return <ClientRedirect to={HOME} />;
  redirect(HOME);
}
