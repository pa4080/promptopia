import React, { useLayoutEffect } from "react";

import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

import { Skeleton } from "./ui/skeleton";
import Btn_PostTag from "./fragments/Btn_PostTag";
import IconEmbedSvgPop from "./fragments/IconEmbedSvgPop";

const PostCardListLoading: React.FC = () => {
	const { setPostCardListSize } = usePromptopiaContext();
	const postCardListRef = React.useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		function updateSize() {
			setPostCardListSize(postCardListRef?.current?.clientWidth ?? 0);
		}

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => window.removeEventListener("resize", updateSize);
	}, [setPostCardListSize]);

	const data = Array.from({ length: 9 }, (_, i) => ({
		id: i + 1,
		prompt: ". ".repeat(i % 2.4 === 0 ? 70 : 140),
		tags: `tag${i},`
			.repeat(i % 2 === 0 ? 3 : 2)
			.split(",")
			.slice(0, -1),
	}));

	return (
		<div ref={postCardListRef} className="post_card_list sm:columns-2 2xl:columns-3">
			{data.map((fakePost) => {
				return (
					<Skeleton key={fakePost.id} className="post_card">
						<div className="relative">
							<div className="post_card_header">
								<div className="flex justify-center items-center w-14 h-14 cursor-pointer rounded-full z-10 bg-white min-w-[3.5rem] min-h-[3.5rem] relative">
									<Skeleton className="rounded-full w-[45px] h-[45px] bg-mlt-gray-5" />
								</div>
								<div className="flex flex-col max-w-[100%] overflow-hidden gap-1">
									<Skeleton className="font-satoshi font-semibold  pr-7 bg-mlt-gray-5 text-transparent w-[55%]">
										Creator...
									</Skeleton>

									<Skeleton className="font-inter bg-mlt-gray-5/40 text-ellipsis overflow-hidden whitespace-pre text-transparent w-[92%]">
										post.creator@example.email.com
									</Skeleton>
								</div>
							</div>

							<IconEmbedSvgPop
								bgColor="bg-mlt-dark-4"
								c1="mlt-dark-4"
								c2="mlt-dark-2"
								height={22}
								op1="44"
								op2="94"
								style={{ position: "absolute", right: "-6px", top: "-6px" }}
								text="Copy prompt"
								type="clipboard"
								width={22}
							/>
						</div>

						<Skeleton className="my-6 rounded-3xl bg-white p-4 cursor-pointer select-none">
							<p className="text-transparent">{fakePost.prompt}</p>
						</Skeleton>

						<p className="post_buttons_list text-transparent">
							{fakePost.tags.map((tag: string, index) => (
								<Btn_PostTag key={index} c1={"mlt-dark-4"} c2={"mlt-dark-4"} text={tag} />
							))}
						</p>
					</Skeleton>
				);
			})}
		</div>
	);
};

export default PostCardListLoading;
