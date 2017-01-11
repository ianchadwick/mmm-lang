
var cheerio = require('cheerio');
var HtmlEmail = require('./templates/html-email');

const html = `<mmm>
  <mmm-head>
    <mmm-title>Welcome to my website</mmm-title>
    <mmm-send-date>2016-12-24 00:00:00</mmm-send-date>
    <mmm-merge>
      <mmm-attribute name="user.firstname" value="Ian">
      <mmm-attribute name="user.email" value="ian@mizmoz.com">
      <mmm-attribute name="styles.fontWeight" value="12">
    </mmm-merge>
  </mmm-head>
  <mmm-body>
    <mmm-row width="100%" content-width="600px">
      <mmm-column
          width="1/3"
          padding="{{styles.padding}}"
      >
        Menu
      </mmm-column>
      <mmm-column
          width="2/3"
      >
        Welcome {{user.firstname}} to this email!
      </mmm-column>
    </mmm-row>
  </mmm-body>
</mmm>`;

const $ = cheerio.load(html, {
  normalizeWhitespace: false,
});

const head = $('mmm > mmm-head');

// parse the attributes so we can use them whilst creating the content
const merge = {};
head.find('mmm-attribute').each((index, attribute) => {
  const { name, value } = attribute.attribs;
  merge[name] = value;
}, {});

console.log(merge);
