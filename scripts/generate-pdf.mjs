import { launch } from 'puppeteer';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const input = resolve(process.argv[2] ?? 'resume.html');
const output = resolve(process.argv[3] ?? 'resume.pdf');

const browser = await launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(input).href, { waitUntil: 'networkidle2' });
    await page.pdf({ path: output, format: 'A4', printBackground: true });
} finally {
    await browser.close();
}
