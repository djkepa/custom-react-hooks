import useHover from '../hook/useHover';

function HoverComponent() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-testid="hover-component"
    >
      <h1>Hover Component</h1>
      <p>{isHovered ? 'Hovered' : 'Not Hovered'}</p>
    </div>
  );
}

export default HoverComponent;
