module.exports = {
  dest: './DOCUMENTACION.pdf',
  pdf_options: {
    format: 'A4',
    margin: {
      top: '16mm',
      right: '14mm',
      bottom: '16mm',
      left: '14mm',
    },
    printBackground: true,
  },
  stylesheet: './scripts/documentacion.css',
  body_class: 'documentacion',
}
