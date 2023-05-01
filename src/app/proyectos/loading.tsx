import Image from "next/image"
import loadingLogo from "../../assets/svg/loading.svg";
const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={ loadingLogo} alt="Loading..." width={100} height={100} />
    </div>
  )
}

export default Loading