interface Props {
  value?: number;
  height?: string;
}

const ProgressBar = ({ value = 0, height }: Props) => {
  const indeterminableClass =
    "absolute left-0 top-0 min-w-[50%] animate-indeterminate";

  return (
    <div
      className="h-1.5 rounded-lg bg-gray-6 flex overflow-hidden relative"
      style={height ? { height: height } : {}}
    >
      <div
        role="progressbar"
        className={`rounded-full bg-primary h-full transition-all duration-300 ${
          value === 0 && indeterminableClass
        }`}
        style={value ? { width: `${value}%` } : {}}
        aria-valuenow={value}
      ></div>
    </div>
  );
};

export default ProgressBar;
