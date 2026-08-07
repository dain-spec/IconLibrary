import { getAllIcons3D } from "@/lib/icons3d";
import { Icon3DExplorer } from "@/components/Icon3DExplorer";

export default function Icon3DPage() {
  const icons = getAllIcons3D();
  return <Icon3DExplorer icons={icons} />;
}
