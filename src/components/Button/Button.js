import css from './Button.module.css';

export const Button = ({ label }) => (
  <button type="button" className={css.Button}>
    {label}
  </button>
);
