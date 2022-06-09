const express = require("express");

const puppeteer = require("puppeteer");

const app = express();

app.listen(8080, async () => {
  try {
    console.log("listening on port 8080");
  } catch (error) {
    console.log(error);
  }
});
const Data = async () => {
  const browser = await puppeteer.launch({ 
	  headless: false,
	  args: ["--disable-setuid-sandbox"],
	  'ignoreHTTPSErrors': true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.google.com/search?q=react+jobs&ei=4duYYpLRJYq94-EPqfK90AE&uact=5&oq=react+jobs&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMggIABCABBDJAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBHOgUIABCRAjoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6CAguEIAEELEDOgUILhCABDoLCAAQgAQQsQMQgwE6BAgAEEM6DgguEIAEELEDEMcBEKMCOgsILhDHARCvARCRAjoHCAAQyQMQQzoOCC4QgAQQsQMQxwEQ0QM6CAgAEIAEELEDOggILhCABBDUAjoLCC4QgAQQsQMQ1AI6DQgAELEDEIMBEMkDEEM6CAgAELEDEIMBOgoIABCxAxCDARANOgQIABANOgcIABDJAxANSgQIQRgASgQIRhgAUJseWIgzYOczaANwAngAgAGmAYgB5AqSAQQwLjExmAEAoAEBsAEAyAEIwAEB&sclient=gws-wiz&ibp=htl;jobs&sa=X&ved=2ahUKEwi546uOj4_4AhXh6zgGHQlPDQYQutcGKAF6BAgHEAY#htivrt=jobs&htidocid=DNXJc0LPw_4AAAAAAAAAAA%3D%3D&fpstate=tldetail"
  );

  const Detalis = await page.evaluate(() => {
    var res = [];
    const data = document.querySelectorAll(
      ".iFjolb.gws-plugins-horizon-jobs__li-ed"
    );
    data.forEach((d) => {
      let title = d.querySelector(".BjJfJf.PUpOsf").innerHTML;
      let company = d.querySelector(".vNEEBe").innerHTML;
      let description = d.querySelector(".HBvzbc").textContent;
      let location = d.querySelector(".Qk80Jf").innerHTML;
      res.push({ title, company, location, description });
    });
    return res;
  });

    await browser.close();
    return Detalis
};

app.get("/", async (req, res) => {
    try {
      const data = await Data()
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  });
