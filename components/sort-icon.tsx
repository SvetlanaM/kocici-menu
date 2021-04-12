interface SortIconProps {
  className: string;
  rotate?: string;
}

export default function SortIcon({ className, rotate }: SortIconProps) {
  return (
    <div className={rotate}>
      <svg
        width="7"
        height="9"
        viewBox="0 0 7 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.80715 5.50493L3.66415 7.61748V1.28271C3.66415 1.05845 3.48051 0.876465 3.25382 0.876465C3.02712 0.876465 2.84348 1.05848 2.84348 1.28271V7.61748L0.700478 5.50493C0.540006 5.34608 0.280421 5.34608 0.120354 5.50493C-0.040118 5.66378 -0.040118 5.92094 0.120354 6.07938L2.96374 8.88214C3.12178 9.03856 3.38626 9.04018 3.54427 8.88214L6.38765 6.07898C6.54812 5.92013 6.54772 5.66297 6.38765 5.50453C6.22724 5.34648 5.96722 5.34608 5.80715 5.50493Z"
          fill="#4B4261"
          className={className}
        />
      </svg>
    </div>
  );
}
