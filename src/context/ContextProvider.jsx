import { createContext, useState } from "react";
import runChat from "../config/main";

export const Context = createContext();

export default function ContextProvider(props) {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");

	function delayPara(index, nextWord) {
		setTimeout(() => {
			setResultData((prev) => prev + nextWord);
		}, 75 * index);
	}

	function newChat() {
		setLoading(false);
		setShowResult(false);
	}

	async function onSent(prompt) {
		setResultData("");
		setLoading(true);
		setShowResult(true);

		let response;

		if (prompt != undefined) {
			response = await runChat(prompt);
			setRecentPrompt(prompt);
		} else {
			setPrevPrompts((prev) => [...prev, input]);
			setRecentPrompt(input);

			response = await runChat(input);
		}

		let responseArr = response.split("**");
		let newResponse = "";

		for (let i = 0; i < responseArr.length; i++) {
			if (i === 0 || i % 2 !== 1) {
				newResponse += responseArr[i];
			} else {
				newResponse += "<b>" + responseArr[i] + "</b>";
			}
		}

		let newResponse2 = newResponse.split("*").join("</br></br>");

		let newResponseArray = newResponse2.split(" ");

		for (let i = 0; i < newResponseArray.length; i++) {
			const nextWord = newResponseArray[i];
			delayPara(i, nextWord + " ");
		}

		setLoading(false);
		setInput("");
	}

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		showResult,
		loading,
		resultData,
		setInput,
		input,
		newChat
	};

	return (
		<Context.Provider value={contextValue}>
			{props.children}
		</Context.Provider>
	);
}
