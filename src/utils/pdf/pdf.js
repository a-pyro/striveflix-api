import axios from 'axios';
import PdfPrinter from 'pdfmake';

const fetchImg = async (endpoint) => {
  try {
    const resp = await axios.get(endpoint, {
      responseType: 'arraybuffer',
    });
    const result = Buffer.from(resp.data, 'base64');
    return result;
  } catch (error) {
    console.log(error);
  }
};

const contentuto = async (catalogue) => {
  try {
    const content = catalogue.reduce(async (acc, cv) => {
      const title = { text: `${cv.Title}`, style: 'header' };
      const elements = {
        ul: [
          `${'Year: ' + cv.Year}`,
          `${'imdbID: ' + cv.imdbID}`,
          `${'Type: ' + cv.Type}`,
        ],
      };
      const url = await fetchImg(cv.Poster);
      const image = { image: url };

      acc.push(title);
      acc.push(elements);
      acc.push(image);

      return acc;
    }, []);
    return content;
  } catch (error) {
    console.log('QUI: ', error);
  }
};

export const generatePdfCatalogue = async (catalogue) => {
  try {
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const content = await contentuto(catalogue);
    const printer = new PdfPrinter(fonts);
    const docDefinition = {
      content: content,
      defaultStyle: {
        lineHeight: 2,
      },
    };

    const sourceStream = printer.createPdfKitDocument(docDefinition);
    sourceStream.end();

    return sourceStream;
  } catch (error) {
    console.log('QUI: ', error);
  }
};
