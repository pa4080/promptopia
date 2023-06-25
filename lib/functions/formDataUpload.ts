export const formDataUpload = async (forData: FormData) => {
	if (!forData) {
		return;
	}

	const response = await fetch("/api/files", {
		method: "POST",
		body: forData,
	});

	return response.ok;
};
