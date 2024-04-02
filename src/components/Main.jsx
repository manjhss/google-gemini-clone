import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Main() {
	const {
		onSent,
		recentPrompt,
		showResult,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context);

	return (
		<main className="w-full h-screen p-4 bg-[#131314] flex flex-col">
			<nav className="px-3 py-1 flex justify-between">
				<p className="text-xl">Gemini</p>

				<img
					className="w-10 aspect-square"
					src="/user.png"
					alt="user-pic"
				/>
			</nav>

			<div className="w-[860px] mx-auto flex-1 flex flex-col justify-between">
				{!showResult ? (
					<>
						<div id="greet" className="text-5xl font-medium">
							<p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-orange-500 mt-10">
								Hello, Surendra
							</p>
							<p className="text-white/30">
								How can I help you today?
							</p>
						</div>

						<div id="cards-ctn" className="grid grid-cols-4 gap-3">
							<div className="card">
								<p>
									Compare the differences between pickleball
									and tennis
								</p>
								<div className="text-right">
									<span class="material-symbols-outlined bg-black p-2 rounded-full">
										explore
									</span>
								</div>
							</div>
							<div className="card">
								<p>
									Find hotels in Recoleta in Buenos Aires, and
									things to do
								</p>
								<div className="text-right">
									<span class="material-symbols-outlined bg-black p-2 rounded-full">
										lightbulb
									</span>
								</div>
							</div>
							<div className="card">
								<p>Give me beginner's guide to activity</p>
								<div className="text-right">
									<span class="material-symbols-outlined bg-black p-2 rounded-full">
										draw
									</span>
								</div>
							</div>
							<div className="card">
								<p>
									Find flights and weather for an upcoming
									trip
								</p>
								<div className="text-right">
									<span class="material-symbols-outlined bg-black p-2 rounded-full">
										travel
									</span>
								</div>
							</div>
						</div>
					</>
				) : (
					<div
						id="result"
						className="h-[70vh] flex flex-col gap-8 text-lg overflow-y-scroll"
					>
						<div
							id="query"
							className="flex items-center gap-8 mt-8"
						>
							<img
								className="w-10 aspect-square"
								src="/user.png"
								alt="user-pic"
							/>
							<p>{recentPrompt}</p>
						</div>

						<div id="result" className="flex items-start gap-8">
							<img
								className="w-9 aspect-square"
								src="/query.png"
								alt="gemini-icon"
							/>
							{loading ? (
								<div
									id="loader"
									className="w-full flex flex-col gap-3"
								>
									<hr className="animate-pulse border-none rounded h-5 bg-gradient-to-r from-sky-400 to-blue-500" />
									<hr className="animate-pulse border-none rounded h-5 bg-gradient-to-r from-sky-400 to-blue-500" />
									<hr className="animate-pulse border-none rounded h-5 bg-gradient-to-r from-sky-400 to-blue-500" />
								</div>
							) : (
								<p
									dangerouslySetInnerHTML={{
										__html: resultData,
									}}
								></p>
							)}
						</div>
					</div>
				)}

				<div id="bottom" className="w-full">
					<div className="pr-4 flex items-center justify-between bg-gray-500/20 rounded-full">
						<input
							onChange={(e) => setInput(e.target.value)}
							value={input}
							type="text"
							name="prompt"
							id="prompt"
							placeholder="Enter a prompt here"
							className="text-lg px-6 py-5 focus:outline-none focus-visible:outline-none flex-1 bg-transparent"
						/>

						<div>
							<span class="material-symbols-outlined p-3 inline-flex items-center gap-4 hover:bg-gray-500/40 cursor-pointer rounded-full">
								add_photo_alternate
							</span>
							<span class="material-symbols-outlined p-3 inline-flex items-center gap-4 hover:bg-gray-500/40 cursor-pointer rounded-full">
								mic
							</span>
							{input && (
								<span
									onClick={() => onSent()}
									class="material-symbols-outlined p-3 inline-flex items-center gap-4 hover:bg-gray-500/40 cursor-pointer rounded-full"
								>
									send
								</span>
							)}
						</div>
					</div>

					<p id="info" className="text-sm text-center mt-3">
						Gemini may display inaccurate info, including about
						people, so double-check its responses.{" "}
						<span className="underline">
							Your privacy and Gemini Apps
						</span>
					</p>
				</div>
			</div>
		</main>
	);
}

export default Main;
