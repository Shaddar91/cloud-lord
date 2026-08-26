export const scrollToSection = (id) => (event) => {
  if (window.location.pathname !== '/') return;
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
