// src/components/Header.js
import React, { useState } from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons (you can choose your preferred icon library)

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<header className="bg-darkblack p-4 flex justify-between items-center">
			{/* Left side with logo and text */}
			<div className="flex items-center">
				<img
					src="https://avatars.githubusercontent.com/u/38835999?v=4"
					alt="GenZ Logo"
					className="w-8 h-8 mr-2"
				/>
				<span className="text-white font-bold text-lg">GenZ</span>
			</div>

			{/* Right side with profile picture and menu */}
			<div className="flex items-center">
				{/* Profile picture with hover menu */}
				<div className="relative">
					<img
						src="https://avatars.githubusercontent.com/u/38835999?v=4"
						alt="Profile"
						className="w-8 h-8 rounded-full mr-2 cursor-pointer"
						onClick={toggleMenu}
					/>

					{/* Hover menu */}
					{isMenuOpen && (
						<ul className="absolute right-0 mt-2 bg-white border rounded shadow-md py-1 text-darkblack w-60">
							<li className="cursor-pointer px-4 py-2">Hi, Username</li>
							<li className="cursor-pointer px-4 py-2">Profile</li>
							<li className="cursor-pointer px-4 py-2">
								<FaCog className="mr-2" />
								Settings
							</li>
							<li className="cursor-pointer px-4 py-2">
								<FaSignOutAlt className="mr-2" />
								Logout
							</li>
						</ul>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
