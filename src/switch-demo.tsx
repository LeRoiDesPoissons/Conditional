import { useState } from "react";
import { SwitchBlock } from "./components";

export const SwitchDemo = () => {
	const [counter, setCounter] = useState<number>(0);

	const increment = () => {
		setCounter((count) => count === 3 ? 0 : count+1);
	}

	const decrease = () => {
		setCounter((count) => count === 0 ? 3 : count-1);
	}

	return (
		<>
			<SwitchBlock.Statement condition={counter}>
				<SwitchBlock.Case value={0}>
					0
				</SwitchBlock.Case>
				<SwitchBlock.Case value={0}>
					0 also
				</SwitchBlock.Case>
				<SwitchBlock.Case value={1}>
					1
				</SwitchBlock.Case>
				<SwitchBlock.Case value={2}>
					2
				</SwitchBlock.Case>
				<SwitchBlock.Default>
					Default
				</SwitchBlock.Default>
			</SwitchBlock.Statement>
			<button onClick={increment}>
				+
			</button>
			<button onClick={decrease}>
				-
			</button>
		</>

	)
};