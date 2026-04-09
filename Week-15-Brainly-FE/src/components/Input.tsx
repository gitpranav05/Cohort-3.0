export function Input({
  onChange,
  placeholder,
  ref,
  type,
  className
}: {
  onChange?: () => void;
  placeholder?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?:any;
  className?:string
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        ref={ref}
        className={`px-4 py-2 w-74 border outline-none rounded m-2 ${className}`}
        onChange={onChange}
      />
    </div>
  );
}
