import { SayButton } from 'react-say';
import React from 'react';

const SpeakButton = (props: any) =>
  <SayButton
    text={props.text}
		volume = {props.vol}
  >
    Click to listen
  </SayButton>

export default SpeakButton;