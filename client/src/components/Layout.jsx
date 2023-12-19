import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div className="bg-darkblackcolor relative">
			<Header />
			<div
				style={{
					height: "92vh",
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Layout;
