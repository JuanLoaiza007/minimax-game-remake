import { APP_VERSION } from "@/lib/constants";

export function VersionBadge() {
  return (
    <div className="text-xs text-gray-400 text-center py-2 select-none">
      v{APP_VERSION}
    </div>
  );
}