/**
 * https://tailwindcss-glassmorphism.vercel.app/
 */
import React, { useCallback } from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";

import { FormProps, FormTypes } from "@/interfaces/Form";
import { AiCategories, PostTypeFromDb } from "@/interfaces/Post";

import CheckList, { ListItemType } from "@/components/fragments/CheckList";

import { Path } from "@/interfaces/Path";

import IconEmbedSvg from "./fragments/IconEmbedSvg";
import Header from "./Header";

const Form: React.FC<FormProps> = ({
	handleSubmit,
	post,
	setPost,
	submitting,
	type,
	errors,
	handleFileUploadChange,
	postImageFilename,
}) => {
	const t = useTranslations("Form");
	const tCommon = useTranslations("Common");
	const i18nFormType = { type: t(`Types.${type}`) };

	const genAiCategoryList = useCallback(
		(currentAiCat: AiCategories): ListItemType[] =>
			Object.values(AiCategories).map(
				(aiCategory: string): ListItemType => ({
					label: tCommon(`aiCats.${aiCategory}`),
					checked: currentAiCat === aiCategory,
					value: aiCategory,
				})
			),
		[tCommon]
	);

	const handlePostAiCategoryChange = (aiCategoryList: ListItemType[]) => {
		const aiCategory = aiCategoryList.find((category) => category.checked)?.value as AiCategories;

		setPost((prevPost) => ({ ...prevPost, aiCategory }));
	};

	const haveError = (errorKey: keyof PostTypeFromDb) =>
		!!(errors && errors?.[errorKey] && errors?.[errorKey]?.message);

	const displayAnError = (errorKey: keyof PostTypeFromDb) =>
		haveError(errorKey) && <p className="form_error">{errors?.[errorKey]?.message}</p>;

	return (
		<section className="page_section_left w-full">
			<Header
				desc={t("postTypeDesc", i18nFormType)}
				gradient="blue_gradient"
				textStyle="text-left"
				titleGradient={t("postType", i18nFormType)}
			/>

			<form
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={handleSubmit}
			>
				<label htmlFor="prompt-content">
					<span className="form_input_title">{t("yourPrompt")}</span>

					<textarea
						required
						className="form_input form_textarea"
						id="prompt-content"
						placeholder={t("yourPromptPlaceholder")}
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
					/>
					{displayAnError("prompt")}
				</label>

				<label htmlFor="prompt-tag">
					<span className="form_input_title">{t("tags")}</span>

					<input
						required
						className="form_input"
						id="prompt-tag"
						placeholder={t("tagPlaceholder")}
						value={String(post.tags)}
						onChange={(e) => setPost({ ...post, tags: e.target.value })}
					/>
					{displayAnError("tags")}
				</label>

				{/* {post.aiCategory === AiCategories.CHAT && ( */}
				<label htmlFor="prompt-link">
					<span
						className="form_input_title"
						style={{
							opacity: 0.75,
							filter: "sepia(.4)",
						}}
					>
						{post.aiCategory === AiCategories.CHAT && t("linkLabel")}
						{post.aiCategory === AiCategories.IMAGE && t("srcLabel")}
					</span>

					<input
						className="form_input"
						id="prompt-link"
						placeholder={t("linkPlaceholder")}
						type="url"
						value={post.link}
						onChange={(e) => setPost({ ...post, link: e.target.value })}
					/>
					{displayAnError("link")}
				</label>
				{/* )} */}

				{post.aiCategory === AiCategories.IMAGE && (
					<label htmlFor="prompt-image">
						<span
							className="form_input_title"
							style={{
								opacity: 0.75,
								filter: "sepia(.4)",
							}}
						>
							{t("imageLabel")}
						</span>

						<div className="input_file_wrapper">
							<input
								accept="image/*"
								id="prompt-image"
								placeholder={t("imagePlaceholder")}
								type="file"
								// value={fileName}
								onChange={handleFileUploadChange}
							/>
							{postImageFilename && !haveError("image") ? (
								<IconEmbedSvg height={28} type="cloud-check" width={40} />
							) : (
								<IconEmbedSvg height={28} type="cloud-arrow-up" width={40} />
							)}
							<p className="max-w-[70%] overflow-hidden text-ellipsis">
								{postImageFilename || t("imageNoFile")}
							</p>
						</div>
						{displayAnError("image")}
					</label>
				)}

				<div className="flex justify-between items-start gap-4 flex-col xs:flex-row">
					<div className="text-mlt-dark-6 font-semibold w-full pl-0.5">
						<CheckList
							handleAssign={handlePostAiCategoryChange}
							icon={{ size: 22, color: "mlt-orange-secondary" }}
							items={genAiCategoryList(post.aiCategory)}
							type="singleSelect"
						/>
					</div>
					<div className="flex justify-end items-center gap-4 flex-row w-full">
						<Link
							className="text-sm text-mlt-dark-4 hover:text-mlt-orange-primary"
							href={type === FormTypes.EDIT ? Path.PROFILE : Path.HOME}
						>
							{t("cancel")}
						</Link>
						<button className="_btn orange_invert" disabled={submitting} type="submit">
							{submitting ? t("processing", i18nFormType) : t("submit", i18nFormType)}
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Form;
