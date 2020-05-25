function resizeMainContent() {
  let height = window.innerHeight;
  document.getElementById('root').style.height = `${height}px`;
}
window.addEventListener('resize', resizeMainContent);
document.addEventListener('DOMContentLoaded', resizeMainContent);

// To center the popup modal in mobile browsers (with tool bars)
const ob = new MutationObserver(function() {
  const modals = document.body.getElementsByClassName('react-bootstrap-modal');
  if (modals.length === 0) { return; }
  for (let modal of modals) {
    let height = window.innerHeight;
    modal.style.height = `${height}px`;
  }
})
ob.observe(document.body, { childList: true });