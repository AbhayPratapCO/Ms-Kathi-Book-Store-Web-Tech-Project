export function initEnquiry() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.textContent = "Enquiry sent. We will contact you shortly.";
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3500);
    form.reset();
  });
}
