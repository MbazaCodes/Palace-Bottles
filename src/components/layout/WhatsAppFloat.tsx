import { BRAND } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BRAND.phoneRaw}?text=Hello%20Palace%20Bottles!%20I%20have%20a%20question.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Palace Bottles on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-float transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="size-7 fill-white" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35z" />
        <path d="M12.05 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.27-1.38A9.9 9.9 0 1 0 12.05 2zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 1 1 6.98 3.86z" />
      </svg>
    </a>
  );
}
