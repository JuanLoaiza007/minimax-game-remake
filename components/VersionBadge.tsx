import { APP_VERSION } from "@/lib/constants";

export function VersionBadge() {
  return (
    <div className="text-xs text-muted-foreground select-none">
      v{APP_VERSION}
    </div>
  );
}