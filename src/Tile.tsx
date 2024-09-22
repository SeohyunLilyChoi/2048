import styled from 'styled-components';

interface TileProps {
  x: number;
  y: number;
  value: number;
}

interface TileDivProps {
  x: number;
  y: number;
  backgroundLightness: number;
}

function Tile({ x, y, value }: TileProps) {
  const power = Math.log(value);
  const backgroundLightness = 100 - power * 9;
  return (
    <TileDiv x={x} y={y} backgroundLightness={backgroundLightness}>
      {value}
    </TileDiv>
  );
}

const TileDiv = styled.div<TileDivProps>`
  width: var(--cell-size);
  height: var(--cell-size);
  position: absolute;
  display: flex;
  top: calc(var(--y) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
  left: calc(var(--x) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
  background-color: pink;
  border-radius: 1vmin;
  top: calc(
    ${(props) => props.y} * (var(--cell-size) + var(--cell-gap)) +
      var(--cell-gap)
  );
  left: calc(
    ${(props) => props.x} * (var(--cell-size) + var(--cell-gap)) +
      var(--cell-gap)
  );
  background-color: hsl(200, 50%, ${(props) => props.backgroundLightness}%);
  color: hsl(200, 25%, var(--text-lightness));
  color: hsl(
    200,
    25%,
    ${(props) => (props.backgroundLightness <= 50 ? 90 : 10)}%
  );
`;

export default Tile;
