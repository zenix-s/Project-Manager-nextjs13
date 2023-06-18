export const Colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "gray",
];

// export const getHexColor = (color: string) => {
// default value is black
export const getHexColor = (color: string) => {
  switch (color) {
    case "red":
      return "#ef4444";
    case "orange":
      return "#f97316";
    case "amber":
      return "#f59e0b";
    case "yellow":
      return "#eab308";
    case "lime":
      return "#84cc16";
    case "green":
      return "#22c55e";
    case "emerald":
      return "#10b981";
    case "teal":
      return "#14b8a6";
    case "cyan":
      return "#06b6d4";
    case "sky":
      return "#0ea5e9";
    case "blue":
      return "#3b82f6";
    case "indigo":
      return "#6366f1";
    case "violet":
      return "#8b5cf6";
    case "purple":
      return "#a855f7";
    case "fuchsia":
      return "#d946ef";
    case "pink":
      return "#ec4899";
    case "rose":
      return "#f43f5e";
    default:
      return "#eeeeee";
  }
};

export const getBgColor = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "amber":
      return "bg-amber-500";
    case "yellow":
      return "bg-yellow-500";
    case "lime":
      return "bg-lime-500";
    case "green":
      return "bg-green-500";
    case "emerald":
      return "bg-emerald-500";
    case "teal":
      return "bg-teal-500";
    case "cyan":
      return "bg-cyan-500";
    case "sky":
      return "bg-sky-500";
    case "blue":
      return "bg-blue-500";
    case "indigo":
      return "bg-indigo-500";
    case "violet":
      return "bg-violet-500";
    case "purple":
      return "bg-purple-500";
    case "fuchsia":
      return "bg-fuchsia-500";
    case "pink":
      return "bg-pink-500";
    case "rose":
      return "bg-rose-500";
    default:
      return "bg-gray-500";
  }
};
