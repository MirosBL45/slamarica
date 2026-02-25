type SplitBranchProps = {
  size: string;
};

const SplitBranch = ({ size }: SplitBranchProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="#000000"
  >
    <g fill="none">
      <path d="M44 44V4H24v13l9 9v18h11ZM4 4v40h21V30l-9-9V4H4Z" />
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M44 44V4H24v13l9 9v18h11ZM4 4v40h21V30l-9-9V4H4Z"
      />
    </g>
  </svg>
);

export default SplitBranch;