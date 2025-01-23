import {lusitana} from '@/app/ui/fonts';
import {Earth} from "lucide-react";
import Link from "next/link";

export default function AcmeLogo() {
    return (
        <Link href="/" className={`${lusitana.className} flex items-center text-[30px]`}>
            <Earth/>
            <p>Acme</p>
        </Link>
    );
}
