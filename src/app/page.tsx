import { getAllIcons } from "@/lib/icons";
import { LibraryExplorer } from "@/components/LibraryExplorer";

export default function Home() {
  const icons = getAllIcons();
  return <LibraryExplorer icons={icons} />;
}
