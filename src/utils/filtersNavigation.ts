/** Opens the filters panel: scroll on desktop, drawer on mobile. */
export function openFiltersPanel() {
  const filtersEl = document.getElementById('property-filters')
  if (filtersEl) {
    filtersEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  window.dispatchEvent(new CustomEvent('gh:open-filters'))
}
