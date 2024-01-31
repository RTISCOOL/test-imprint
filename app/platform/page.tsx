import ChatBox from "@/components/platform/chatbox/Chatbox"
import TopNav from "@/components/platform/nav/TopNav"

export default function PlatformHome() {
  return (
    <>
    <div className="flex flex-col w-screen h-screen">
      <TopNav />
      <div className="flex flex-col  flex-1"></div>
      <ChatBox />
      </div>
    </>
  )
}
