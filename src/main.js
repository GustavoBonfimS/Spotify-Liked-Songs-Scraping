import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto('https://open.spotify.com/collection/tracks');

  // await for javascript of page load
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-testid=login-button]');
    for (const element of elements) element.click();
  });

  await page.waitForNavigation();

  await page.type('#login-username', process.env.SPOTIFY_USER_EMAIL);
  await page.type('#login-password', process.env.SPOTIFY_USER_PASSWORD);
  await page.click('#login-button');

  await page.waitForNavigation();

  // favorite songs page
  await page.goto('https://open.spotify.com/collection/tracks');
  await page.waitForTimeout(1000);

  // swarch a childrens of divs for music name
  // I know it can improve, sorry
  const musicObjs = await page.evaluate(() => {
    const trackRows = document.querySelectorAll('[data-testid=tracklist-row]');
    const musics = [];
    trackRows.forEach(item => {
      if (!item) {
        return;
      }
      const name =
        item.children[1].children[1].children[0].children[0].children[0]
          .innerHTML;

      // here its the same thing but to search for author
      // its broken for now...
      // const divsToAuthor = item.children[1].children[1].children[1].children[0];

      // let author = '';
      // for (let i = 0; i < divsToAuthor.length; i++) {
      //   if (!divsToAuthor[i]) {
      //     return;
      //   }

      //   const divsToAuthor2 = divsToAuthor[i].children[0];

      //   for (let i = 0; i < divsToAuthor2.length; i++) {
      //     if (!divsToAuthor2[i]) {
      //       return;
      //     }

      //     author = divsToAuthor2[i].innerHTML;
      //   }
      // }

      // const musicInfos = {
      //   name,
      //   author,
      // };
      musics.push(name);
    });

    return musics;
  });

  // wait for forEach code ends
  await page.waitForTimeout(4000);

  // here are the names of your songs, enjoy!
  console.log(musicObjs);

  await browser.close();
};

main();
