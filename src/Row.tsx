import { Clue, clueClass, CluedLetter, getClue } from "./clue";

export enum RowState {
  LockedIn,
  Pending,
}

interface RowProps {
  rowState: RowState;
  wordLength: number;
  cluedLetters: CluedLetter[];
}

export function Row(props: RowProps) {
  const isLockedIn = props.rowState === RowState.LockedIn;
  const letterDivs = props.cluedLetters
    .concat(Array(props.wordLength).fill({ clue: Clue.Absent, letter: "" }))
    .slice(0, props.wordLength)
    .map(({ clue, letter }, i) => {
      let letterClass = "Row-letter";
      let clueText = "";
      if (isLockedIn && clue !== undefined) {
        clueText = getClue(clue);
        letterClass += " " + clueClass(clue);
      }

      return (
        <div key={i} className={letterClass}>
          {letter} {clueText.length > 0 && (<span className="visually-hidden">is {clueText}</span>)}
        </div>
      );
    });
  let rowClass = "Row";
  if (isLockedIn) rowClass += " Row-locked-in";
  return <div className={rowClass}>{letterDivs}</div>;
}
