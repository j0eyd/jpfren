const puppeteer = require('puppeteer');

const jp_to_en_url = "https://translate.google.com/?sl=ja&tl=en&op=translate";
const en_to_jp_url = "https://translate.google.com/?sl=en&tl=ja&op=translate";

const  get_japanese_from_english = async (inputString) => {
  /*launch the browser; load google translate*/
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(en_to_jp_url);
  
  await page.screenshot({ path: 'data/screenshot.jpg'});
  await browser.close();
}

get_japanese_from_english();