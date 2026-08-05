import { getAllMotionAssets } from "@/lib/motion";
import { MotionExplorer } from "@/components/motion/MotionExplorer";

export default function MotionPage() {
  const assets = getAllMotionAssets();
  return <MotionExplorer assets={assets} />;
}
