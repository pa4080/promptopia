import React, { CSSProperties, useRef, useState } from "react";

import { ThemeColorsList } from "@/interfaces/ThemeTW";

import CheckListItem from "./CheckListItem";
import { IconEmbSvgPathType } from "./IconEmbedSvg";

export type ListItemType = {
	label: string;
	checked: boolean;
	value: string;
};
export type ListItemsType = ListItemType[];
export type ListType = "singleSelect" | "multiSelect" | "atLeastOneSelected";

interface Props {
	items: ListItemsType;
	listTitle?: string;
	type?: ListType;
	style?: CSSProperties;
	handleAssign:
		| React.Dispatch<React.SetStateAction<ListItemsType>>
		| ((items: ListItemsType) => void);
	icon?: {
		size?: number;
		color?: ThemeColorsList;
		type?: IconEmbSvgPathType;
		style?: CSSProperties;
	};
}

/**
 * @param items Array of items to be displayed
 * @param listTitle Title of the CheckList
 * @param type Type of the checklist: singleSelect, multiSelect
 * @param style CSS style of the checklist
 * @param icon Type and style of the Icons
 * @returns CheckList component
 */
const CheckList: React.FC<Props> = ({
	items,
	listTitle,
	type = "singleSelect",
	style,
	handleAssign,
	icon,
}) => {
	const [itemsState, setItemsState] = useState(structuredClone(items));
	const itemsRefArr = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const handleSelect = ({ value }: ListItemType) => {
		let isAssignAllowed = true;
		let newItemsState = structuredClone(itemsState);

		const singleSelectIterator = (inputItems: ListItemsType, value: string) => {
			return structuredClone(inputItems).map((item) =>
				item.value === value
					? {
							...item,
							checked: true,
					  }
					: {
							...item,
							checked: false,
					  }
			);
		};

		const multiSelectIterator = (inputItems: ListItemsType, value: string) => {
			return structuredClone(inputItems).map((item) =>
				item.value === value
					? {
							...item,
							checked: !item.checked,
					  }
					: item
			);
		};

		if (type === "singleSelect") {
			newItemsState = singleSelectIterator(newItemsState, value);
		} else if (type === "multiSelect") {
			newItemsState = multiSelectIterator(newItemsState, value);
		} else if (type === "atLeastOneSelected") {
			isAssignAllowed = multiSelectIterator(newItemsState, value).some((item) => item.checked);

			if (isAssignAllowed) {
				newItemsState = multiSelectIterator(newItemsState, value);
			} else {
				return;
			}
		}

		if (isAssignAllowed) {
			handleAssign(newItemsState);
			setItemsState(newItemsState);
		}
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="list_label">{listTitle}</div>
			<div className="flex_start gap-4 w-full items-center" style={{ ...style }}>
				{itemsState.map((stateItem, index) => (
					<div
						key={index}
						ref={(ref) => (itemsRefArr.current[stateItem.label] = ref)}
						className="flex gap-1 items-center list_item select-none"
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
