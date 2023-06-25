import React, { CSSProperties, useRef, useState } from "react";

import CheckListItem from "./CheckListItem";
import { IconEmbSvgPathType } from "./IconEmbedSVG";

export type ListItemType = {
	label: string;
	checked: boolean;
	value?: string;
};
export type ListItemsType = ListItemType[];
export type ListType = "singleSelect" | "multiSelect";

interface Props {
	items: ListItemsType;
	label?: string;
	type?: ListType;
	style?: CSSProperties;
	handleAssign?: (item?: string) => void;
	icon?: {
		size?: number;
		color?: string;
		type?: IconEmbSvgPathType;
		style?: CSSProperties;
		// className?: string;
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
const CheckList: React.FC<Props> = ({
	items,
	label,
	type = "singleSelect",
	style,
	// className,
	handleAssign,
	icon,
}) => {
	const [itemsState, setItemsState] = useState(items);

	const itemsRefArr = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const handleSelect = ({ label, value }: ListItemType) => {
		if (type === "singleSelect") {
			for (const item of itemsState) {
				if (item.label === label) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
		} else if (type === "multiSelect") {
			for (const item of itemsState) {
				if (item.label === label) {
					item.checked = !item.checked;
				}
			}
		}

		Object.assign(items, itemsState);
		handleAssign?.(value);
		setItemsState([...itemsState]);
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="list_label">{label}</div>
			<div className="flex_start gap-4 w-full items-center" style={{ ...style }}>
				{itemsState.map((stateItem, index) => (
					<div
						key={index}
						ref={(ref) => (itemsRefArr.current[stateItem.label] = ref)}
						className="flex gap-1 items-center list_item"
						onClick={() => handleSelect(stateItem)}
					>
						<CheckListItem
							checked={stateItem.checked}
							color={icon?.color}
							size={icon?.size}
							style={icon?.style}
							type={icon?.type}
						/>
						<span>{stateItem.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckList;
