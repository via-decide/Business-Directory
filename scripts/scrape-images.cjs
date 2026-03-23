const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { businesses } = require('./generate-sites.cjs');

const imgDir = path.join(__dirname, '..', 'sites', 'assets');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) return resolve(false);
    
    // Request a higher resolution version by appending/replacing parameters
    let hqUrl = url.split('=')[0]; 
    hqUrl += '=s1600'; 
    
    const file = fs.createWriteStream(dest);
    https.get(hqUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlink(dest, () => resolve(false));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => resolve(false));
    });
  });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
      headless: 'new', 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Starting massive scrape for ${businesses.length} businesses...`);

    for (let i = 0; i < businesses.length; i++) {
      const b = businesses[i];
      const bizDir = path.join(imgDir, b.slug);
      
      if (fs.existsSync(bizDir) && fs.readdirSync(bizDir).length >= 1) {
          console.log(`[${i+1}/${businesses.length}] Skipping ${b.name}`);
          continue;
      }

      if (!fs.existsSync(bizDir)) {
          fs.mkdirSync(bizDir, { recursive: true });
      }

      const query = encodeURIComponent(`${b.name}, ${b.town}, Kachchh`);
      const searchUrl = `https://www.google.com/maps/search/${query}`;
      
      console.log(`[${i+1}/${businesses.length}] Searching for ${b.name}...`);
      
      try {
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        await delay(3000);

        // Extract any image source that looks like a photo
        const imgUrls = await page.evaluate(() => {
          const sources = Array.from(document.querySelectorAll('img')).map(img => img.src);
          
          // Also check background images
          const bgs = Array.from(document.querySelectorAll('div, button, a'))
              .map(el => {
                  const bg = el.style.backgroundImage;
                  if (bg && bg.includes('url')) {
                      const match = bg.match(/url\("?(https:[^"]+)"?\)/);
                      return match ? match[1] : null;
                  }
                  return null;
              })
              .filter(u => !!u);

          const all = [...sources, ...bgs];
          
          return Array.from(new Set(all))
              .filter(src => src.includes('googleusercontent.com'))
              .filter(src => !src.includes('streetview')) // avoid streetview icons
              .filter(src => src.length > 50) // filter out small icons/scripts
              .slice(0, 5);
        });

        if (imgUrls.length > 0) {
          console.log(`   Found ${imgUrls.length} image sources. Downloading...`);
          for (let j = 0; j < imgUrls.length; j++) {
              const dest = path.join(bizDir, `photo_${j+1}.jpg`);
              await downloadImage(imgUrls[j], dest);
          }
        } else {
          console.log('   No photos found.');
        }
      } catch (err) {
        console.error(`   Error scraping ${b.name}:`, err.message);
      }

      await delay(1500);
    }

    await browser.close();
    console.log('Final massive scraping session complete.');
})();
