"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserProfile from "@/app/components/UserProfile";

const UserProfilePage: React.FC = () => {
	const handleEdit = () => {
		// eslint-disable-next-line no-console
		console.log("Edit");
	};

	const handleDelete = async () => {
		// eslint-disable-next-line no-console
		console.log("Delete");
	};

	return (
		<UserProfile
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl quis nisl aliquam ultricies."
			email="test@email.com"
			handleDelete={handleDelete}
			handleEdit={handleEdit}
			name="John Doe"
			posts={[]}
		/>
	);
};

export default UserProfilePage;
