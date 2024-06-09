import React, { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";

function Sidebar() {
	const [extended, setExtended] = useState(false);

	const { onSent, prevPrompts, setRecentPrompt, newChat } =
		useContext(Context);

	async function loadPrompt(prompt) {
		setRecentPrompt(prompt);
		await onSent(prompt);
	}

	function handleClick() {
		setExtended(!extended);
	}

	return (
		<div
			id="sidebar"
			className="inline-flex p-4 bg-[#1e1f20] flex-col justify-between"
		>
			<div id="top">
				<div
					className="mb-12 h-10 aspect-square hover:bg-gray-500/40 flex items-center justify-center rounded-full cursor-pointer"
					onClick={handleClick}
				>
					<span class="material-symbols-outlined text-xl">menu</span>
				</div>

				<div
					id="new-chat"
					className="mb-6 px-3 py-2 inline-flex items-center gap-4 bg-gray-500/20 hover:bg-gray-500/40 cursor-pointer rounded-full"
					onClick={() => newChat()}
				>
					<span class="material-symbols-outlined text-xl">add</span>
					{extended && <p className="text-md pr-4">New chat</p>}
				</div>

				{extended && (
					<div id="recent-activity" className="w-60">
						<p id="title" className="mb-2 px-3 py-1">
							Recent
						</p>

						{prevPrompts.map((item, index) => {
							return (
								<div
									onClick={() => loadPrompt(item)}
									className="recent-query"
								>
									<span class="material-symbols-outlined text-lg">
										chat_bubble
									</span>
									<p className="text-md">
										{item.slice(0, 20)}...
									</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default Sidebar;
