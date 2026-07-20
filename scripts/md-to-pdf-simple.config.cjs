module.exports = {
  dest: './PROPUESTA-COMERCIAL-SIMPLE.pdf',
  pdf_options: {
    format: 'A4',
    margin: {
      top: '22mm',
      right: '20mm',
      bottom: '22mm',
      left: '20mm',
    },
    printBackground: true,
  },
  stylesheet: './scripts/propuesta-simple.css',
  body_class: 'propuesta-simple',
}
