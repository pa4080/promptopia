/**
 * https://tailwindcss-glassmorphism.vercel.app/
 */
import React from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";

import { FormProps } from "@/interfaces/Form";
import { AiCategories, PostTypeFromDb } from "@/interfaces/Post";

import CheckList, { ListItemsType } from "@/app/components/fragments/CheckList";

import IconEmbedSvg from "./fragments/IconEmbedSvg";

const Form: React.FC<FormProps> = ({
	handleSubmit,
	post,
	setPost,
	submitting,
	type,
	errors,
	handleChange_FileUpload,
	postImageFilename,
}) => {
	const t = useTranslations("Form");
	const tCommon = useTranslations("Common");

	const i18nFormType = { type: t(`Types.${type}`) };

	const handlePostAiCategoryChange = (aiCategoryList: ListItemsType) => {
		const aiCategory = aiCategoryList.find((category) => category.checked)?.value as AiCategories;

		setPost((prevPost) => ({ ...prevPost, aiCategory }));
	};

	const haveError = (errorKey: keyof PostTypeFromDb) =>
		!!(errors && errors?.[errorKey] && errors?.[errorKey]?.message);

	const displayAnError = (errorKey: keyof PostTypeFromDb) =>
		haveError(errorKey) && <p className="form_error">{errors?.[errorKey]?.message}</p>;

	return (
		<section className="w-full max-w-full flex_start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{t("postType", i18nFormType)}</span>
			</h1>
			<p className="desc text-left max-w-md">{t("postTypeDesc", i18nFormType)}</p>

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
						{t("linkLabel")}
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
								onChange={handleChange_FileUpload}
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

				<div className="flex justify-between items-start gap-4 flex-col 2sm:flex-row">
					<div className="text-mlt-dark-6 font-semibold w-full pl-0.5">
						<CheckList
							handleAssign={handlePostAiCategoryChange}
							icon={{ size: 22, color: "mlt-orange-secondary" }}
							items={Object.values(AiCategories).map((aiCategory) => ({
								label: tCommon(`aiCats.${aiCategory}`),
								checked: post.aiCategory === aiCategory,
								value: aiCategory,
							}))}
							type="singleSelect"
						/>
					</div>
					<div className="flex_end gap-4 flex-row w-full">
						<Link className="text-sm text-mlt-dark-4 hover:text-mlt-orange-primary" href="/">
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
