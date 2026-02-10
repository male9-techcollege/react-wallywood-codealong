/* Not a drop-down burger menu!
It's a select menu to sort the list of products in different ways. */
import type { SetStateAction } from "react";

interface DropDownProps {
  /* The setter sent as a prop is a void function that changes a state of type string. */
  setSelectedSort: React.Dispatch<SetStateAction<string>>
};

export function Dropdown({ setSelectedSort }: DropDownProps) {
  return (
    <select onChange={(event) => setSelectedSort(event.target.value)}>
      {/* 1.1 To set the default value in HTML:
      "You can include a selected attribute on an <option> element to make it selected by default when the page first loads. If no selected attribute is specified, the first <option> element will be selected by default."
      https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select 
      1.2 To set the default value in React:
      "<select> supports all common element props. (...)
      If your <select> is uncontrolled, you may pass the defaultValue prop instead:
      - defaultValue: A string (or an array of strings for multiple={true}). Specifies the initially selected option."
      https://react.dev/reference/react-dom/components/select
      */}
      <option defaultValue={"asc"}>Sorter efter</option>
      <option value="asc">Pris - stigende</option>
      <option value="desc">Pris - faldende</option>
      <option value="name">Titel</option>
    </select>
  );
};
