import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const iframDomain = "https://super-sell.vercel.app";

export default function HomePage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function receiveMessage(event: any) {
      if (event.origin !== iframDomain) return;

      console.log("message from", event.origin);
      console.log("data", event.data);

      notification.info({
        message: event.origin,
        description: JSON.stringify(event.data, null, 2),
      });
    }

    window.addEventListener("message", receiveMessage, false);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, [router.isReady]);

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center flex-col gap-4">
      <div className="flex gap-4 p-4">
        <button className="px-4 h-10 bg-green-500 text-white" onClick={() => setIsOpen(true)}>
          Open iframe
        </button>
        <button className="px-4 h-10 bg-red-500 text-white" onClick={() => setIsOpen(false)}>
          Close iframe
        </button>
      </div>

      {isOpen && (
        <div className="w-[320px] h-[640px]">
          <iframe
            src="https://super-sell.vercel.app/payment-success?domain=http://localhost:3000&redirect_url=https://edupluz.com/"
            width="100%"
            height="100%"></iframe>
        </div>
      )}
    </div>
  );
}
