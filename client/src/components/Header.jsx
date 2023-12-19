// src/components/Header.js
import React, { useState } from "react";
import { FaCog, FaMailBulk, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons (you can choose your preferred icon library)
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Logo from "../assets/logo.svg";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";
const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<header
			className="bg-darkblackcolor p-4 px-10 flex justify-between items-center fixed w-100 right-0 left-0 top-0"
			style={{
				height: "8vh",
				zIndex: 111,
			}}
		>
			{/* Left side with logo and text */}
			<div className="flex items-center">
				<img src={Logo} alt="GenZ Logo" className="w-8 h-8 mr-2" />
				<span className="text-white font-bold text-lg">GenZ Chat App</span>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-9 w-9">
							<AvatarImage
								src="https://avatars.githubusercontent.com/u/38835999?v=4"
								alt="@shadcn"
							/>
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>{" "}
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Github className="mr-2 h-4 w-4" />
						<span>GitHub</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LifeBuoy className="mr-2 h-4 w-4" />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Cloud className="mr-2 h-4 w-4" />
						<span>API</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>{" "}
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Header;
