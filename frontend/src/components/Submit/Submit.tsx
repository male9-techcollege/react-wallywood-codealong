/* This file is from the code-along dated 2026-02-02. */
/* This folder structure isn't entirely consistent, I think,
because there is a folder for buttons. 
Arguably, this uses an input element, but... */

import style from './Submit.module.scss'

interface submitProps {
  value: string;
};

export function Submit({ value }: submitProps) {
  return <input className={style.submitButton} type={'submit'} value={value}></input>
};
