import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;

const allData = join(dirname(fileURLToPath(import.meta.url)), '../../data');

const productsFiles = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../public/img/products'
);

export const fetchMedias = async () =>
  await readJSON(join(allData, 'media.json'));

export const writeMedias = async (content) =>
  await writeJSON(join(allData, 'media.json'), content);

export const fetchReviews = async () =>
  await readJSON(join(allData, 'reviews.json'));

export const writeReviews = async (content) =>
  await writeJSON(join(allData, 'reviews.json'), content);
