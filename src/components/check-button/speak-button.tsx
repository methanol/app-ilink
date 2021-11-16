import { SayButton } from 'react-say';

interface SpeakProps {
	text: string;
	vol: number;
}

const SpeakButton = (props: SpeakProps) =>
	<SayButton
		text={props.text}
		volume = {props.vol}
	>
		Click to listen
	</SayButton>

export default SpeakButton;