import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLinkPath(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname
      .split("/")
      .filter((segment) => segment !== "");

    const mgdkIndex = pathSegments.indexOf("mgdk-dk");
    if (mgdkIndex !== -1) {
      const remainingSegments = pathSegments.slice(mgdkIndex + 1);
      return remainingSegments.join("/");
    }
    return pathSegments[pathSegments.length - 1] || "";
  } catch {
    const pathSegments = url.split("/").filter((segment) => segment !== "");

    const mgdkIndex = pathSegments.indexOf("mgdk-dk");
    if (mgdkIndex !== -1) {
      const remainingSegments = pathSegments.slice(mgdkIndex + 1);
      return remainingSegments.join("/");
    }

    return pathSegments[pathSegments.length - 1] || "";
  }
}
