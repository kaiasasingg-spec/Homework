function reverse() {
  const input = document.getElementById('inputText').value;
  const reversed = input.split('').reverse().join('');
  document.getElementById('output').textContent = reversed;
  document.getElementById('resultWrap').classList.add('visible');
}

document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') reverse();
});