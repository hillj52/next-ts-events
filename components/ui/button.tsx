import Link from 'next/link';

import classes from './button.module.css';

interface ButtonProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ href, onClick, children }) => (
  <>
  { 
    href 
      ?
        <Link href={href}>
          <a className={classes.btn}>{children}</a>
        </Link> 
      :
        <button className={classes.btn} onClick={onClick}>
          {children}
        </button>
  }
  </>
)

export default Button;