import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-white w-full">
      <Image
        src="/figma/bgfooter.png"
        alt="Footer"
        width={1200}
        height={400}
        className="w-full h-auto object-cover"
        priority={false}
      />
    </footer>
  );
}
