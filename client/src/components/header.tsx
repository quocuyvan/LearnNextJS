import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex space-x-4">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/products">Products</Link>
                </li>
                <>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/register">Register</Link>
                    </li>
                    <li>
                        <ButtonLogout />
                    </li>
                </>
            </ul>
            <ModeToggle />
        </div>
    );
}
