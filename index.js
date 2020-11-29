require('dotenv').config()

const puppeteer = require('puppeteer');
const leagueId = process.env.LEAGUE_ID || ''
const rostersUrl = `https://fantasy.espn.com/basketball/league/rosters?leagueId=${leagueId}&seasonId=2020`;



const doPuppeteer = async () => {
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
        let rookies = {
            'Zion Williamson': true,
            'Ja Morant': true,
        }

        console.log('teamElement', teamElement)
        return teamElement.map((teamEl) => {
            let rosterTable = teamEl.querySelector('.Table__TBODY')
            let rosterList = Array.prototype.slice.call(rosterTable.getElementsByClassName('player-column__athlete'))
            console.log('rosterTable', rosterTable)
            console.log('rosterList', rosterList)
            let roster = rosterList.map(tr => {
                console.log(tr)
                return tr.title
            })
            return {
                team: teamEl.querySelector('.teamName').title,
                roster,
                rooks: roster.filter(player => {
                    return rookies[player]
                })

            }
        })

    });

    console.log(stories)
    // await page.tracing.stop()
    await browser.close()

}

doPuppeteer()
