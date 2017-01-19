
import parser from './parser';
import HtmlEmail from './engines/html-email';

const mmm = `<mmm>
  <mmm-head>
    <mmm-title>Impending Cat-astrophe</mmm-title>
    <mmm-font name="Source Sans Pro" provider="google" weight="300,400" subset="latin-ext" />
    <mmm-merge name="user.firstname" value="Ian" />
    <mmm-merge name="user.email" value="support@mizmoz.com" />
    <mmm-merge name="style.fontSize" value="16" />
    <mmm-merge name="style.mobileWidth" value="296px" />
    <mmm-merge name="style.mmm-button.background-color" value="#32BCDE" />
    <mmm-merge name="style.mmm-button.color" value="#FFFFFF" />
    <mmm-merge name="style.mmm-divider.color" value="#333333" />
    <mmm-merge name="style.mmm-row.background-color" value="#FFFFFF" />
    <mmm-merge name="style.mmm-row.spacing-color" value="#333333" />
    <mmm-merge name="style.mmm-row.spacing-width" value="12px" />
  </mmm-head>
  <mmm-body background-color="#333333">
    <mmm-row spacing="inside">
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/1/dvwarBUD00V4FX5q681P.jpg" />
        <mmm-box width="100%" margin="12px">
          <h2>Article One</h2>
          <p>Click to add a little intro to your article</p>
        </mmm-box>
        <mmm-button text="Find out more" url="https://www.mizmoz.com/"  width="100%" margin="12px" />
      </mmm-column>
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/1/dvwarBUD00V4FX5q681P.jpg" />
        <mmm-box width="100%" margin="12px">
          <h2>Article Two</h2>
          <p>Click to add a little intro to your article</p>
        </mmm-box>
        <mmm-button text="Find out more" url="https://www.mizmoz.com/" width="100%"  margin="12px" />
      </mmm-column>
    </mmm-row>
    <mmm-divider />
    <mmm-row spacing="inside">
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/4/r5O132t1yUTqEEG3yvZu.jpg" padding="12px" />
      </mmm-column>
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/4/7wZS0L7EgM98uQXQluA3.jpg" padding="12px" />
      </mmm-column>
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/4/r5O132t1yUTqEEG3yvZu.jpg" padding="12px" />
      </mmm-column>
    </mmm-row>
  </mmm-body>
</mmm>`;

const template = parser(mmm, new HtmlEmail());
const html = template.getHtml();
const preview = document.getElementById('preview');

const doc = preview.contentDocument;
doc.open();
doc.write(html);
doc.close();

console.log(html);
window.html = html;
