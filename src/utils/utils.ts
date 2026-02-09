export function msToMinutesSeconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${formattedSeconds}`;
}
