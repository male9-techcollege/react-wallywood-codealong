/* This file is from the code-along dated 2026-02-02. */

import style from './Input.module.scss'

interface inputProps {
  label: string;
  type: string;
  name: string;
  value?: string; //Optional because a placeholder can be used instead.
};

export function Input({ label, type, name }: inputProps) {
  /* Q: What is the point of putting an input element inside of a label element again?
  A1: "One of the big pros of putting the <input /> inside the <label>, is that you can omit for and id: <label>My text <input /></label> in your example. So much nicer! – 
  Markus Hedlund
  Commented Sep 11, 2011 at 14:56"
  https://stackoverflow.com/questions/774054/should-i-put-input-elements-inside-a-label-element 
  A2: This also makes the label clickable, but the same thing would happen with a set of for and id attributes.
  "There are two ways to pair a label and an input. One is by wrapping the input in a label (implicit), and the other is by adding a for attribute to the label and an id to the input (explicit). (...)
  Unfortunately, an implicit label is not handled correctly by all assistive technologies, even if for and id attributes are used. Therefore, it is always the best idea to use an explicit label instead of an implicit label."
  https://css-tricks.com/html-inputs-and-labels-a-love-story/
  "To create an HTML checkbox with a clickable label, use the <label> element and associate it with the checkbox using the for attribute, matching the checkbox's id. This makes the label clickable, toggling the checkbox state when clicked. The clickable label means the checkbox gets on/off when the label is clicked."
  https://www.geeksforgeeks.org/html/how-to-create-an-html-checkbox-with-a-clickable-label/ */
  return (
    <label className={style.inputStyle}>
      {label}
      <input type={type} name={name} placeholder={`Indtast ${name}`}></input>
    </label>
  );
};
