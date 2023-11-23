const puppeteer = require("puppeteer");

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: false,
    // executablePath:
    //   "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto("https://staff.ptsc.jp/onecoinenglish/school_login/");

  /* TODO CHANGE TO ENGLISH */

  // Enter login credentials and submit the form
  await page.type("input[name=login\\[login_cd\\]]", "2400");
  await page.type("input[name=login\\[password\\]]", "Dmitry2400");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("#login_btn"),
  ]);
  const isError = await page.$(".error-message-selector");
  if (isError) {
    console.error("Login failed. Check for error messages.");
    await browser.close();
    return;
  } else console.log("Logged in successfully.");

  // Select the second li element with class "off"
  const secondLiSelector = ".view li.off:nth-child(3)";
  await page.waitForSelector(secondLiSelector);

  // Hover over the second li element
  
  await page.hover(secondLiSelector);
  console.log("Hovered");

  // Wait for the dropdown menu to be visible
  await page.waitForSelector("a#PS10300033.PS1030", { visible: true });

  // Click on the link with the ID PS10300033
  //   await page.click("a#PS10300033.PS1030"); // no-headless

  // headless
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("a#PS10300033.PS1030"),
  ]);

  let timeTable = await page.$("#scrollUl");
  // looking for the day with lessons
  while (!timeTable) {
    console.log("No timeTable found on the page.");
    await page.waitForSelector("a#yokujitsu_wo_dsp_btn_top");
    await page.click("a#yokujitsu_wo_dsp_btn_top");
    await page.waitForTimeout(1000); // Adjust the timeout as needed

    timeTable = await page.$("#scrollUl");
  }

  console.log("timeTable found on the page.");

  console.log(timeTable);
  // Close the browser
  await browser.close();
})();
