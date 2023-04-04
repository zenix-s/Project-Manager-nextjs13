import Image from "next/image"
import loadingLogo from "@/assets/svg/loading.svg";
export default function Loading() {
  return (
    <div>
      <Image src={ loadingLogo} alt="Loading..." width={500} height={500} />
    </div>
  )
}