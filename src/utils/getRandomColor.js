export default function getRandomColor() {
  const colors = [
    'blue',
    'cyan',
    'dark',
    'grape',
    'gray',
    'indigo',
    'lime',
    'orange',
    'pink',
    'red',
    'teal',
    'violet',
    'yellow',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}
