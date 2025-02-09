export const formatTime = (time: number | 'Infinity') => {
  if (time === 'Infinity') return '∞'
  const minutes = Math.floor(time / 60)
  const secs = time % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
