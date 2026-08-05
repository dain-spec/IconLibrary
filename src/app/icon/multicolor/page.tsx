import { getAllIcons } from "@/lib/icons";
import { LibraryExplorer } from "@/components/LibraryExplorer";

export default function MulticolorIconPage() {
  const icons = getAllIcons();
  return <LibraryExplorer icons={icons} />;
}
