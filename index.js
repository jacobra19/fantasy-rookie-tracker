require('dotenv').config()
    
const puppeteer = require('puppeteer');

const leagueId = process.env.LEAGUE_ID || ''
const rostersUrl = `https://fantasy.espn.com/basketball/league/rosters?leagueId=${leagueId}`;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(rostersUrl, {
        waitUntil: 'networkidle0',
    });

    await page.click('#onetrust-accept-btn-handler');

    await page.waitForNavigation({
        waitUntil: 'networkidle0',
    });


    // await page.screenshot({ path: 'example.png' });

    const stories = await page.evaluate(() => {
        let teamElement = Array.prototype.slice.call(document.getElementsByClassName('ResponsiveTable'))
        console.log('ass', ass)
        console.log('teamElement', teamElement)
        return teamElement.map((teamEl) => {
            let rosterTable = teamEl.querySelector('.Table__TBODY')
            let rosterList = Array.prototype.slice.call(rosterTable.getElementsByClassName('player-info'))
            console.log('rosterTable', rosterTable)
            console.log('rosterList', rosterList)
            return {
                team: teamEl.querySelector('.teamName').title,
                roster: rosterList.map(tr => {
                    console.log(tr)
                    return tr.innerText
                })

            }
        })

    });

    console.log(stories)
    // await page.tracing.stop()
    await browser.close()

})();
