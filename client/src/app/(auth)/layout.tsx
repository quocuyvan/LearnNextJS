import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>Auth Layout</h1>
            <Link href={"/"}>Home</Link>
        </div>
    );
}
