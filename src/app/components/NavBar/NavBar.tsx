interface NavBarProps {
  leftChild?: React.ReactNode;
  middleChild?: React.ReactNode;
  rightChild?: React.ReactNode;
}

const Navbar = ({ leftChild, middleChild, rightChild }: NavBarProps) => {
  return (
    <nav className="z-10 flex h-[3.75rem] items-center justify-between border-b border-grey-200 bg-white px-10 py-3">
      <div>{leftChild}</div>
      <div>{middleChild}</div>
      <div>{rightChild}</div>
    </nav>
  );
};

export default Navbar;
