import React, { CSSProperties, useRef, useState } from "react";

import CheckItem from "./CheckItem";
import { IconEmbSvgPathType } from "./IconEmbedSVG";

export type ListItemsType = Array<{
	label: string;
	checked: boolean;
}>;
export type ListType = "singleSelect" | "multiSelect";

interface Props {
	items: ListItemsType;
	label?: string;
	type?: ListType;
	style?: CSSProperties;
	icon?: {
		size?: number;
		color?: string;
		type?: IconEmbSvgPathType;
		style?: CSSProperties;
	};
}

/**
 * @param items Array of items to be displayed
 * @param label Label of the checklist
 * @param type Type of the checklist: singleSelect, multiSelect
 * @param style CSS style of the checklist
 * @param icon Type and style of the Icons
 * @returns CheckList component
 */
const CheckList: React.FC<Props> = ({ items, label, type = "singleSelect", style, icon }) => {
	const [itemsState, setItemsState] = useState(items);

	const itemsRefArr = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const handleSelect = (itemLabel: string) => {
		if (type === "singleSelect") {
			for (const item of itemsState) {
				if (item.label === itemLabel) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
		} else if (type === "multiSelect") {
			for (const item of itemsState) {
				if (item.label === itemLabel) {
					item.checked = !item.checked;
				}
			}
		}

		Object.assign(items, itemsState);
		setItemsState([...itemsState]);
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="font-Unicephalon text-mlt-purple-primary text-sm">{label}</div>
			<div className="flex_start gap-4 w-full items-center" style={{ ...style }}>
				{itemsState.map((i, index) => (
					<div
						key={index}
						ref={(ref) => (itemsRefArr.current[i.label] = ref)}
						className="flex text-mlt-dark-4 gap-1 items-center"
						onClick={() => handleSelect(i.label)}
					>
						<CheckItem
							checked={i.checked}
							color={icon?.color}
							size={icon?.size}
							style={icon?.style}
							type={icon?.type}
						/>
						<span>{i.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckList;
