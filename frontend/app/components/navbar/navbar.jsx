import Image from 'next/image'
import Logo from '../../public/logo_unp.png'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
} from '@nextui-org/navbar';

export default function NavbarComponent() {

    return (
        <Navbar className="p-4 flex justify-start">
            <NavbarBrand>
                <Image
                    src={Logo}
                    alt="UNP LOGO"
                    width={90}
                    height={90}
                    className='ml-8'
                />
                <div className="flex flex-col ml-6">
                    <p className="font-bold text-xl">
                        Prueba UNP Jefferson Coronado
                    </p>
                </div>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
            </NavbarContent>
        </Navbar>
    );
}