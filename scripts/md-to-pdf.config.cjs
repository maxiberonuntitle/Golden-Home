module.exports = {
  dest: './PROPUESTA-COMERCIAL.pdf',
  pdf_options: {
    format: 'A4',
    margin: {
      top: '18mm',
      right: '16mm',
      bottom: '18mm',
      left: '16mm',
    },
    printBackground: true,
  },
  stylesheet: './scripts/propuesta-comercial.css',
  body_class: 'propuesta',
  css: `
    @page { size: A4; margin: 18mm 16mm; }
  `,
}
