/**
 * https://tailwindcss-glassmorphism.vercel.app/
 */
import React from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";

import { FormProps } from "@/interfaces/Form";

const Form: React.FC<FormProps> = ({ handleSubmit, post, setPost, submitting, type }) => {
	const t = useTranslations("Form");

	const i18nFormType = { type: t(`Types.${type}`) };

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
				</label>

				<label htmlFor="prompt-tag">
					<span className="form_input_title">{t("tags")}</span>

					<input
						required
						className="form_input"
						id="prompt-tag"
						placeholder={t("tagPlaceholder")}
						value={post.tags.join(", ")}
						onChange={(e) =>
							setPost({ ...post, tags: e.target.value.split(",").map((tag) => tag.trim()) })
						}
					></input>
				</label>

				<label htmlFor="prompt-link">
					<span
						className="form_input_title"
						style={{
							opacity: 0.75,
							filter: "sepia(.4)",
						}}
					>
						{t("link")}
					</span>

					<input
						className="form_input"
						id="prompt-link"
						placeholder={t("linkPlaceholder")}
						value={post.link}
						onChange={(e) => setPost({ ...post, link: e.target.value })}
					></input>
				</label>

				<div className="flex_between">
					<div className="font-Unicephalon text-mlt-purple-primary">{post.model}</div>
					<div className="flex_end mx-2 gap-4 flex-row">
						<Link className="text-sm text-mlt-dark-4 hover:text-primary-orange" href="/">
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
